/**
 * Navigation types for the application
 * 
 * This file defines types for route parameters and navigation props
 */

import { Routes } from '../constants/Routes';

/**
 * Route parameter types for each screen
 */
export type AppParamList = {
  // Auth routes
  [Routes.AUTH.LOGIN]: undefined;
  [Routes.AUTH.SIGNUP]: undefined;
  [Routes.AUTH.ONBOARDING]: undefined;
  
  // Tab routes
  [Routes.TABS.HOME]: undefined;
  [Routes.TABS.DASHBOARD]: undefined;
  [Routes.TABS.NUTRITION]: undefined;
  [Routes.TABS.REWARDS]: undefined;
  [Routes.TABS.MORE]: undefined;
  [Routes.TABS.FITTY]: undefined;
  
  // Feature routes
  [Routes.FEATURES.GYM_DETAILS]: { id: string | number };
  [Routes.FEATURES.PROFILE]: undefined;
  [Routes.FEATURES.SETTINGS]: undefined;
  
  // Utility routes
  [Routes.UTILITY.NOT_FOUND]: undefined;
};

/**
 * Type for route names
 */
export type AppRoutes = keyof AppParamList;

/**
 * Type for navigation props
 */
export type NavigationProps = {
  route: {
    params: any;
    name: string;
    key: string;
  };
  navigation: {
    navigate: (route: AppRoutes, params?: any) => void;
    goBack: () => void;
    setParams: (params: any) => void;
    setOptions: (options: any) => void;
    reset: (state: any) => void;
  };
};

/**
 * Type for tab navigation props
 */
export type TabNavigationProps = NavigationProps & {
  navigation: NavigationProps['navigation'] & {
    jumpTo: (route: AppRoutes, params?: any) => void;
  };
};

/**
 * Type for stack navigation props
 */
export type StackNavigationProps<T extends keyof AppParamList> = {
  route: {
    params: AppParamList[T];
    name: T;
    key: string;
  };
  navigation: NavigationProps['navigation'] & {
    push: (route: AppRoutes, params?: any) => void;
    replace: (route: AppRoutes, params?: any) => void;
    pop: (count?: number) => void;
    popToTop: () => void;
  };
};