import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getToken } from '../features/auth/storage/tokenStorage';

// Base URL for API requests
const API_BASE_URL = 'https://fitflix-backend-1.onrender.com/api';

/**
 * Create an Axios instance with default configuration
 */
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request interceptor to add auth token to requests
 */
apiClient.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    try {
      const token = await getToken();
      
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      
      return config;
    } catch (error) {
      console.error('API request interceptor error:', error);
      return config;
    }
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor to handle common error cases
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    // Handle 401 Unauthorized errors (expired token, etc.)
    if (error.response?.status === 401) {
      // You could trigger a logout or token refresh here
      console.warn('Unauthorized API request');
      // Example: await store.dispatch(logout());
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

/**
 * Helper function to handle API errors consistently
 * @param error The error object from the API call
 * @returns A standardized error message
 */
export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    // Handle Axios errors
    if (!error.response) {
      return 'Network error. Please check your internet connection.';
    }
    
    const status = error.response.status;
    
    // Handle common HTTP status codes
    switch (status) {
      case 400:
        return error.response.data?.message || 'Invalid request. Please check your data.';
      case 401:
        return 'Unauthorized. Please log in again.';
      case 403:
        return 'Access denied. You do not have permission to perform this action.';
      case 404:
        return 'Resource not found.';
      case 500:
      case 502:
      case 503:
        return 'Server error. Please try again later.';
      default:
        return error.response.data?.message || `Error ${status}: Something went wrong.`;
    }
  }
  
  // Handle non-Axios errors
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred.';
};

/**
 * Type for paginated API responses
 */
export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
};

/**
 * Type for API error responses
 */
export type ApiErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
};ing[]>;
  status?: number;
};