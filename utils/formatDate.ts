/**
 * Date formatting utilities
 */

/**
 * Format a date to a readable string
 * @param date The date to format
 * @param format The format to use (default: 'full')
 * @returns Formatted date string
 */
export const formatDate = (date: Date | string | number, format: 'full' | 'short' | 'time' | 'relative' = 'full'): string => {
  // Convert to Date object if not already
  const dateObj = date instanceof Date ? date : new Date(date);
  
  // Check if date is valid
  if (isNaN(dateObj.getTime())) {
    return 'Invalid date';
  }
  
  // Format based on requested format
  switch (format) {
    case 'full':
      // Example: Monday, January 1, 2023
      return dateObj.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      
    case 'short':
      // Example: Jan 1, 2023
      return dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      
    case 'time':
      // Example: 12:00 PM
      return dateObj.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      
    case 'relative':
      // Example: 2 hours ago, Just now, etc.
      return getRelativeTimeString(dateObj);
      
    default:
      return dateObj.toLocaleDateString();
  }
};

/**
 * Get a relative time string (e.g., "2 hours ago", "Just now")
 * @param date The date to format
 * @returns Relative time string
 */
export const getRelativeTimeString = (date: Date): string => {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.round(diffMs / 1000);
  const diffMins = Math.round(diffSecs / 60);
  const diffHours = Math.round(diffMins / 60);
  const diffDays = Math.round(diffHours / 24);
  const diffWeeks = Math.round(diffDays / 7);
  const diffMonths = Math.round(diffDays / 30);
  const diffYears = Math.round(diffDays / 365);
  
  if (diffSecs < 5) {
    return 'Just now';
  } else if (diffSecs < 60) {
    return `${diffSecs} seconds ago`;
  } else if (diffMins < 60) {
    return diffMins === 1 ? '1 minute ago' : `${diffMins} minutes ago`;
  } else if (diffHours < 24) {
    return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
  } else if (diffDays < 7) {
    return diffDays === 1 ? 'Yesterday' : `${diffDays} days ago`;
  } else if (diffWeeks < 4) {
    return diffWeeks === 1 ? '1 week ago' : `${diffWeeks} weeks ago`;
  } else if (diffMonths < 12) {
    return diffMonths === 1 ? '1 month ago' : `${diffMonths} months ago`;
  } else {
    return diffYears === 1 ? '1 year ago' : `${diffYears} years ago`;
  }
};

/**
 * Format a duration in seconds to a readable string
 * @param seconds Duration in seconds
 * @param format Format to use (default: 'full')
 * @returns Formatted duration string
 */
export const formatDuration = (seconds: number, format: 'full' | 'short' | 'compact' = 'full'): string => {
  if (seconds < 0) {
    return 'Invalid duration';
  }
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  
  switch (format) {
    case 'full':
      // Example: 1 hour, 30 minutes, 45 seconds
      return [
        hours > 0 ? `${hours} ${hours === 1 ? 'hour' : 'hours'}` : '',
        minutes > 0 ? `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}` : '',
        remainingSeconds > 0 || (hours === 0 && minutes === 0) ? `${remainingSeconds} ${remainingSeconds === 1 ? 'second' : 'seconds'}` : '',
      ].filter(Boolean).join(', ');
      
    case 'short':
      // Example: 1h 30m 45s
      return [
        hours > 0 ? `${hours}h` : '',
        minutes > 0 ? `${minutes}m` : '',
        remainingSeconds > 0 || (hours === 0 && minutes === 0) ? `${remainingSeconds}s` : '',
      ].filter(Boolean).join(' ');
      
    case 'compact':
      // Example: 01:30:45
      return [
        hours > 0 ? hours.toString().padStart(2, '0') : '',
        (hours > 0 || minutes > 0) ? minutes.toString().padStart(2, '0') : '',
        remainingSeconds.toString().padStart(2, '0'),
      ].filter(Boolean).join(':');
      
    default:
      return `${seconds} seconds`;
  }
};

/**
 * Format a date range
 * @param startDate Start date
 * @param endDate End date
 * @param format Format to use (default: 'full')
 * @returns Formatted date range string
 */
export const formatDateRange = (startDate: Date | string | number, endDate: Date | string | number, format: 'full' | 'short' = 'full'): string => {
  const start = startDate instanceof Date ? startDate : new Date(startDate);
  const end = endDate instanceof Date ? endDate : new Date(endDate);
  
  // Check if dates are valid
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Invalid date range';
  }
  
  // Check if same day
  const sameDay = start.getDate() === end.getDate() && 
                  start.getMonth() === end.getMonth() && 
                  start.getFullYear() === end.getFullYear();
  
  // Check if same month and year
  const sameMonthYear = start.getMonth() === end.getMonth() && 
                        start.getFullYear() === end.getFullYear();
  
  // Check if same year
  const sameYear = start.getFullYear() === end.getFullYear();
  
  if (format === 'full') {
    if (sameDay) {
      // Example: January 1, 2023 (10:00 AM - 11:00 AM)
      return `${start.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })} (${start.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })} - ${end.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })})`;
    } else if (sameMonthYear) {
      // Example: January 1-2, 2023
      return `${start.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
      })}-${end.getDate()}, ${end.getFullYear()}`;
    } else if (sameYear) {
      // Example: January 1 - February 1, 2023
      return `${start.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
      })} - ${end.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
      })}, ${end.getFullYear()}`;
    } else {
      // Example: January 1, 2023 - February 1, 2024
      return `${start.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })} - ${end.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}`;
    }
  } else {
    // Short format
    if (sameDay) {
      // Example: Jan 1, 2023 (10:00 AM - 11:00 AM)
      return `${start.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })} (${start.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })} - ${end.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })})`;
    } else if (sameMonthYear) {
      // Example: Jan 1-2, 2023
      return `${start.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })}-${end.getDate()}, ${end.getFullYear()}`;
    } else if (sameYear) {
      // Example: Jan 1 - Feb 1, 2023
      return `${start.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })} - ${end.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      })}, ${end.getFullYear()}`;
    } else {
      // Example: Jan 1, 2023 - Feb 1, 2024
      return `${start.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })} - ${end.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })}`;
    }
  }
};