import React from 'react';
import { useForm } from 'react-hook-form';
import DateTimePicker from './DateTimePicker';

const SampleForm = () => {
  const { control, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Format dates for display
    const formattedData = {
      ...data,
      dateTime: data.dateTime ? data.dateTime.toString() : '',
      dateOnly: data.dateOnly ? data.dateOnly.toString() : '',
      timeOnly: data.timeOnly ? data.timeOnly.toString() : '',
    };
    
    console.log('Form submitted with:', formattedData);
    alert('Form submitted! Check console for details.');
  };

  const formStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px'
  };

  return (
    <div style={formStyle}>
      <h2 style={headerStyle}>Date & Time Picker Demo</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Combined Date and Time Picker */}
        <DateTimePicker
          control={control}
          name="dateTime"
          label="Date and Time"
          rules={{ 
            required: 'Date and time is required' 
          }}
          placeholderText="Select date and time"
          showTimeSelect={true}
        />

        {/* Date Only Picker */}
        <DateTimePicker
          control={control}
          name="dateOnly"
          label="Date Only"
          rules={{ 
            required: 'Date is required' 
          }}
          placeholderText="Select date"
          showTimeSelect={false}
          dateFormat="yyyy/MM/dd"
        />

        {/* Time Only Picker */}
        <DateTimePicker
          control={control}
          name="timeOnly"
          label="Time Only"
          rules={{ 
            required: 'Time is required' 
          }}
          placeholderText="Select time"
          showTimeSelect={true}
          showTimeSelectOnly={true}
          dateFormat="HH:mm"
        />

        <button type="submit" style={buttonStyle}>
          Submit Form
        </button>
      </form>
    </div>
  );
};

export default SampleForm;
