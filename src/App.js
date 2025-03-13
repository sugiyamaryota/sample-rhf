import './App.css';
import { useState } from 'react';
import SampleForm from './components/SampleForm';
import NewFormPage from './components/NewFormPage';
import ModalDemo from './components/ModalDemo';

function App() {
  const [activePage, setActivePage] = useState('sample');

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px'
  };

  const navButtonStyle = {
    padding: '10px 20px',
    margin: '0 10px',
    backgroundColor: '#f0f0f0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  };

  const activeButtonStyle = {
    ...navButtonStyle,
    backgroundColor: '#4CAF50',
    color: 'white',
    fontWeight: 'bold'
  };

  return (
    <div className="App">
      <h1>React Hook Form with DatePicker</h1>
      
      <div style={navStyle}>
        <button 
          style={activePage === 'sample' ? activeButtonStyle : navButtonStyle}
          onClick={() => setActivePage('sample')}
        >
          Sample Form
        </button>
        <button 
          style={activePage === 'new' ? activeButtonStyle : navButtonStyle}
          onClick={() => setActivePage('new')}
        >
          Event Form
        </button>
        <button 
          style={activePage === 'modal' ? activeButtonStyle : navButtonStyle}
          onClick={() => setActivePage('modal')}
        >
          Modal Demo
        </button>
      </div>
      
      {activePage === 'sample' ? <SampleForm /> : 
       activePage === 'new' ? <NewFormPage /> : <ModalDemo />}
    </div>
  );
}

export default App;
