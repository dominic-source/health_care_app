# Healthcare EMR - Theme System

This healthcare application includes a comprehensive theme system that allows you to customize the visual appearance using predefined color palettes optimized for medical interfaces.

## Available Themes

### 1. Clinical Blue (Default)

- **Primary Color**: #2563eb
- **Description**: Professional medical interface with clinical blue tones
- **Best for**: Hospital settings, professional medical environments

### 2. Healthcare Green

- **Primary Color**: #16a34a
- **Description**: Natural and calming green palette
- **Best for**: Wellness centers, primary care clinics

### 3. Medical Navy

- **Primary Color**: #1e40af
- **Description**: Trust and reliability with navy blue tones
- **Best for**: Emergency departments, urgent care centers

### 4. Wellness Purple

- **Primary Color**: #7c3aed
- **Description**: Modern and innovative purple palette
- **Best for**: Mental health facilities, wellness centers

### 5. Therapeutic Teal

- **Primary Color**: #0d9488
- **Description**: Calming and healing teal tones
- **Best for**: Rehabilitation centers, therapy clinics

## Environment Configuration

### Setting the Default Theme

1. Create or edit the `.env.local` file in your project root:

```bash
# Available themes: clinical, healthcare, medical, wellness, therapeutic
NEXT_PUBLIC_COLOR_THEME=clinical
```

2. Available theme values:
   - `clinical` - Clinical Blue (default)
   - `healthcare` - Healthcare Green
   - `medical` - Medical Navy
   - `wellness` - Wellness Purple
   - `therapeutic` - Therapeutic Teal

### Example Environment Configurations

For a wellness center:

```bash
NEXT_PUBLIC_COLOR_THEME=wellness
```

For a hospital:

```bash
NEXT_PUBLIC_COLOR_THEME=clinical
```

For a rehabilitation center:

```bash
NEXT_PUBLIC_COLOR_THEME=therapeutic
```

## Using Themes in Your Code

### 1. useTheme Hook

```tsx
import { useTheme } from '@/context/ThemeProvider';

function MyComponent() {
  const { currentTheme, setTheme, colors } = useTheme();

  return (
    <div style={{ backgroundColor: colors.primary }}>
      Current theme: {currentTheme}
    </div>
  );
}
```

### 2. useColors Hook (Recommended)

```tsx
import { useColors } from '@/hooks/useColors';

function MyComponent() {
  const { colors, getStatusColor, getTextColor } = useColors();

  return (
    <div
      style={{
        backgroundColor: colors.surface,
        color: getTextColor('primary'),
        borderColor: colors.border,
      }}
    >
      <div style={{ color: getStatusColor('success') }}>Success message</div>
    </div>
  );
}
```

### 3. CSS Custom Properties

You can also use CSS custom properties directly:

```css
.my-element {
  background-color: var(--color-primary);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.success-message {
  color: var(--color-success);
}
```

## Theme Switching

### Runtime Theme Switching

Users can switch themes at runtime using the `ThemeSwitcher` component:

```tsx
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

function SettingsPage() {
  return (
    <div>
      <h1>Settings</h1>
      <ThemeSwitcher />
    </div>
  );
}
```

### Programmatic Theme Switching

```tsx
import { useTheme } from '@/context/ThemeProvider';

function MyComponent() {
  const { setTheme } = useTheme();

  const switchToWellness = () => {
    setTheme('wellness');
  };

  return <button onClick={switchToWellness}>Switch to Wellness Theme</button>;
}
```

## Theme Structure

Each theme includes the following color properties:

```typescript
interface ColorPalette {
  primary: string; // Main brand color
  secondary: string; // Secondary actions
  tertiary: string; // Tertiary elements
  accent: string; // Accent highlights
  success: string; // Success states
  warning: string; // Warning states
  error: string; // Error states
  info: string; // Information states
  background: string; // Page background
  surface: string; // Card/surface background
  cardBg: string; // Card background variant
  text: string; // Primary text
  textSecondary: string; // Secondary text
  textMuted: string; // Muted text
  border: string; // Border color
  borderLight: string; // Light border variant
}
```

## Best Practices

1. **Consistency**: Always use the theme colors instead of hardcoded values
2. **Semantic Colors**: Use `getStatusColor()` for status indicators
3. **Text Hierarchy**: Use `getTextColor()` for proper text contrast
4. **Environment Override**: Set `NEXT_PUBLIC_COLOR_THEME` for consistent branding
5. **User Choice**: Provide theme switching in user settings when appropriate

## Development

### Adding a New Theme

1. Add the theme to `src/appConstants/colors.ts`:

```typescript
export const myNewTheme: ColorPalette = {
  primary: '#your-color',
  // ... other colors
};

export const colorThemes = {
  // ... existing themes
  myNew: myNewTheme,
} as const;
```

2. Update the configuration in `src/appConstants/config.ts`:

```typescript
static getAvailableThemes() {
  return [
    // ... existing themes
    {
      key: 'myNew',
      name: 'My New Theme',
      description: 'Description of the theme',
      primaryColor: colorThemes.myNew.primary,
    },
  ];
}
```

3. Update your `.env.local`:

```bash
NEXT_PUBLIC_COLOR_THEME=myNew
```

## Deployment

When deploying to different environments, you can set different themes:

### Production

```bash
NEXT_PUBLIC_COLOR_THEME=clinical
```

### Staging

```bash
NEXT_PUBLIC_COLOR_THEME=wellness
```

### Development

```bash
NEXT_PUBLIC_COLOR_THEME=therapeutic
```

This allows for easy differentiation between environments while maintaining the same codebase.
