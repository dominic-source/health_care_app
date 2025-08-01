import localFont from 'next/font/local';

// Optimized font loading with variable fonts for better performance
export const geistSans = localFont({
  src: [
    {
      path: '../../public/fonts/Geist/Geist-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-geist-sans',
  display: 'swap',
  preload: true,
  fallback: ['ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const geistMono = localFont({
  src: [
    {
      path: '../../public/fonts/Geist_Mono/GeistMono-VariableFont_wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-geist-mono',
  display: 'swap',
  preload: true,
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
});

// Remove the systemFont definition since it has empty src array
// System fonts should be handled through CSS fallbacks only

// Only include these if you have the actual font files
export const interFont = localFont({
  src: [
    {
      path: '../../public/fonts/Inter/Inter-VariableFont_opsz,wght.ttf',
      weight: '100 900',
      style: 'normal',
    },
  ],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
});

export const sourceSansPro = localFont({
  src: [
    {
      path: '../../public/fonts/Source_Sans_3/SourceSans3-VariableFont_wght.ttf',
      weight: '200 900',
      style: 'normal',
    },
  ],
  variable: '--font-source-sans',
  display: 'swap',
  preload: true,
  fallback: ['Source Sans Pro', 'Arial', 'sans-serif'],
});
