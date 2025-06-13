# Professional Web Application

A modern, full-stack web application built with React.js frontend and Python Flask backend, featuring secure authentication, user management, and comprehensive API integration.

## 🚀 Features

### Frontend (React.js)
- **Modern React 18** with TypeScript and functional components
- **Responsive Design** with Tailwind CSS and mobile-first approach
- **Advanced Animations** using Framer Motion
- **Secure Authentication** with JWT tokens and protected routes
- **Form Validation** using React Hook Form with comprehensive error handling
- **State Management** with React Query for server state and Context API
- **Client-side Routing** with React Router v6
- **Real-time Notifications** using React Hot Toast
- **File Upload** with drag-and-drop support
- **Accessibility** features and keyboard navigation
- **SEO Optimization** with proper meta tags and semantic HTML

### Backend (Python Flask)
- **RESTful API** with comprehensive endpoints
- **JWT Authentication** with secure token management
- **Database Integration** with SQLAlchemy ORM
- **File Upload** handling with validation
- **Role-based Access Control** (RBAC)
- **Input Validation** and sanitization
- **Error Handling** with proper HTTP status codes
- **Logging** and monitoring capabilities
- **CORS** configuration for cross-origin requests
- **Security Best Practices** implemented throughout

### Security Features
- **Password Hashing** using Werkzeug security
- **JWT Token** authentication with expiration
- **Input Validation** and sanitization
- **CORS** protection
- **File Upload** security with type validation
- **SQL Injection** protection via ORM
- **XSS Protection** through proper data handling

## 📋 Prerequisites

- Node.js 16+ and npm/yarn
- Python 3.8+
- Git

## 🛠️ Installation & Setup

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_URL=http://localhost:8000
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Create virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Configuration:**
   Copy `.env.example` to `.env` and update values:
   ```bash
   cp .env.example .env
   ```

5. **Initialize database:**
   ```bash
   python app.py
   ```

## 🏗️ Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── auth/           # Authentication components
│   │   ├── layout/         # Layout components
│   │   └── ui/             # Base UI components
│   ├── contexts/           # React contexts
│   ├── pages/              # Page components
│   ├── services/           # API services
│   ├── types/              # TypeScript type definitions
│   └── test/               # Test utilities
├── backend/
│   ├── app.py              # Flask application
│   ├── requirements.txt    # Python dependencies
│   └── .env.example        # Environment variables template
└── public/                 # Static assets
```

## 🔧 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

### Backend
- `python app.py` - Start Flask development server
- `gunicorn app:app` - Start production server

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (paginated)
- `GET /api/users/:id` - Get user by ID
- `DELETE /api/users/:id` - Delete user (admin only)

### Files
- `POST /api/files/upload` - Upload file
- `DELETE /api/files/:filename` - Delete file

### Health
- `GET /api/health` - Health check endpoint

## 🔐 Authentication Flow

1. **Registration/Login:** User provides credentials
2. **Token Generation:** Server creates JWT token
3. **Token Storage:** Client stores token in secure cookie
4. **Request Authentication:** Token sent in Authorization header
5. **Token Validation:** Server validates token for protected routes

## 🎨 UI Components

### Base Components
- **Button** - Customizable button with variants and loading states
- **Input** - Form input with validation and icons
- **Card** - Container component with hover effects
- **LoadingSpinner** - Animated loading indicator

### Layout Components
- **Header** - Navigation header with user menu
- **Sidebar** - Navigation sidebar with responsive design
- **Layout** - Main layout wrapper with sidebar integration

### Authentication Components
- **ProtectedRoute** - Route protection with role-based access
- **Login/Register** - Authentication forms with validation

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile:** < 640px
- **Tablet:** 640px - 1024px
- **Desktop:** > 1024px

## 🧪 Testing

### Frontend Testing
```bash
npm run test
```

### Backend Testing
```bash
python -m pytest
```
![page 21](https://github.com/user-attachments/assets/662f3445-9bf0-4bda-90fd-a5ef7791dfcd)
![page 1](https://github.com/user-attachments/assets/343616ec-4d82-492e-8d68-cfd4a51f2213)

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the application: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Configure environment variables

### Backend (Heroku/Railway)
1. Set up production database (PostgreSQL recommended)
2. Configure environment variables
3. Deploy using Git or Docker

### Environment Variables

#### Frontend
- `VITE_API_URL` - Backend API URL

#### Backend
- `SECRET_KEY` - Flask secret key
- `JWT_SECRET_KEY` - JWT signing key
- `DATABASE_URL` - Database connection string
- `CORS_ORIGINS` - Allowed CORS origins

## 🔧 Configuration

### Database Configuration
The application supports both SQLite (development) and PostgreSQL (production):

```python
# SQLite (default)
DATABASE_URL=sqlite:///app.db

# PostgreSQL
DATABASE_URL=postgresql://username:password@localhost/dbname
```

### CORS Configuration
Configure allowed origins in the backend:

```python
CORS(app, origins=['http://localhost:3000', 'https://yourdomain.com'])
```

## 📊 Performance Optimization

### Frontend
- **Code Splitting** with React.lazy()
- **Image Optimization** with proper formats and sizes
- **Bundle Analysis** with Vite bundle analyzer
- **Caching** strategies for API calls

### Backend
- **Database Indexing** on frequently queried fields
- **Query Optimization** with SQLAlchemy
- **Response Compression** with gzip
- **Caching** with Redis (optional)

## 🛡️ Security Best Practices

### Frontend
- **XSS Protection** through proper data sanitization
- **CSRF Protection** with secure token handling
- **Secure Storage** using httpOnly cookies
- **Input Validation** on all forms

### Backend
- **SQL Injection** prevention via ORM
- **Password Hashing** with salt
- **Rate Limiting** for API endpoints
- **HTTPS** enforcement in production

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure backend CORS is configured correctly
   - Check that frontend API URL matches backend

2. **Authentication Issues:**
   - Verify JWT secret keys match
   - Check token expiration settings

3. **Database Errors:**
   - Ensure database is running and accessible
   - Check connection string format

4. **File Upload Issues:**
   - Verify upload directory permissions
   - Check file size limits

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [React Hook Form](https://react-hook-form.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

---

Built with ❤️ using modern web technologies and best practices.
