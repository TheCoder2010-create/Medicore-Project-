from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta
import os
import uuid
from functools import wraps
import logging

# Initialize Flask app
app = Flask(__name__)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'your-secret-key-change-in-production')
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///app.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-change-in-production')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=7)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # 16MB max file size

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)
CORS(app, origins=['http://localhost:3000'])

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create upload directory
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Models
class User(db.Model):
    id = db.Column(db.String(36), primary_key=True, default=lambda: str(uuid.uuid4()))
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    role = db.Column(db.String(20), default='user', nullable=False)
    avatar = db.Column(db.String(255))
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    last_login = db.Column(db.DateTime)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name,
            'role': self.role,
            'avatar': self.avatar,
            'createdAt': self.created_at.isoformat(),
            'updatedAt': self.updated_at.isoformat(),
            'lastLogin': self.last_login.isoformat() if self.last_login else None
        }

# Utility functions
def admin_required(f):
    @wraps(f)
    @jwt_required()
    def decorated_function(*args, **kwargs):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if not user or user.role != 'admin':
            return jsonify({'message': 'Admin access required'}), 403
        return f(*args, **kwargs)
    return decorated_function

def validate_file(file):
    """Validate uploaded file"""
    if not file or file.filename == '':
        return False, 'No file selected'
    
    allowed_extensions = {'png', 'jpg', 'jpeg', 'gif', 'pdf', 'doc', 'docx'}
    if '.' not in file.filename or file.filename.rsplit('.', 1)[1].lower() not in allowed_extensions:
        return False, 'File type not allowed'
    
    return True, 'Valid file'

# Error handlers
@app.errorhandler(400)
def bad_request(error):
    return jsonify({'message': 'Bad request', 'error': str(error)}), 400

@app.errorhandler(401)
def unauthorized(error):
    return jsonify({'message': 'Unauthorized access'}), 401

@app.errorhandler(403)
def forbidden(error):
    return jsonify({'message': 'Access forbidden'}), 403

@app.errorhandler(404)
def not_found(error):
    return jsonify({'message': 'Resource not found'}), 404

@app.errorhandler(500)
def internal_error(error):
    db.session.rollback()
    logger.error(f'Internal server error: {str(error)}')
    return jsonify({'message': 'Internal server error'}), 500

