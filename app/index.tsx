import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Routes } from '../constants/Routes';
import { getToken } from '../features/auth/storage/tokenStorage';

/**
 * Root component that handles initial routing
 * 
 * This component checks the authentication status and redirects to the appropriate route:
 * - If authenticated: Redirects to the home screen
 * - If not authenticated: Redirects to the login screen
 */
export default function Index() {
  // State to track if we've checked authentication status
  const [isLoading, setIsLoading] = useState(true);
  const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication status
    const checkAuthStatus = async () => {
      try {
        // Check if user is authenticated
        const token = await getToken();
        
        // Determine the initial route
        if (token) {
          // User is authenticated, go to home
          setInitialRoute(Routes.TABS.HOME);
        } else {
          // User is not authenticated, go to login
          setInitialRoute(Routes.AUTH.LOGIN);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        // Default to login on error
        setInitialRoute(Routes.AUTH.LOGIN);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  // Show loading indicator while checking status
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Redirect to the appropriate route
  return <Redirect href={initialRoute || Routes.AUTH.LOGIN} />
}