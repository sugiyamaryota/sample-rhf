import React, { useEffect } from 'react';

/**
 * A reusable modal component
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {Function} props.onClose - Function to call when the modal is closed
 * @param {string} props.title - Title of the modal
 * @param {React.ReactNode} props.children - Content of the modal
 * @param {string} props.size - Size of the modal ('small', 'medium', 'large')
 * @param {Object} props.customStyles - Custom styles for the component
 */
const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  customStyles = {},
}) => {
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      // Restore scrolling when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Size presets
  const sizeMap = {
    small: '400px',
    medium: '600px',
    large: '800px',
  };

  // Default styles
  const defaultOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  };

  const defaultModalStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: sizeMap[size] || sizeMap.medium,
    maxWidth: '90%',
    maxHeight: '90vh',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
  };

  const defaultHeaderStyle = {
    padding: '16px 24px',
    borderBottom: '1px solid #eee',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const defaultTitleStyle = {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
  };

  const defaultCloseButtonStyle = {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#666',
    padding: '0',
    lineHeight: '1',
  };

  const defaultContentStyle = {
    padding: '24px',
    paddingBottom: '16px',
    overflowY: 'auto',
    maxHeight: 'calc(70vh - 120px)', // Adjust for header and footer
    flex: '1 1 auto',
  };

  const defaultFooterStyle = {
    padding: '16px 24px',
    borderTop: '1px solid #eee',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  };

  // Merge default styles with custom styles
  const overlayStyle = { ...defaultOverlayStyle, ...customStyles.overlay };
  const modalStyle = { ...defaultModalStyle, ...customStyles.modal };
  const headerStyle = { ...defaultHeaderStyle, ...customStyles.header };
  const titleStyle = { ...defaultTitleStyle, ...customStyles.title };
  const closeButtonStyle = { ...defaultCloseButtonStyle, ...customStyles.closeButton };
  const contentStyle = { ...defaultContentStyle, ...customStyles.content };
  const footerStyle = { ...defaultFooterStyle, ...customStyles.footer };

  // Stop propagation to prevent closing when clicking inside the modal
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // Extract footer content if present
  let mainContent = children;
  let footerContent = null;

  // Check if children is an object with a footer property
  if (children && typeof children === 'object' && !Array.isArray(children) && children.type === 'div') {
    // Look for a div with modalButtonsStyle in the children's props
    React.Children.forEach(children.props.children, child => {
      if (child && child.props && child.props.style && 
          child.props.style.borderTop === '1px solid #eee' && 
          child.props.style.backgroundColor === '#f9f9f9') {
        footerContent = child;
        // Remove the footer content from the main content
        mainContent = React.cloneElement(children, {
          children: React.Children.map(children.props.children, c => 
            c !== footerContent ? c : null
          )
        });
      }
    });
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={handleModalClick}>
        <div style={headerStyle}>
          <h3 style={titleStyle}>{title}</h3>
          <button 
            style={closeButtonStyle} 
            onClick={onClose}
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        <div style={contentStyle}>
          {mainContent}
        </div>
        {footerContent && (
          <div style={footerStyle}>
            {footerContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
