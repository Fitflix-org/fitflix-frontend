import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Routes } from '../constants/Routes';
import useAuth from '../features/auth/hooks/useAuth';

/**
 * Props for the AuthGuard component
 */
type AuthGuardProps = {
  children: React.ReactNode;
};

/**
 * AuthGuard component to protect routes that require authentication
 * 
 * This component checks if the user is authenticated and redirects to the login screen if not
 * 
 * @param children The protected route content
 * @returns The children if authenticated, otherwise redirects to login
 * 
 * @example
 * // In a layout file
 * return (
 *   <AuthGuard>
 *     <Tabs />
 *   </AuthGuard>
 * );
 */
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // If still loading auth state, show a loading indicator
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Redirect href={Routes.AUTH.LOGIN} />
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};

export default AuthGuard;