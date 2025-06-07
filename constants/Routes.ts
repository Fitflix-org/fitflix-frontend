/**
 * Centralized route definitions for the application
 * This helps maintain consistency and avoid typos when navigating
 */

export const Routes = {
  // Auth routes
  AUTH: {
    LOGIN: '/auth/login',
    SIGNUP: '/auth/signup',
  },
  
  // Main tab routes
  TABS: {
    HOME: '/(tabs)/home',
    DASHBOARD: '/(tabs)/dashboard',
    NUTRITION: '/(tabs)/nutrition',
    REWARDS: '/(tabs)/rewards',
    MORE: '/(tabs)/more',
    FITTY: '/(tabs)/fitty',
  },
  
  // Feature routes
  FEATURES: {
    GYM_DETAILS: '/gym-details',
    PROFILE: '/profile',
    SETTINGS: '/settings',
  },
  
  // Utility routes
  UTILITY: {
    NOT_FOUND: '/+not-found',
  }
};

// Helper function to navigate with params
export const createParamRoute = (route: string, params: Record<string, string | number>) => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&');
  
  return `${route}?${queryParams}`;
};

// Example usage:
// const gymDetailsRoute = createParamRoute(Routes.FEATURES.GYM_DETAILS, { id: 123 });
// router.push(gymDetailsRoute);