# Authentication routes
@app.route('/api/auth/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['email', 'password', 'firstName', 'lastName']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'message': f'{field} is required'}), 400
        
        # Check if user already exists
        if User.query.filter_by(email=data['email']).first():
            return jsonify({'message': 'Email already registered'}), 400
        
        # Validate password strength
        password = data['password']
        if len(password) < 8:
            return jsonify({'message': 'Password must be at least 8 characters long'}), 400
        
        # Create new user
        user = User(
            email=data['email'].lower().strip(),
            first_name=data['firstName'].strip(),
            last_name=data['lastName'].strip()
        )
        user.set_password(password)
        
        db.session.add(user)
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        logger.info(f'New user registered: {user.email}')
        
        return jsonify({
            'message': 'User registered successfully',
            'data': {
                'user': user.to_dict(),
                'token': access_token
            },
            'success': True
        }), 201
        
    except Exception as e:
        db.session.rollback()
        logger.error(f'Registration error: {str(e)}')
        return jsonify({'message': 'Registration failed'}), 500

@app.route('/api/auth/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data.get('email') or not data.get('password'):
            return jsonify({'message': 'Email and password are required'}), 400
        
        user = User.query.filter_by(email=data['email'].lower().strip()).first()
        
        if not user or not user.check_password(data['password']):
            return jsonify({'message': 'Invalid email or password'}), 401
        
        if not user.is_active:
            return jsonify({'message': 'Account is deactivated'}), 401
        
        # Update last login
        user.last_login = datetime.utcnow()
        db.session.commit()
        
        # Create access token
        access_token = create_access_token(identity=user.id)
        
        logger.info(f'User logged in: {user.email}')
        
        return jsonify({
            'message': 'Login successful',
            'data': {
                'user': user.to_dict(),
                'token': access_token
            },
            'success': True
        })
        
    except Exception as e:
        logger.error(f'Login error: {str(e)}')
        return jsonify({'message': 'Login failed'}), 500

@app.route('/api/auth/verify', methods=['GET'])
@jwt_required()
def verify_token():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or not user.is_active:
            return jsonify({'message': 'Invalid token'}), 401
        
        return jsonify(user.to_dict())
        
    except Exception as e:
        logger.error(f'Token verification error: {str(e)}')
        return jsonify({'message': 'Token verification failed'}), 401

@app.route('/api/auth/logout', methods=['POST'])
@jwt_required()
def logout():
    # In a production app, you might want to blacklist the token
    return jsonify({'message': 'Logged out successfully'})

# User routes
@app.route('/api/users/profile', methods=['GET'])
@jwt_required()
def get_profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        return jsonify({
            'data': user.to_dict(),
            'success': True
        })
        
    except Exception as e:
        logger.error(f'Get profile error: {str(e)}')
        return jsonify({'message': 'Failed to get profile'}), 500

@app.route('/api/users/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        data = request.get_json()
        
        # Update allowed fields
        if 'firstName' in data:
            user.first_name = data['firstName'].strip()
        if 'lastName' in data:
            user.last_name = data['lastName'].strip()
        if 'email' in data:
            # Check if email is already taken by another user
            existing_user = User.query.filter_by(email=data['email'].lower().strip()).first()
            if existing_user and existing_user.id != user.id:
                return jsonify({'message': 'Email already in use'}), 400
            user.email = data['email'].lower().strip()
        
        user.updated_at = datetime.utcnow()
        db.session.commit()
        
        logger.info(f'Profile updated for user: {user.email}')
        
        return jsonify({
            'message': 'Profile updated successfully',
            'data': user.to_dict(),
            'success': True
        })
        
    except Exception as e:
        db.session.rollback()
        logger.error(f'Update profile error: {str(e)}')
        return jsonify({'message': 'Failed to update profile'}), 500

@app.route('/api/users', methods=['GET'])
@jwt_required()
def get_users():
    try:
        page = request.args.get('page', 1, type=int)
        limit = request.args.get('limit', 10, type=int)
        search = request.args.get('search', '', type=str)
        
        query = User.query
        
        if search:
            search_filter = f'%{search}%'
            query = query.filter(
                db.or_(
                    User.first_name.ilike(search_filter),
                    User.last_name.ilike(search_filter),
                    User.email.ilike(search_filter)
                )
            )
        
        pagination = query.paginate(
            page=page, 
            per_page=limit, 
            error_out=False
        )
        
        users = [user.to_dict() for user in pagination.items]
        
        return jsonify({
            'data': users,
            'pagination': {
                'page': page,
                'limit': limit,
                'total': pagination.total,
                'totalPages': pagination.pages
            },
            'success': True
        })
        
    except Exception as e:
        logger.error(f'Get users error: {str(e)}')
        return jsonify({'message': 'Failed to get users'}), 500

@app.route('/api/users/<user_id>', methods=['GET'])
@jwt_required()
def get_user(user_id):
    try:
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        return jsonify({
            'data': user.to_dict(),
            'success': True
        })
        
    except Exception as e:
        logger.error(f'Get user error: {str(e)}')
        return jsonify({'message': 'Failed to get user'}), 500

@app.route('/api/users/<user_id>', methods=['DELETE'])
@admin_required
def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        
        if not user:
            return jsonify({'message': 'User not found'}), 404
        
        # Don't allow deleting the last admin
        if user.role == 'admin':
            admin_count = User.query.filter_by(role='admin', is_active=True).count()
            if admin_count <= 1:
                return jsonify({'message': 'Cannot delete the last admin user'}), 400
        
        db.session.delete(user)
        db.session.commit()
        
        logger.info(f'User deleted: {user.email}')
        
        return jsonify({
            'message': 'User deleted successfully',
            'success': True
        })
        
    except Exception as e:
        db.session.rollback()
        logger.error(f'Delete user error: {str(e)}')
        return jsonify({'message': 'Failed to delete user'}), 500

# File upload routes
@app.route('/api/files/upload', methods=['POST'])
@jwt_required()
def upload_file():
    try:
        if 'file' not in request.files:
            return jsonify({'message': 'No file provided'}), 400
        
        file = request.files['file']
        folder = request.form.get('folder', 'uploads')
        
        is_valid, message = validate_file(file)
        if not is_valid:
            return jsonify({'message': message}), 400
        
        # Generate unique filename
        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4()}_{filename}"
        
        # Create folder if it doesn't exist
        upload_path = os.path.join(app.config['UPLOAD_FOLDER'], folder)
        os.makedirs(upload_path, exist_ok=True)
        
        # Save file
        file_path = os.path.join(upload_path, unique_filename)
        file.save(file_path)
        
        # Return file info
        file_url = f"/api/files/{folder}/{unique_filename}"
        
        logger.info(f'File uploaded: {unique_filename}')
        
        return jsonify({
            'message': 'File uploaded successfully',
            'data': {
                'url': file_url,
                'filename': unique_filename,
                'originalName': filename,
                'size': os.path.getsize(file_path),
                'mimetype': file.mimetype
            },
            'success': True
        })
        
    except Exception as e:
        logger.error(f'File upload error: {str(e)}')
        return jsonify({'message': 'File upload failed'}), 500

@app.route('/api/files/<path:filename>', methods=['DELETE'])
@jwt_required()
def delete_file(filename):
    try:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        if os.path.exists(file_path):
            os.remove(file_path)
            logger.info(f'File deleted: {filename}')
            return jsonify({
                'message': 'File deleted successfully',
                'success': True
            })
        else:
            return jsonify({'message': 'File not found'}), 404
            
    except Exception as e:
        logger.error(f'File deletion error: {str(e)}')
        return jsonify({'message': 'File deletion failed'}), 500

# Health check route
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat(),
        'version': '1.0.0'
    })

# Initialize database
@app.before_first_request
def create_tables():
    db.create_all()
    
    # Create default admin user if none exists
    if not User.query.filter_by(role='admin').first():
        admin = User(
            email='admin@example.com',
            first_name='Admin',
            last_name='User',
            role='admin'
        )
        admin.set_password('admin123')
        db.session.add(admin)
        db.session.commit()
        logger.info('Default admin user created: admin@example.com / admin123')

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8000)