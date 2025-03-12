import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import InputField from './InputField';
import DateTimePicker from './DateTimePicker';

const ModalDemo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(null);
  
  const { control, handleSubmit, reset } = useForm();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset form when modal is closed
    reset();
  };

  const onSubmit = (data) => {
    // Format dates for display
    const formattedData = {
      ...data,
      meetingDate: data.meetingDate ? data.meetingDate.toString() : '',
    };
    
    console.log('Form submitted with:', formattedData);
    setFormData(formattedData);
    closeModal();
  };

  const containerStyle = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#f5f5f5',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '12px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    marginTop: '20px'
  };

  const headerStyle = {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px'
  };

  const cardStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
    marginTop: '20px'
  };

  const modalFormStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  };

  const modalButtonsStyle = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
    borderTop: '1px solid #eee',
    backgroundColor: '#f9f9f9'
  };

  const cancelButtonStyle = {
    backgroundColor: '#f0f0f0',
    color: '#333',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px'
  };

  const submitButtonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Modal Component Demo</h2>
      
      <p>Click the button below to open a modal with a form:</p>
      
      <button style={buttonStyle} onClick={openModal}>
        Schedule a Meeting
      </button>
      
      {formData && (
        <div style={cardStyle}>
          <h3>Submitted Meeting Details:</h3>
          <p><strong>Title:</strong> {formData.meetingTitle}</p>
          <p><strong>Date:</strong> {formData.meetingDate}</p>
          <p><strong>Participants:</strong> {formData.participants}</p>
          <p><strong>Description:</strong> {formData.description || 'N/A'}</p>
        </div>
      )}
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title="Schedule a Meeting"
        size="medium"
      >
        <form onSubmit={handleSubmit(onSubmit)} style={modalFormStyle}>
          <InputField
            control={control}
            name="meetingTitle"
            label="Meeting Title"
            rules={{ 
              required: 'Meeting title is required',
              minLength: {
                value: 3,
                message: 'Title must be at least 3 characters'
              }
            }}
            placeholder="Enter meeting title"
          />
          
          <DateTimePicker
            control={control}
            name="meetingDate"
            label="Meeting Date and Time"
            rules={{ 
              required: 'Meeting date and time is required' 
            }}
            placeholderText="Select meeting date and time"
            showTimeSelect={true}
            minDate={new Date()}
          />
          
          <InputField
            control={control}
            name="participants"
            label="Participants"
            rules={{ 
              required: 'Participants are required' 
            }}
            placeholder="Enter participant names (comma separated)"
          />
          
          <InputField
            control={control}
            name="description"
            label="Meeting Description"
            placeholder="Enter meeting description (optional)"
            multiline={true}
            rows={4}
          />
          
          <div style={modalButtonsStyle}>
            <button 
              type="button" 
              style={cancelButtonStyle}
              onClick={closeModal}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              style={submitButtonStyle}
            >
              Schedule Meeting
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalDemo;
