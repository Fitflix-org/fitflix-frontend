
// Types for auth requests and responses
type LoginRequest = {
  email: string;
  password: string;
};

type SignupRequest = {
  name: string;
  email: string;
  password: string;
};

type AuthResponse = {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    // Add other user properties as needed
  };
};

/**
 * Authentication API service
 * Handles all authentication-related API requests
 */
const authApi = {
  /**
   * Login user with email and password
   * @param credentials User login credentials
   * @returns Authentication response with token and user data
   */
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    try {
      // In a real app, this would be an actual API call
      // const response = await apiClient.post('/auth/login', credentials);
      // return response.data;
      
      // For demo purposes, we'll simulate a successful response
      return {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          name: 'Demo User',
          email: credentials.email,
        },
      };
    } catch (error) {
      console.error('Login API error:', error);
      throw new Error('Login failed. Please check your credentials and try again.');
    }
  },

  /**
   * Register a new user
   * @param userData User registration data
   * @returns Authentication response with token and user data
   */
  signup: async (userData: SignupRequest): Promise<AuthResponse> => {
    try {
      // In a real app, this would be an actual API call
      // const response = await apiClient.post('/auth/signup', userData);
      // return response.data;
      
      // For demo purposes, we'll simulate a successful response
      return {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          name: userData.name,
          email: userData.email,
        },
      };
    } catch (error) {
      console.error('Signup API error:', error);
      throw new Error('Signup failed. Please try again.');
    }
  },

  /**
   * Logout user
   * In a real app, this might invalidate the token on the server
   */
  logout: async (): Promise<void> => {
    try {
      // In a real app, this would be an actual API call
      // await apiClient.post('/auth/logout');
      
      // For demo purposes, we'll just return
      return;
    } catch (error) {
      console.error('Logout API error:', error);
      throw new Error('Logout failed. Please try again.');
    }
  },

  /**
   * Verify token validity
   * @returns User data if token is valid
   */
  verifyToken: async (): Promise<{ user: AuthResponse['user'] }> => {
    try {
      // In a real app, this would be an actual API call
      // const response = await apiClient.get('/auth/verify');
      // return response.data;
      
      // For demo purposes, we'll simulate a successful response
      return {
        user: {
          id: '1',
          name: 'Demo User',
          email: 'user@example.com',
        },
      };
    } catch (error) {
      console.error('Token verification API error:', error);
      throw new Error('Token verification failed.');
    }
  },
};

export default authApi;