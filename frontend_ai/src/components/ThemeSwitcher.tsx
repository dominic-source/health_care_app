'use client';

import { colorThemes, type ColorTheme } from '@/constant/colors';
import { useTheme } from '@/context/ThemeProvider';

export function ThemeSwitcher() {
  const { currentTheme, setTheme } = useTheme();

  const themeOptions: {
    value: ColorTheme;
    label: string;
    description: string;
  }[] = [
    {
      value: 'clinical',
      label: 'Clinical Blue',
      description: 'Professional medical interface',
    },
    {
      value: 'healthcare',
      label: 'Healthcare Green',
      description: 'Natural and calming',
    },
    {
      value: 'medical',
      label: 'Medical Navy',
      description: 'Trust and reliability',
    },
    {
      value: 'wellness',
      label: 'Wellness Purple',
      description: 'Modern and innovative',
    },
    {
      value: 'therapeutic',
      label: 'Therapeutic Teal',
      description: 'Calming and healing',
    },
  ];

  return (
    <div
      className="p-4 border rounded-lg"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-text)',
      }}
    >
      <h3
        className="text-lg font-semibold mb-3"
        style={{ color: 'var(--color-text)' }}
      >
        Theme Settings
      </h3>
      <div className="space-y-2">
        {themeOptions.map(option => (
          <label
            key={option.value}
            className="flex items-center space-x-3 p-2 rounded cursor-pointer hover:opacity-80 transition-opacity"
            style={{
              backgroundColor:
                currentTheme === option.value
                  ? 'var(--color-cardBg)'
                  : 'transparent',
            }}
          >
            <input
              type="radio"
              name="theme"
              value={option.value}
              checked={currentTheme === option.value}
              onChange={e => setTheme(e.target.value as ColorTheme)}
              className="w-4 h-4"
              style={{ accentColor: 'var(--color-primary)' }}
            />
            <div>
              <div
                className="font-medium"
                style={{ color: 'var(--color-text)' }}
              >
                {option.label}
              </div>
              <div
                className="text-sm"
                style={{ color: 'var(--color-textMuted)' }}
              >
                {option.description}
              </div>
            </div>
            <div
              className="w-6 h-6 rounded-full ml-auto"
              style={{ backgroundColor: colorThemes[option.value].primary }}
            />
          </label>
        ))}
      </div>
      <div
        className="mt-4 p-3 rounded text-sm"
        style={{
          backgroundColor: 'var(--color-cardBg)',
          color: 'var(--color-textSecondary)',
        }}
      >
        <strong>Current theme:</strong> {currentTheme}
        <br />
        <strong>Environment theme:</strong>{' '}
        {process.env.NEXT_PUBLIC_COLOR_THEME || 'Not set'}
      </div>
    </div>
  );
}
