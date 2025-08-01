import { useColors } from '@/hooks/useColors';
import React from 'react';

interface TextAreaFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder,
  disabled = false,
  rows = 3,
  className = '',
}) => {
  const { colors, getStatusColor } = useColors();

  return (
    <div className={`space-y-1 ${className}`}>
      <label
        htmlFor={id}
        className="block text-lg font-medium mb-2"
        style={{ color: colors.text }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: getStatusColor('error') }}>
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        rows={rows}
        className="w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all disabled:cursor-not-allowed resize-vertical"
        style={{
          border: `1px solid ${
            error ? getStatusColor('error') : colors.border
          }`,
          backgroundColor: disabled ? colors.cardBg : colors.surface,
          color: colors.text,
        }}
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
