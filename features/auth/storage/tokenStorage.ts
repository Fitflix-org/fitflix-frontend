import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys for storage
const TOKEN_KEY = '@FitFlix:auth_token';

/**
 * Save authentication token to secure storage
 * @param token JWT token or other auth token
 */
export const saveToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
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
 * Remove authentication token from secure storage
 */
export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Error removing auth token:', error);
    throw error;
  }
};

/**
 * Check if user is authenticated by verifying token existence
 * @returns Boolean indicating if user is authenticated
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getToken();
  return token !== null;
};