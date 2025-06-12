import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useFirebaseAuth } from '../../contexts/FirebaseAuthContext';
import LoadingSpinner from '../ui/LoadingSpinner';

interface FirebaseProtectedRouteProps {
  children: React.ReactNode;
}

const FirebaseProtectedRoute: React.FC<FirebaseProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useFirebaseAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/firebase-auth" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default FirebaseProtectedRoute;