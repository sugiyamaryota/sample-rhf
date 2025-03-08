import React from 'react';
import { useController } from 'react-hook-form';

/**
 * A reusable input field component that works with React Hook Form
 * 
 * @param {Object} props - Component props
 * @param {Object} props.control - React Hook Form control object
 * @param {string} props.name - Field name for the form
 * @param {Object} props.rules - Validation rules for React Hook Form
 * @param {string} props.label - Label text for the field
 * @param {string} props.type - Input type (text, email, password, etc.)
 * @param {string} props.placeholder - Placeholder text for the input
 * @param {string} props.defaultValue - Default value for the input
 * @param {boolean} props.multiline - Whether to render a textarea instead of an input
 * @param {number} props.rows - Number of rows for textarea (only used if multiline is true)
 * @param {Object} props.customStyles - Custom styles for the component
 */
const InputField = ({
  control,
  name,
  rules = {},
  label,
  type = 'text',
  placeholder = '',
  defaultValue = '',
  multiline = false,
  rows = 4,
  customStyles = {},
  ...rest
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error }
  } = useController({
    name,
    control,
    rules,
    defaultValue
  });

  // Default styles
  const defaultContainerStyle = {
    marginBottom: '20px'
  };

  const defaultLabelStyle = {
    display: 'block',
    marginBottom: '5px',
    fontWeight: 'bold'
  };

  const defaultInputStyle = {
    width: '100%',
    padding: '8px',
    border: error ? '1px solid #ff0000' : '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box'
  };

  const defaultTextareaStyle = {
    ...defaultInputStyle,
    minHeight: '100px',
    resize: 'vertical'
  };

  const defaultErrorStyle = {
    color: '#ff0000',
    fontSize: '14px',
    marginTop: '5px'
  };

  // Merge default styles with custom styles
  const containerStyle = { ...defaultContainerStyle, ...customStyles.container };
  const labelStyle = { ...defaultLabelStyle, ...customStyles.label };
  const inputStyle = multiline 
    ? { ...defaultTextareaStyle, ...customStyles.input }
    : { ...defaultInputStyle, ...customStyles.input };
  const errorStyle = { ...defaultErrorStyle, ...customStyles.error };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      
      {multiline ? (
        <textarea
          onChange={onChange}
          onBlur={onBlur}
          value={value || ''}
          ref={ref}
          placeholder={placeholder}
          rows={rows}
          style={inputStyle}
          {...rest}
        />
      ) : (
        <input
          type={type}
          onChange={onChange}
          onBlur={onBlur}
          value={value || ''}
          ref={ref}
          placeholder={placeholder}
          style={inputStyle}
          {...rest}
        />
      )}
      
      {error && <p style={errorStyle}>{error.message}</p>}
    </div>
  );
};

export default InputField;
