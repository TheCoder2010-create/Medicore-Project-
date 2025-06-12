import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { FirebaseAuthProvider } from './contexts/FirebaseAuthContext';

// Mock the protected route component
jest.mock('./components/auth/ProtectedRoute', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>Protected Route: {children}</div>,
}));

// Mock the firebase protected route component
jest.mock('./components/auth/FirebaseProtectedRoute', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>Firebase Protected Route: {children}</div>,
}));

// Mock the Layout component
jest.mock('./components/layout/Layout', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>Layout: {children}</div>,
}));


describe('App Routing', () => {
  const renderWithRouter = (route = '/') => {
    render(
      <MemoryRouter initialEntries={[route]}>
        <AuthProvider>
          <FirebaseAuthProvid