import { useContext } from 'react';
import AuthContext from '../auth-context';

/**
 * Custom hook to access authentication context
 * 
 * This hook provides access to authentication state and methods throughout the app
 * 
 * @returns Authentication context with user state and auth methods
 * 
 * @example
 * // In a component
 * const { user, isAuthenticated, login, logout } = useAuth();
 * 
 * // Check if user is logged in
 * if (isAuthenticated) {
 *   console.log(`Welcome, ${user.name}!`);
 * }
 * 
 * // Login user
 * const handleLogin = async () => {
 *   try {
 *     await login(email, password);
 *     // Login successful
 *   } catch (error) {
 *     // Handle login error
 *   }
 * };
 * 
 * // Logout user
 * const handleLogout = () => {
 *   logout();
 *   // User is now logged out
 * };
 */
const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;