import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for storage
const TOKEN_KEY = '@FitFlix:auth_token';
const SESSION_EXPIRY_KEY = '@FitFlix:session_expiry';
const USER_DATA_KEY = '@FitFlix:user_data';

/**
 * Save authentication token, session expiry timestamp, and user data to secure storage
 * @param token JWT token or other auth token
 * @param expiryTimestamp Timestamp when the session expires
 * @param userData User data to be stored
 */
export const saveToken = async (token: string, expiryTimestamp?: number, userData?: any): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    
    // If expiry timestamp is provided, save it
    if (expiryTimestamp) {
      await AsyncStorage.setItem(SESSION_EXPIRY_KEY, expiryTimestamp.toString());
    }
    
    // If user data is provided, save it
    if (userData) {
      await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    }
  } catch (error) {
    console.error('Error saving auth token:', error);
    throw error;
  }
};

/**
 * Retrieve authentication token from secure storage
 * @returns The stored token or null if not found
 */
export const getToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error getting auth token:', error);
    return null;
  }
};

/**
 * Remove authentication token, session expiry, and user data from secure storage
 */
export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
    await AsyncStorage.removeItem(SESSION_EXPIRY_KEY);
    await AsyncStorage.removeItem(USER_DATA_KEY);
  } catch (error) {
    console.error('Error removing auth token:', error);
    throw error;
  }
};

/**
 * Get the session expiry timestamp
 * @returns The stored expiry timestamp or null if not found
 */
export const getSessionExpiry = async (): Promise<number | null> => {
  try {
    const expiryStr = await AsyncStorage.getItem(SESSION_EXPIRY_KEY);
    return expiryStr ? parseInt(expiryStr, 10) : null;
  } catch (error) {
    console.error('Error getting session expiry:', error);
    return null;
  }
};

/**
 * Get the stored user data
 * @returns The stored user data or null if not found
 */
export const getUserData = async (): Promise<any | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_DATA_KEY);
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

/**
 * Check if user is authenticated by verifying token existence and session validity
 * @returns Boolean indicating if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  try {
    const token = await getToken();
    if (!token) return false;
    
    // Check if session has expired
    const expiryTimestamp = await getSessionExpiry();
    if (expiryTimestamp) {
      const currentTime = Date.now();
      return currentTime < expiryTimestamp;
    }
    
    // If no expiry timestamp is found but token exists, consider authenticated
    return true;
  } catch (error) {
    console.error('Error checking authentication:', error);
    return false;
  }
};