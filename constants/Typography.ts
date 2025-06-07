/**
 * Typography constants for consistent text styling throughout the app
 */

import { Platform } from 'react-native';

// Font family definitions
const fontFamily = {
  // Primary font family
  primary: Platform.OS === 'ios' ? 'System' : 'Roboto',
  
  // Secondary font family for emphasis or contrast
  secondary: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  
  // Monospace font for code or technical content
  mono: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
  
  // Font family for numbers or data display
  numeric: Platform.OS === 'ios' ? 'System' : 'Roboto',
};

// Font size definitions
const fontSize = {
  // Base sizes
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  
  // Functional sizes
  tiny: 10,
  small: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
  huge: 30,
  massive: 36,
  
  // Component-specific sizes
  caption: 12,
  button: 16,
  body: 16,
  title: 20,
  header: 24,
  largeHeader: 30,
};

// Font weight definitions
const fontWeight = {
  thin: '100',
  extraLight: '200',
  light: '300',
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
  extraBold: '800',
  black: '900',
};

// Line height definitions
const lineHeight = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 38,
  xxxl: 46,
  
  // Multipliers for dynamic line heights
  tight: 1.2,    // Compact
  normal: 1.5,    // Standard
  relaxed: 1.8,   // Spacious
};

// Letter spacing definitions
const letterSpacing = {
  tight: -0.5,
  normal: 0,
  wide: 0.5,
  extraWide: 1,
};

// Text transform options
const textTransform = {
  none: 'none',
  capitalize: 'capitalize',
  uppercase: 'uppercase',
  lowercase: 'lowercase',
};

// Text style presets
const textStyle = {
  // Headings
  h1: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.xxxl,
  },
  h2: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    lineHeight: lineHeight.xxl,
  },
  h3: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.xl,
  },
  h4: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semiBold,
    lineHeight: lineHeight.lg,
  },
  h5: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.md,
  },
  h6: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.sm,
  },
  
  // Body text
  bodyLarge: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.lg,
  },
  body: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.md,
  },
  bodySmall: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.sm,
  },
  
  // Special text styles
  caption: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.regular,
    lineHeight: lineHeight.xs,
  },
  button: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.md,
    letterSpacing: letterSpacing.wide,
    textTransform: textTransform.uppercase,
  },
  label: {
    fontFamily: fontFamily.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    lineHeight: lineHeight.sm,
  },
};

const Typography = {
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textTransform,
  textStyle,
};

export default Typography;