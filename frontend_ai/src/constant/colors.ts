// Standardized color interface for healthcare applications
interface ColorPalette {
  primary: string;
  secondary: string;
  tertiary: string;
  accent: string;
  success: string;
  warning: string;
  error: string;
  info: string;
  background: string;
  surface: string;
  cardBg: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderLight: string;
}

// Clinical Blue - Professional medical interface
export const clinicalColors: ColorPalette = {
  primary: '#2563eb',
  secondary: '#64748b',
  tertiary: '#0ea5e9',
  accent: '#7c3aed',
  success: '#059669',
  warning: '#d97706',
  error: '#dc2626',
  info: '#0284c7',
  background: '#f8fafc',
  surface: '#ffffff',
  cardBg: '#f1f5f9',
  text: '#1e293b',
  textSecondary: '#475569',
  textMuted: '#64748b',
  border: '#e2e8f0',
  borderLight: '#f1f5f9',
};

// Healthcare Green - Natural and calming
export const healthcareColors: ColorPalette = {
  primary: '#16a34a',
  secondary: '#475569',
  tertiary: '#059669',
  accent: '#0891b2',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
  background: '#ffffff',
  surface: '#f9fafb',
  cardBg: '#f0fdf4',
  text: '#0f172a',
  textSecondary: '#374151',
  textMuted: '#6b7280',
  border: '#d1d5db',
  borderLight: '#e5e7eb',
};

// Medical Navy - Trust and reliability
export const medicalColors: ColorPalette = {
  primary: '#1e40af',
  secondary: '#6b7280',
  tertiary: '#1d4ed8',
  accent: '#06b6d4',
  success: '#10b981',
  warning: '#f97316',
  error: '#f87171',
  info: '#3b82f6',
  background: '#f1f5f9',
  surface: '#ffffff',
  cardBg: '#f8fafc',
  text: '#334155',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  border: '#cbd5e1',
  borderLight: '#e2e8f0',
};

// Wellness Purple - Modern and innovative
export const wellnessColors: ColorPalette = {
  primary: '#7c3aed',
  secondary: '#6b7280',
  tertiary: '#8b5cf6',
  accent: '#06b6d4',
  success: '#059669',
  warning: '#ea580c',
  error: '#dc2626',
  info: '#0284c7',
  background: '#fafafa',
  surface: '#ffffff',
  cardBg: '#faf5ff',
  text: '#374151',
  textSecondary: '#4b5563',
  textMuted: '#6b7280',
  border: '#d1d5db',
  borderLight: '#e5e7eb',
};

// Therapeutic Teal - Calming and healing
export const therapeuticColors: ColorPalette = {
  primary: '#0d9488',
  secondary: '#64748b',
  tertiary: '#14b8a6',
  accent: '#7c3aed',
  success: '#22c55e',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#06b6d4',
  background: '#f0fdfa',
  surface: '#ffffff',
  cardBg: '#f0fdf4',
  text: '#134e4a',
  textSecondary: '#374151',
  textMuted: '#6b7280',
  border: '#a7f3d0',
  borderLight: '#d1fae5',
};

// Export all color themes for easy switching
export const colorThemes = {
  clinical: clinicalColors,
  healthcare: healthcareColors,
  medical: medicalColors,
  wellness: wellnessColors,
  therapeutic: therapeuticColors,
} as const;

export type ColorTheme = keyof typeof colorThemes;
