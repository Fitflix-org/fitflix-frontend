/**
 * Validation utility functions
 */

/**
 * Validate an email address
 * @param email Email address to validate
 * @returns True if valid, false otherwise
 */
export const isValidEmail = (email: string): boolean => {
  // Basic email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate a password
 * @param password Password to validate
 * @param options Validation options
 * @returns True if valid, false otherwise
 */
export const isValidPassword = (
  password: string,
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  } = {}
): boolean => {
  // Default options
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = options;
  
  // Check minimum length
  if (password.length < minLength) {
    return false;
  }
  
  // Check for uppercase letters
  if (requireUppercase && !/[A-Z]/.test(password)) {
    return false;
  }
  
  // Check for lowercase letters
  if (requireLowercase && !/[a-z]/.test(password)) {
    return false;
  }
  
  // Check for numbers
  if (requireNumbers && !/\d/.test(password)) {
    return false;
  }
  
  // Check for special characters
  if (requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    return false;
  }
  
  return true;
};

/**
 * Get password validation errors
 * @param password Password to validate
 * @param options Validation options
 * @returns Array of validation error messages
 */
export const getPasswordValidationErrors = (
  password: string,
  options: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumbers?: boolean;
    requireSpecialChars?: boolean;
  } = {}
): string[] => {
  // Default options
  const {
    minLength = 8,
    requireUppercase = true,
    requireLowercase = true,
    requireNumbers = true,
    requireSpecialChars = true,
  } = options;
  
  const errors: string[] = [];
  
  // Check minimum length
  if (password.length < minLength) {
    errors.push(`Password must be at least ${minLength} characters long`);
  }
  
  // Check for uppercase letters
  if (requireUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  // Check for lowercase letters
  if (requireLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  // Check for numbers
  if (requireNumbers && !/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  // Check for special characters
  if (requireSpecialChars && !/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return errors;
};

/**
 * Validate a phone number
 * @param phone Phone number to validate
 * @returns True if valid, false otherwise
 */
export const isValidPhone = (phone: string): boolean => {
  // Remove non-numeric characters
  const numericPhone = phone.replace(/\D/g, '');
  
  // Check if the phone number has a valid length (adjust for your country)
  return numericPhone.length >= 10 && numericPhone.length <= 15;
};

/**
 * Validate a URL
 * @param url URL to validate
 * @returns True if valid, false otherwise
 */
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

/**
 * Validate a credit card number using Luhn algorithm
 * @param cardNumber Credit card number to validate
 * @returns True if valid, false otherwise
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  // Remove non-numeric characters
  const numericCard = cardNumber.replace(/\D/g, '');
  
  // Check if the card number has a valid length
  if (numericCard.length < 13 || numericCard.length > 19) {
    return false;
  }
  
  // Luhn algorithm
  let sum = 0;
  let shouldDouble = false;
  
  // Loop through the card number from right to left
  for (let i = numericCard.length - 1; i >= 0; i--) {
    let digit = parseInt(numericCard.charAt(i));
    
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  
  return sum % 10 === 0;
};

/**
 * Validate a date
 * @param date Date to validate
 * @param options Validation options
 * @returns True if valid, false otherwise
 */
export const isValidDate = (
  date: Date | string | number,
  options: {
    minDate?: Date;
    maxDate?: Date;
  } = {}
): boolean => {
  const { minDate, maxDate } = options;
  
  // Convert to Date object if not already
  const dateObj = date instanceof Date ? date : new Date(date);
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return false;
  }
  
  // Check minimum date
  if (minDate && dateObj < minDate) {
    return false;
  }
  
  // Check maximum date
  if (maxDate && dateObj > maxDate) {
    return false;
  }
  
  return true;
};

/**
 * Validate a name (first name, last name, etc.)
 * @param name Name to validate
 * @returns True if valid, false otherwise
 */
export const isValidName = (name: string): boolean => {
  // Remove whitespace
  const trimmedName = name.trim();
  
  // Check if the name is not empty and contains only letters and spaces
  return trimmedName.length > 0 && /^[A-Za-z\s'-]+$/.test(trimmedName);
};

/**
 * Validate a username
 * @param username Username to validate
 * @returns True if valid, false otherwise
 */
export const isValidUsername = (username: string): boolean => {
  // Check if the username is not empty and contains only letters, numbers, underscores, and hyphens
  return username.length >= 3 && username.length <= 30 && /^[A-Za-z0-9_-]+$/.test(username);
};

/**
 * Validate a zip/postal code
 * @param zipCode Zip/postal code to validate
 * @param countryCode Country code (default: 'US')
 * @returns True if valid, false otherwise
 */
export const isValidZipCode = (zipCode: string, countryCode: string = 'US'): boolean => {
  // Remove whitespace
  const trimmedZipCode = zipCode.trim();
  
  // Validate based on country code
  switch (countryCode.toUpperCase()) {
    case 'US':
      return /^\d{5}(-\d{4})?$/.test(trimmedZipCode);
    case 'CA':
      return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(trimmedZipCode);
    case 'UK':
      return /^[A-Za-z]{1,2}\d[A-Za-z\d]?[ -]?\d[A-Za-z]{2}$/.test(trimmedZipCode);
    default:
      // Default validation for other countries
      return trimmedZipCode.length > 0;
  }
};