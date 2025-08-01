import { useTheme } from '@/context/ThemeProvider';

/**
 * Custom hook that provides easy access to theme colors and utilities
 */
export function useColors() {
  const { colors, currentTheme } = useTheme();

  return {
    colors,
    currentTheme,
    // Helper functions for common use cases
    getStatusColor: (status: 'success' | 'warning' | 'error' | 'info') =>
      colors[status],
    getTextColor: (variant: 'primary' | 'secondary' | 'muted' = 'primary') => {
      switch (variant) {
        case 'secondary':
          return colors.textSecondary;
        case 'muted':
          return colors.textMuted;
        default:
          return colors.text;
      }
    },
    getBorderColor: (variant: 'default' | 'light' = 'default') => {
      return variant === 'light' ? colors.borderLight : colors.border;
    },
  };
}
