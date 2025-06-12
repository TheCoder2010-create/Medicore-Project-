import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { ApiResponse, ApiError } from '../types/api';
import { User, LoginCredentials, RegisterData } from '../types/auth';

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'An unexpected error occurred',
      errors: error.response?.data?.errors,
      statusCode: error.response?.status || 500,
    };

    // Handle specific error cases
    if (apiError.statusCode === 401) {
      // Unauthorized - clear token and redirect to login
      Cookies.remove('token');
      window.location.href = '/login';
      toast.error('Session expired. Please login again.');
    } else if (apiError.statusCode === 403) {
      toast.error('Access denied. You do not have permission to perform this action.');
    } else if (apiError.statusCode >= 500) {
      toast.error('Server error. Please try again later.');
    }

    return Promise.reject(apiError);
  }
);

// Auth API endpoints
export const authAPI = {
  login: (email: string, password: string) =>
    api.post<ApiResponse<{ user: User; token: string }>>('/auth/login', { email, password }),
  
  register: (userData: RegisterData) =>
    api.post<ApiResponse<{ user: User; token: string }>>('/auth/register', userData),
  
  logout: () =>
    api.post('/auth/logout'),
  
  verifyToken: (token: string) =>
    api.get<User>('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => response.data),
  
  refreshToken: () =>
    api.post<ApiResponse<{ token: string }>>('/auth/refresh'),
  
  forgotPassword: (email: string) =>
    api.post('/auth/forgot-password', { email }),
  
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
};

// User API endpoints
export const userAPI = {
  getProfile: () =>
    api.get<ApiResponse<User>>('/users/profile'),
  
  updateProfile: (userData: Partial<User>) =>
    api.put<ApiResponse<User>>('/users/profile', userData),
  
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post<ApiResponse<{ url: string }>>('/users/avatar', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  getUsers: (page = 1, limit = 10, search = '') =>
    api.get(`/users?page=${page}&limit=${limit}&search=${search}`),
  
  getUserById: (id: string) =>
    api.get<ApiResponse<User>>(`/users/${id}`),
  
  deleteUser: (id: string) =>
    api.delete(`/users/${id}`),
};

// File upload API
export const fileAPI = {
  upload: (file: File, folder = 'uploads') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);
    return api.post('/files/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  },
  
  delete: (filename: string) =>
    api.delete(`/files/${filename}`),
};

export default api;