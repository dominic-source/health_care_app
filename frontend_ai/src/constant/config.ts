import { colorThemes, type ColorTheme } from './colors';

/**
 * Configuration utility for managing app-wide settings
 */
export class AppConfig {
  /**
   * Get the current theme from environment variable
   */
  static getThemeFromEnv(): ColorTheme {
    const envTheme = process.env.NEXT_PUBLIC_COLOR_THEME as ColorTheme;

    // Validate that the environment theme exists in our color themes
    if (envTheme && envTheme in colorThemes) {
      return envTheme;
    }

    // Fallback to clinical theme if environment variable is not set or invalid
    return 'clinical';
  }

  /**
   * Get all available theme options
   */
  static getAvailableThemes(): Array<{
    key: ColorTheme;
    name: string;
    description: string;
    primaryColor: string;
  }> {
    return [
      {
        key: 'clinical',
        name: 'Clinical Blue',
        description: 'Professional medical interface',
        primaryColor: colorThemes.clinical.primary,
      },
      {
        key: 'healthcare',
        name: 'Healthcare Green',
        description: 'Natural and calming',
        primaryColor: colorThemes.healthcare.primary,
      },
      {
        key: 'medical',
        name: 'Medical Navy',
        description: 'Trust and reliability',
        primaryColor: colorThemes.medical.primary,
      },
      {
        key: 'wellness',
        name: 'Wellness Purple',
        description: 'Modern and innovative',
        primaryColor: colorThemes.wellness.primary,
      },
      {
        key: 'therapeutic',
        name: 'Therapeutic Teal',
        description: 'Calming and healing',
        primaryColor: colorThemes.therapeutic.primary,
      },
    ];
  }

  /**
   * Validate if a theme key is valid
   */
  static isValidTheme(theme: string): theme is ColorTheme {
    return theme in colorThemes;
  }

  /**
   * Get theme colors for a specific theme
   */
  static getThemeColors(theme: ColorTheme) {
    return colorThemes[theme];
  }
}

// Export for convenient usage
export const getDefaultTheme = AppConfig.getThemeFromEnv;
export const availableThemes = AppConfig.getAvailableThemes();
