/**
 * Global type definitions for the application
 */

// Re-export navigation types
export * from './navigation';

/**
 * User type definition
 */
export type User = {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  // Add other user properties as needed
};

/**
 * Authentication state type
 */
export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  error: string | null;
};

/**
 * Theme type definition
 */
export type ThemeType = 'light' | 'dark' | 'system';

/**
 * App settings type
 */
export type AppSettings = {
  theme: ThemeType;
  notifications: boolean;
  sounds: boolean;
  haptics: boolean;
  language: string;
  // Add other app settings as needed
};

/**
 * Workout type definition
 */
export type Workout = {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  exercises: Exercise[];
  // Add other workout properties as needed
};

/**
 * Exercise type definition
 */
export type Exercise = {
  id: string;
  name: string;
  description: string;
  sets: number;
  reps: number;
  duration?: number; // in seconds, for timed exercises
  restTime: number; // in seconds
  // Add other exercise properties as needed
};

/**
 * Nutrition type definition
 */
export type Nutrition = {
  id: string;
  name: string;
  calories: number;
  protein: number; // in grams
  carbs: number; // in grams
  fat: number; // in grams
  // Add other nutrition properties as needed
};

/**
 * Reward type definition
 */
export type Reward = {
  id: string;
  name: string;
  description: string;
  points: number;
  image?: string;
  // Add other reward properties as needed
};

/**
 * API response type
 */
export type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

/**
 * API error type
 */
export type ApiError = {
  status: number;
  message: string;
  errors?: Record<string, string[]>;
};

/**
 * Pagination type
 */
export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

/**
 * Paginated response type
 */
export type PaginatedResponse<T> = {
  data: T[];
  pagination: Pagination;
};