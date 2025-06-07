import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { ThemeType } from '../types';

// Theme context type
type ThemeContextType = {
  theme: ThemeType;
  isDarkMode: boolean;
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
};

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  theme: 'system',
  isDarkMode: false,
  setTheme: () => {},
  toggleTheme: () => {},
});

// Storage key for theme preference
const THEME_STORAGE_KEY = '@FitFlix:theme_preference';

/**
 * Theme provider component
 * 
 * This component provides theme context to the app and manages theme preferences
 * 
 * @param children The app content
 * @returns The theme provider component
 */
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get the system color scheme
  const systemColorScheme = useColorScheme();
  
  // State for the current theme preference
  const [theme, setThemeState] = useState<ThemeType>('system');
  
  // Load the theme preference from storage on mount
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (storedTheme) {
          setThemeState(storedTheme as ThemeType);
        }
      } catch (error) {
        console.error('Error loading theme preference:', error);
      }
    };
    
    loadThemePreference();
  }, []);
  
  // Determine if dark mode is active based on theme preference and system setting
  const isDarkMode = theme === 'system' 
    ? systemColorScheme === 'dark'
    : theme === 'dark';
  
  // Set the theme preference and save to storage
  const setTheme = async (newTheme: ThemeType) => {
    try {
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
      setThemeState(newTheme);
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };
  
  // Toggle between light and dark theme
  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    setTheme(newTheme);
  };
  
  // Context value
  const value = {
    theme,
    isDarkMode,
    setTheme,
    toggleTheme,
  };
  
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

/**
 * Custom hook to use the theme context
 * 
 * @returns The theme context
 * 
 * @example
 * // In a component
 * const { theme, isDarkMode, setTheme, toggleTheme } = useTheme();
 * 
 * // Use the theme
 * const backgroundColor = isDarkMode ? '#000' : '#fff';
 * 
 * // Toggle the theme
 * <Button onPress={toggleTheme} title="Toggle Theme" />
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
};

export default ThemeContext;