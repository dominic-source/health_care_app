import { useColors } from '@/hooks/useColors';
import React from 'react';

interface CheckboxFieldProps {
  label: string;
  id: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  id,
  name,
  checked,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
}) => {
  const { colors, getStatusColor } = useColors();

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-start">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="mt-1 h-4 w-4 rounded focus:ring-2 disabled:cursor-not-allowed transition-all"
          style={{
            accentColor: colors.primary,
            borderColor: error ? getStatusColor('error') : colors.border,
          }}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        <label
          htmlFor={id}
          className="ml-2 block text-sm"
          style={{ color: colors.text }}
        >
          {label}
          {required && (
            <span className="ml-1" style={{ color: getStatusColor('error') }}>
              *
            </span>
          )}
        </label>
      </div>
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
