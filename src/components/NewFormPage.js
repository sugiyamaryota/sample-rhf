import React from 'react';
import { useForm } from 'react-hook-form';
import DateTimePicker from './DateTimePicker';
import InputField from './InputField';

const NewFormPage = () => {
  const { control, handleSubmit } = useForm();

  const onSubmit = (data) => {
    // Format dates for display
    const formattedData = {
      ...data,
      eventDate: data.eventDate ? data.eventDate.toString() : '',
    };
    
    console.log('Form submitted with:', formattedData);
    alert('Event created successfully! Check console for details.');
  };

  const formStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  };

  const buttonStyle = {
    backgroundColor: '#4361ee',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    width: '100%',
    marginTop: '20px'
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px'
  };

  const sectionStyle = {
    marginBottom: '30px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)'
  };

  return (
    <div style={formStyle}>
      <h2 style={headerStyle}>Create New Event</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={sectionStyle}>
          <h3>Event Details</h3>
          
          <InputField
            control={control}
            name="eventName"
            label="Event Name"
            rules={{ 
              required: 'Event name is required',
              minLength: {
                value: 3,
                message: 'Event name must be at least 3 characters'
              }
            }}
            placeholder="Enter event name"
          />
          
          <InputField
            control={control}
            name="location"
            label="Location"
            rules={{ 
              required: 'Location is required' 
            }}
            placeholder="Enter event location"
          />
          
          <DateTimePicker
            control={control}
            name="eventDate"
            label="Event Date and Time"
            rules={{ 
              required: 'Event date and time is required' 
            }}
            placeholderText="Select event date and time"
            showTimeSelect={true}
            minDate={new Date()}
          />
        </div>
        
        <div style={sectionStyle}>
          <h3>Organizer Information</h3>
          
          <InputField
            control={control}
            name="organizerName"
            label="Organizer Name"
            rules={{ 
              required: 'Organizer name is required' 
            }}
            placeholder="Enter organizer name"
          />
          
          <InputField
            control={control}
            name="email"
            type="email"
            label="Email"
            rules={{ 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            }}
            placeholder="Enter email address"
          />
          
          <InputField
            control={control}
            name="phone"
            label="Phone Number"
            rules={{ 
              pattern: {
                value: /^[0-9+-]+$/,
                message: 'Invalid phone number'
              }
            }}
            placeholder="Enter phone number (optional)"
          />
        </div>
        
        <div style={sectionStyle}>
          <h3>Additional Information</h3>
          
          <InputField
            control={control}
            name="description"
            label="Event Description"
            placeholder="Enter event description (optional)"
            multiline={true}
            rows={5}
          />
        </div>

        <button type="submit" style={buttonStyle}>
          Create Event
        </button>
      </form>
    </div>
  );
};

export default NewFormPage;
