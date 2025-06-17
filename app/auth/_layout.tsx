import { Stack } from 'expo-router';
import GuestGuard from '../../navigation/GuestGuard';

export default function AuthLayout() {
  return (
    <GuestGuard>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </GuestGuard>
  );
}