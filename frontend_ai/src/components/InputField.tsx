import { useColors } from '@/hooks/useColors';
import React from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  id,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder,
  disabled = false,
  className = '',
}) => {
  const { colors, getStatusColor } = useColors();

  return (
    <div className={`space-y-1 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium"
        style={{ color: colors.text }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: getStatusColor('error') }}>
            *
          </span>
        )}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all disabled:cursor-not-allowed"
        style={
          {
            border: `1px solid ${
              error ? getStatusColor('error') : colors.border
            }`,
            backgroundColor: disabled ? colors.cardBg : colors.surface,
            color: colors.text,
            '--tw-ring-color': colors.primary,
          } as React.CSSProperties
        }
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="text-sm"
          role="alert"
          style={{ color: getStatusColor('error') }}
        >
          {error}
        </p>
      )}
    </div>
  );
};
