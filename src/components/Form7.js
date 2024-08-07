// MainComponent.jsx
import React, { useState } from 'react';
import Form8 from './Form8';
import Form9 from './Form9'; 
import Form10 from './Form10';
import Form11 from './Form11';
import Form12 from './Form12';

const Form7 = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <p>Select Component:</p>
      <select value={selectedOption} onChange={handleOptionChange}>
        <option value="">Select Component</option>
        <option value="hotMoldCarbonComponent">Hot Mold Carbon Component</option>
        <option value="fixedHighDissipationFilmRegister">Fixed High Dissipation Film Register</option>
        <option value="Low Dissipation Wire Wound">Low Dissipation Wire Wound</option>
        <option value="High Dissipation Wire Wound">High Dissipation Wire Wound</option>
        <option value="Non-Wire Wound Potentiometer">Non-Wire Wound Potentiometer</option>
      </select>

      {selectedOption === 'hotMoldCarbonComponent' && <Form8 />}
      {selectedOption === 'fixedHighDissipationFilmRegister' && <Form9 />}
      {selectedOption === 'Low Dissipation Wire Wound' && <Form10 />}
      {selectedOption === 'High Dissipation Wire Wound' && <Form11 />}
      {selectedOption === 'Non-Wire Wound Potentiometer' && <Form12 />}
    </div>
  );
};

export default Form7;
