import { Stack } from 'expo-router';
import GuestGuard from '../../navigation/GuestGuard';

/**
 * Auth layout component
 * 
 * This component defines the layout for authentication screens (login, signup)
 * and wraps them with GuestGuard to prevent authenticated users from accessing them
 */
export default function AuthLayout() {
  return (
    <GuestGuard>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="signup" />
      </Stack>
    </GuestGuard>
  );
}