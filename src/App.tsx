import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { FirebaseAuthProvider } from './contexts/FirebaseAuthContext';
import { LoadingProvider } from './contexts/LoadingContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import FirebaseProtectedRoute from './components/auth/FirebaseProtectedRoute';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import InteractiveDemo from './pages/InteractiveDemo';
import BillingReport from './pages/BillingReport';
import CTAShowcase from './components/CTAShowcase';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import FirebaseAuthPage from './pages/auth/FirebaseAuthPage';
import Dashboard from './pages/Dashboard';
import FirebaseDashboard from './pages/FirebaseDashboard';
import Profile from './pages/Profile';
import Users from './pages/Users';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import './App.css';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FirebaseAuthProvider>
          <LoadingProvider>
            <Router>
              <div className="App">
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/demo" element={<InteractiveDemo />} />
                  <Route path="/cta-showcase" element={<CTAShowcase />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/firebase-auth" element={<FirebaseAuthPage />} />
                  
                  {/* Firebase Protected Routes */}
                  <Route path="/firebase-dashboard" element={
                    <FirebaseProtectedRoute>
                      <FirebaseDashboard />
                    </FirebaseProtectedRoute>
                  } />
                  
                  {/* Traditional Protected routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Layout>
                        <Dashboard />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/billing-report" element={
                    <ProtectedRoute>
                      <Layout>
                        <BillingReport />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/profile" element={
                    <ProtectedRoute>
                      <Layout>
                        <Profile />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/users" element={
                    <ProtectedRoute>
                      <Layout>
                        <Users />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  
                  <Route path="/settings" element={
                    <ProtectedRoute>
                      <Layout>
                        <Settings />
                      </Layout>
                    </ProtectedRoute>
                  } />
                  
                  {/* 404 route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                
                {/* Global toast notifications */}
                <Toaster
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                  }}
                />
              </div>
            </Router>
          </LoadingProvider>
        </FirebaseAuthProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;