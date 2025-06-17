import { Redirect } from 'expo-router';
import { Routes } from '../constants/Routes';

/**
 * Root component that handles initial routing
 * 
 * This component always redirects to the login screen first.
 * The login screen will check authentication and redirect to home if already logged in.
 */
export default function Index() {
  // Always redirect to login page first
  return <Redirect href={Routes.AUTH.LOGIN} />
}