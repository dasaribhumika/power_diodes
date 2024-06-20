import React, { useState, useEffect } from 'react';

const Form3 = () => {
  const [tjValue, setTjValue] = useState('');
  const [lambda0Value, setLambda0Value] = useState('');
  const [lambdaValue, setLambdaValue] = useState('');

  const handleTjChange = (event) => {
    setTjValue(event.target.value);
  };

  const handleLambda0Change = (event) => {
    setLambda0Value(event.target.value);
  };

  useEffect(() => {
    calculateLambda();
  }, [tjValue, lambda0Value]);

  const lambdaOptions = {
    "Elementary emitter modules": 3000,
    "Elementary emitter modules without electronics": 40,
    "Emitter module with electronics": 60,
    "Emitter/receiver module, with laser PIN and electronics, with or without clock recovery": 80,
    "Integrated modulator laser module": 100,
    "Pump laser module, Power <= 250mW": 200,
    "Pump laser module, Power > 250mW": 350,
    "Pump laser module": 300,
    
  };

  const calculateLambda = () => {
    if (tjValue && lambda0Value) {
      let pieT;
      // Determine pieT based on selected Tj value
      switch (tjValue) {
        case '25':
          pieT = 1;
          break;
        case '30':
          pieT = 1.3;
          break;
        case '35':
          pieT = 1.7;
          break;
        case '40':
          pieT = 2.1;
          break;
        case '45':
          pieT = 2.7;
          break;
        case '50':
          pieT = 3.3;
          break;
        case '55':
          pieT = 4.1;
          break;
        case '60':
          pieT = 5.1;
          break;
        case '65':
          pieT = 6.3;
          break;
        case '70':
          pieT = 7.7;
          break;
        case '75':
          pieT = 9.3;
          break;
        default:
          pieT = 1; // Default value
          break;
      }

      const lambdaNought = parseFloat(lambdaOptions[lambda0Value]);
      const result = (lambdaNought * pieT * Math.pow(10, -9)).toString();
      setLambdaValue(result);
    } else {
      setLambdaValue('');
    }
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <p>Select Tj:</p>
      <select value={tjValue} onChange={handleTjChange}>
        <option value="">Select Tj</option>
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="35">35</option>
        <option value="40">40</option>
        <option value="45">45</option>
        <option value="50">50</option>
        <option value="55">55</option>
        <option value="60">60</option>
        <option value="65">65</option>
        <option value="70">70</option>
        <option value="75">75</option>
      </select>
      <p>Select λ0:</p>
      <select value={lambda0Value} onChange={handleLambda0Change}>
        <option value="">Select λ0</option>
        {Object.keys(lambdaOptions).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <p>λ value:</p>
      <span style={{ fontStyle: 'oblique', color: 'red' }}>{lambdaValue}</span>
    </div>
  );
};

export default Form3;
