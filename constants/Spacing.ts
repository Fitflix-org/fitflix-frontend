/**
 * Spacing constants for consistent layout throughout the app
 */

const Spacing = {
  // Base spacing unit
  unit: 8,
  
  // Named spacing values
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
  
  // Functional spacing
  tiny: 2,
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
  huge: 48,
  massive: 64,
  
  // Component-specific spacing
  gutter: 16,
  containerPadding: 16,
  sectionMargin: 24,
  cardPadding: 16,
  buttonPadding: 12,
  inputPadding: 12,
  listItemPadding: 16,
  headerMargin: 24,
  footerMargin: 24,
  
  // Screen-specific spacing
  screenPadding: 16,
  screenMargin: 16,
  
  // Helper function to get multiples of the base unit
  get: (multiple: number) => multiple * 8,
};

export default Spacing;