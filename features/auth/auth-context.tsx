import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Routes } from '../../constants/Routes';
import { getToken, removeToken, saveToken } from './storage/tokenStorage';

// Define the shape of the auth context
type AuthContextType = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: SignupData) => Promise<void>;
  logout: () => void;
  error: string | null;
};

// User type definition
type User = {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
};

// Signup data type
type SignupData = {
  name: string;
  email: string;
  password: string;
  // Add other signup fields as needed
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  error: null,
});

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check for existing auth token on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          // In a real app, you would validate the token with your backend
          // and fetch the user data
          setIsAuthenticated(true);
          setUser({
            id: '1',
            name: 'Demo User',
            email: 'user@example.com',
          });
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call your API here
      // const response = await authApi.login(email, password);
      
      // For demo purposes, we'll simulate a successful login
      // with a mock token and user
      const mockToken = 'mock-jwt-token';
      const mockUser = {
        id: '1',
        name: 'Demo User',
        email: email,
      };
      
      // Save the token
      await saveToken(mockToken);
      
      // Update state
      setIsAuthenticated(true);
      setUser(mockUser);
      
      // Navigate to the home screen
      router.replace(Routes.TABS.HOME);
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, you would call your API here
      // const response = await authApi.signup(userData);
      
      // For demo purposes, we'll simulate a successful signup
      const mockToken = 'mock-jwt-token';
      const mockUser = {
        id: '1',
        name: userData.name,
        email: userData.email,
      };
      
      // Save the token
      await saveToken(mockToken);
      
      // Update state
      setIsAuthenticated(true);
      setUser(mockUser);
      
      // Navigate to the home screen
      router.replace(Routes.TABS.HOME);
    } catch (err) {
      console.error('Signup failed:', err);
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      // Remove the token
      await removeToken();
      
      // Update state
      setIsAuthenticated(false);
      setUser(null);
      
      // Navigate to the login screen
      router.replace(Routes.AUTH.LOGIN);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // Context value
  const value = {
    isAuthenticated,
    isLoading,
    user,
    login,
    signup,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Export the context for direct usage if needed
export default AuthContext;