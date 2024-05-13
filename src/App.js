import './App.css';
import { useState } from 'react';
import Form from './components/Form';
import Form2 from './components/Form2';
import Form6 from './components/Form6';


function App() {
  // State to track which page is currently active
  const [currentPage, setCurrentPage] = useState('form-1');

  // Function to handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Render different pages based on currentPage state
  const renderPage = () => {
    switch (currentPage) {
      case 'form-1':
        return <Form />;
      // Add more cases for other pages if needed
      case 'form-2':
        return <Form2 />;
      case 'form-3':
        return <Form6 />;
     
      default:
        return <div>Page not found</div>;
    }
  };

  return (
    <div className="App">
      <div className="navbar">
        <ul>
          <li onClick={() => handlePageChange('form-1')}>Form-1</li>
          <li onClick={() => handlePageChange('form-2')}>Form-2</li>
          <li onClick={() => handlePageChange('form-3')}>Form-3</li>
        </ul>
      </div>
      <div className="body">{renderPage()}</div>
    </div>
  );
}

export default App;
