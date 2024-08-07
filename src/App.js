import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Form2 from './components/Form2';
import Form6 from './components/Form6';
import Form7 from './components/Form7';


function App() {
  const [currentPage, setCurrentPage] = useState('form-1');
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const renderPage = () => {
    switch (currentPage) {
      case 'form-1':
        return <Form />;
      case 'form-2':
        return <Form2 />;
      case 'form-3':
        return <Form6 />;
      case 'form-4':
        return <Form7 />;
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="App">
      <div className="navbar">
        <ul>
          <li onClick={() => handlePageChange('form-1')}>Diodes & Transistors</li>
          <li onClick={() => handlePageChange('form-2')}>Optoelectronics</li>
          <li onClick={() => handlePageChange('form-3')}>Inductors & Transformers</li>
          <li onClick={() => handlePageChange('form-4')}>Resistors</li>
        </ul>
      </div>
      <div className="body">{renderPage()}</div>
    </div>
  );
}

export default App;
