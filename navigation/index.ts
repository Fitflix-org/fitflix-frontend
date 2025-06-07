/**
 * Navigation utilities and helpers
 * This file centralizes navigation functions to be used throughout the app
 */

import { router } from 'expo-router';
import { Routes } from '../constants/Routes';

/**
 * Navigation helper functions
 * These functions provide a centralized way to handle navigation throughout the app
 */
export const navigate = (route: string) => {
  router.push(route);
};

export const navigateWithParams = (route: string, params: Record<string, string | number>) => {
  const queryParams = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join('&');
  
  router.push(`${route}?${queryParams}`);
};

export const goBack = () => {
  router.back();
};

export const replace = (route: string) => {
  router.replace(route);
};

/**
 * Common navigation actions
 * These functions provide shortcuts for common navigation patterns
 */
export const navigateToHome = () => navigate(Routes.TABS.HOME);
export const navigateToLogin = () => navigate(Routes.AUTH.LOGIN);
export const navigateToSignup = () => navigate(Routes.AUTH.SIGNUP);
export const navigateToOnboarding = () => navigate(Routes.AUTH.ONBOARDING);
export const navigateToGymDetails = (gymId: number | string) => {
  navigateWithParams(Routes.FEATURES.GYM_DETAILS, { id: gymId });
};

/**
 * Navigation types
 * These types help with type checking when using navigation functions
 */
export type NavigateFunction = typeof navigate;
export type NavigateWithParamsFunction = typeof navigateWithParams;
export type GoBackFunction = typeof goBack;
export type ReplaceFunction = typeof replace;