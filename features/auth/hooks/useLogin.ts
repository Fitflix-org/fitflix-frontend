import { useState } from 'react';
import useAuth from './useAuth';

/**
 * Custom hook to handle login form state and submission
 * 
 * This hook provides a convenient way to manage login form state and submission
 * 
 * @returns Login form state and handlers
 * 
 * @example
 * // In a login component
 * const { 
 *   email, 
 *   setEmail, 
 *   password, 
 *   setPassword, 
 *   isLoading, 
 *   error, 
 *   handleLogin 
 * } = useLogin();
 * 
 * // Use in a form
 * <TextInput value={email} onChangeText={setEmail} />
 * <TextInput value={password} onChangeText={setPassword} secureTextEntry />
 * <Button onPress={handleLogin} title="Login" disabled={isLoading} />
 * {error && <Text>{error}</Text>}
 */
const useLogin = () => {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  
  // Get auth context
  const { login, isLoading, error: authError } = useAuth();
  
  // Combined error from form validation and auth context
  const error = formError || authError;
  
  // Validate form
  const validateForm = (): boolean => {
    // Reset form error
    setFormError(null);
    
    // Validate email
    if (!email.trim()) {
      setFormError('Email is required');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setFormError('Please enter a valid email address');
      return false;
    }
    
    // Validate password
    if (!password) {
      setFormError('Password is required');
      return false;
    }
    
    return true;
  };
  
  // Handle login submission
  const handleLogin = async () => {
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    try {
      // Call login from auth context
      await login(email, password);
    } catch (error) {
      // Error is handled by auth context
      console.error('Login error:', error);
    }
  };
  
  // Reset form
  const resetForm = () => {
    setEmail('');
    setPassword('');
    setFormError(null);
  };
  
  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleLogin,
    resetForm,
  };
};

export default useLogin;