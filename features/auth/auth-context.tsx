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
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone?: string;
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

  // Clear any existing tokens when the app starts to ensure users always see the login page first
  useEffect(() => {
    const clearTokens = async () => {
      try {
        await removeToken();
      } catch (err) {
        console.error('Error clearing tokens:', err);
      }
    };
    
    clearTokens();
  }, []);

  // Check for existing auth token on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await getToken();
        if (token) {
          // In a real app, you would validate the token with your backend
          // and fetch the user data
          
          // For now, we'll try to decode the token to get user info
          try {
            // Simple JWT decode (not validation) to extract payload
            const base64Url = token.split('.')[1];
            if (base64Url) {
              const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
              const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
              }).join(''));
              
              const payload = JSON.parse(jsonPayload);
              console.log('Token payload:', payload);
              
              if (payload.user) {
                setIsAuthenticated(true);
                
                // Extract user data with proper fallbacks
                const userId = payload.user.id || payload.user._id || '1';
                
                // Prioritize first_name and last_name if available
                let userName;
                if (payload.user.first_name) {
                  userName = payload.user.last_name 
                    ? `${payload.user.first_name} ${payload.user.last_name}` 
                    : payload.user.first_name;
                } else if (payload.user.name) {
                  userName = payload.user.name;
                } else if (payload.user.username) {
                  userName = payload.user.username;
                } else {
                  userName = 'Demo User';
                }
                
                const userEmail = payload.user.email || 'user@example.com';
                
                console.log('Setting user data from token:', { userId, userName, userEmail });
                
                setUser({
                  id: userId,
                  name: userName,
                  email: userEmail,
                });
                
                console.log('User set from token:', payload.user);
                setIsLoading(false);
                return;
              }
            }
          } catch (decodeErr) {
            console.error('Error decoding token:', decodeErr);
          }
          
          // Fallback if token decode fails
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
      // Call the API with the provided endpoint
      const response = await fetch('https://fitflix-backend-1.onrender.com/api/userAuth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Save the token from the response
      await saveToken(data.token);
      
      // Update state with user data from response
      setIsAuthenticated(true);
      
      // Log the complete response data for debugging
      console.log('Login response data:', JSON.stringify(data, null, 2));
      
      // Extract user data with proper fallbacks
      const userId = data.user?.id || data.user?._id || '1';
      
      // Prioritize first_name and last_name if available
      let userName;
      if (data.user?.first_name) {
        userName = data.user.last_name 
          ? `${data.user.first_name} ${data.user.last_name}` 
          : data.user.first_name;
      } else if (data.user?.name) {
        userName = data.user.name;
      } else if (data.user?.username) {
        userName = data.user.username;
      } else {
        userName = 'User';
      }
      
      const userEmail = data.user?.email || email;
      
      console.log('Setting user data:', { userId, userName, userEmail });
      
      setUser({
        id: userId,
        name: userName,
        email: userEmail,
        // Add other user properties as needed
      });
      
      // Navigate to the home screen
      router.replace(Routes.TABS.HOME);
    } catch (err) {
      console.error('Login failed:', err);
      setError(err instanceof Error ? err.message : 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (userData: SignupData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Call the API with the provided endpoint
      const response = await fetch('https://fitflix-backend-1.onrender.com/api/userAuth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          first_name: userData.first_name,
          last_name: userData.last_name,
          phone: userData.phone || null
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      // Log the complete response data for debugging
      console.log('Signup response data:', JSON.stringify(data, null, 2));
      
      // After successful registration, automatically log the user in
      // You could either call the login function here or implement auto-login
      
      // For now, we'll simulate a successful login with the returned user data
      const loginResponse = await fetch('https://fitflix-backend-1.onrender.com/api/userAuth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userData.email, password: userData.password }),
      });
      
      const loginData = await loginResponse.json();
      
      if (!loginResponse.ok) {
        throw new Error(loginData.message || 'Auto-login after registration failed');
      }
      
      // Save the token from the login response
      await saveToken(loginData.token);
      
      // Update state with user data
      setIsAuthenticated(true);
      
      // Log the user data to debug
      console.log('Signup login response data:', loginData);
      
      // Extract user data with proper fallbacks
      const userId = loginData.user?.id || loginData.user?._id || data.user_id || '1';
      
      // Prioritize first_name and last_name if available
      let userName;
      if (loginData.user?.first_name) {
        userName = loginData.user.last_name 
          ? `${loginData.user.first_name} ${loginData.user.last_name}` 
          : loginData.user.first_name;
      } else if (loginData.user?.name) {
        userName = loginData.user.name;
      } else if (loginData.user?.username) {
        userName = loginData.user.username;
      } else if (userData.first_name) {
        // Use the signup data if API response doesn't include it
        userName = userData.last_name 
          ? `${userData.first_name} ${userData.last_name}` 
          : userData.first_name;
      } else {
        userName = 'User';
      }
      
      const userEmail = loginData.user?.email || userData.email;
      
      console.log('Setting user data after signup:', { userId, userName, userEmail });
      
      setUser({
        id: userId,
        name: userName,
        email: userEmail,
      });
      
      // Navigate to the home screen
      router.replace(Routes.TABS.HOME);
    } catch (err) {
      console.error('Signup failed:', err);
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
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