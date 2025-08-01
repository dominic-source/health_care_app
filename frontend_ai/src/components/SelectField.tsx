import { useColors } from '@/hooks/useColors';
import React from 'react';

interface SelectFieldProps {
  label: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  placeholder?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  options,
  error,
  required = false,
  disabled = false,
  className = '',
  placeholder = 'Select an option',
}) => {
  const { colors, getStatusColor } = useColors();

  return (
    <div className={`space-y-1 ${className}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium ml-1"
        style={{ color: colors.text }}
      >
        {label}
        {required && (
          <span className="ml-1" style={{ color: getStatusColor('error') }}>
            *
          </span>
        )}
      </label>
      <div className="relative">
        <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full px-3 py-2 pr-12 rounded-md shadow-sm focus:outline-none focus:ring-2 transition-all disabled:cursor-not-allowed appearance-none hover:cursor-pointer"
          style={{
            border: `1px solid ${
              error ? getStatusColor('error') : colors.border
            }`,
            backgroundColor: disabled ? colors.cardBg : colors.surface,
            color: value === '' ? colors.textMuted : colors.text,
          }}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
        >
          <option value="" disabled style={{ color: colors.textMuted }}>
            {placeholder}
          </option>
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              style={{ color: colors.text }}
            >
              {option.label}
            </option>
          ))}
        </select>
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            style={{ color: colors.textMuted }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
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
