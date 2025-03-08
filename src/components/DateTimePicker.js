import React from 'react';
import { useController } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * A combined DateTimePicker component that works with React Hook Form
 * 
 * @param {Object} props - Component props
 * @param {Object} props.control - React Hook Form control object
 * @param {string} props.name - Field name for the form
 * @param {Object} props.rules - Validation rules for React Hook Form
 * @param {string} props.label - Label text for the field
 * @param {Date} props.defaultValue - Default date/time value
 * @param {boolean} props.showTimeSelect - Whether to show time selection
 * @param {boolean} props.showTimeSelectOnly - Whether to show only time selection
 * @param {string} props.dateFormat - Format for displaying the date/time
 * @param {Object} props.customStyles - Custom styles for the component
 */
const DateTimePicker = ({
  control,
  name,
  rules = {},
  label,
  defaultValue = null,
  showTimeSelect = true,
  showTimeSelectOnly = false,
  dateFormat = "yyyy/MM/dd HH:mm",
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
    borderRadius: '4px'
  };

  const defaultErrorStyle = {
    color: '#ff0000',
    fontSize: '14px',
    marginTop: '5px'
  };

  // Merge default styles with custom styles
  const containerStyle = { ...defaultContainerStyle, ...customStyles.container };
  const labelStyle = { ...defaultLabelStyle, ...customStyles.label };
  const inputStyle = { ...defaultInputStyle, ...customStyles.input };
  const errorStyle = { ...defaultErrorStyle, ...customStyles.error };

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <DatePicker
        selected={value}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        showTimeSelect={showTimeSelect}
        showTimeSelectOnly={showTimeSelectOnly}
        timeIntervals={15}
        timeCaption="Time"
        dateFormat={dateFormat}
        className="date-picker-input"
        wrapperClassName="date-picker-wrapper"
        style={inputStyle}
        {...rest}
      />
      {error && <p style={errorStyle}>{error.message}</p>}
    </div>
  );
};

export default DateTimePicker;
