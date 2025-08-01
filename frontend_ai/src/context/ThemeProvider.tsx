'use client';

import { colorThemes, type ColorTheme } from '@/constant/colors';
import { AppConfig } from '@/constant/config';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface ThemeContextType {
  currentTheme: ColorTheme;
  setTheme: (theme: ColorTheme) => void;
  colors: (typeof colorThemes)[ColorTheme];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ColorTheme;
}

export function ThemeProvider({ children, defaultTheme }: ThemeProviderProps) {
  // Get theme from environment variable or use default
  const initialTheme = defaultTheme || AppConfig.getThemeFromEnv();

  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(initialTheme);

  // Apply CSS custom properties when theme changes
  useEffect(() => {
    const colors = colorThemes[currentTheme];
    const root = document.documentElement;

    // Set CSS custom properties
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Set data attribute for CSS selectors
    root.setAttribute('data-theme', currentTheme);

    // Log theme change for debugging
    console.log(`🎨 Theme switched to: ${currentTheme}`);
  }, [currentTheme]);

  const setTheme = (theme: ColorTheme) => {
    if (AppConfig.isValidTheme(theme)) {
      setCurrentTheme(theme);
    } else {
      console.warn(`Invalid theme: ${theme}. Falling back to current theme.`);
    }
  };

  const value: ThemeContextType = {
    currentTheme,
    setTheme,
    colors: colorThemes[currentTheme],
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
