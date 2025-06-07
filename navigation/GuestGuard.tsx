import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Routes } from '../constants/Routes';
import useAuth from '../features/auth/hooks/useAuth';

/**
 * Props for the GuestGuard component
 */
type GuestGuardProps = {
  children: React.ReactNode;
};

/**
 * GuestGuard component to prevent authenticated users from accessing auth screens
 * 
 * This component checks if the user is authenticated and redirects to the home screen if they are
 * 
 * @param children The guest route content
 * @returns The children if not authenticated, otherwise redirects to home
 * 
 * @example
 * // In a layout file
 * return (
 *   <GuestGuard>
 *     <Stack />
 *   </GuestGuard>
 * );
 */
const GuestGuard: React.FC<GuestGuardProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  // If still loading auth state, show a loading indicator
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // If authenticated, redirect to home
  if (isAuthenticated) {
    return <Redirect href={Routes.TABS.HOME} />
  }

  // If not authenticated, render the guest content
  return <>{children}</>;
};

export default GuestGuard;