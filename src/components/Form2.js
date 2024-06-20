<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import Form3 from './Form3';
import Form4 from './Form4';
import Form5 from './Form5';

const Form2 = () => {
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
    "Elementary emitter module with fibered DEL without electronic": 100,
    "Emitter module with fibered DEL and DEL driver": 130,
    "Emitter/receiver module with fibered DEL + PIN + electronics with or without clock recovery": 180,
    "Emitter/receiver module with fibered DEL + APD + electronics with or without clock recovery": 200,

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
          pieT = 1.2;
          break;
        case '35':
            pieT = 1.4;
            break;
        case '40':
          pieT = 1.6;
          break;
        case '45':
          pieT = 1.8;
          break;
        case '50':
          pieT = 2.1;
          break;
        case '55':
          pieT = 2.4;
          break;
        case '60':
          pieT = 2.7;
          break;
        case '65':
          pieT = 3.0;
          break;
        case '70':
          pieT = 3.4;
          break;
        case '75':
          pieT = 3.8;
          break;
        case '80':
          pieT = 4.3;
          break;
        case '85':
          pieT = 4.8;
          break;
        case '90':
          pieT = 5.3;
          break;
        case '95':
          pieT = 5.9;
          break;
        case '100':
          pieT = 6.6;
          break;
        case '105':
          pieT = 7.3;
          break;
        case '110':
          pieT = 8.0;
          break;
        case '115':
          pieT = 8.8;
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
    <>
      <div style={{ fontFamily: 'sans-serif' }}>
        <h2>Failure Rate Optoelectronics</h2>
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
          <option value="80">80</option>
          <option value="85">85</option>
          <option value="90">90</option>
          <option value="95">95</option>
          <option value="100">100</option>
          <option value="105">105</option>
          <option value="110">110</option>
          <option value="115">115</option>
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

        <h2>Laser Diodes</h2>
        <Form3 />

        <h2>Photodiodes and Receiver</h2>
        <Form4 />

        <h2>Passive and Miscellaneous Optic</h2>
        <Form5 />
      </div>
    </>
  );
};

export default Form2;
=======
import React, { useState, useEffect } from 'react';
import Form3 from './Form3';
import Form4 from './Form4';
import Form5 from './Form5';

const Form2 = () => {
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

  const calculateLambda = () => {
    if (tjValue && lambda0Value) {
      let pieT;
      // Determine pieT based on selected Tj value
      switch (tjValue) {
        case '25':
          pieT = 1;
          break;
        case '30':
          pieT = 1.2;
          break;
        case '35':
            pieT = 1.4;
            break;
        case '40':
          pieT = 1.6;
          break;
        case '45':
          pieT = 1.8;
          break;
        case '50':
          pieT = 2.1;
          break;
        case '55':
          pieT = 2.4;
          break;
        case '60':
          pieT = 2.7;
          break;
        case '65':
          pieT = 3.0;
          break;
        case '70':
          pieT = 3.4;
          break;
        case '75':
          pieT = 3.8;
          break;
        case '80':
          pieT = 4.3;
          break;
        case '85':
          pieT = 4.8;
          break;
        case '90':
          pieT = 5.3;
          break;
        case '95':
          pieT = 5.9;
          break;
        case '100':
          pieT = 6.6;
          break;
        case '105':
          pieT = 7.3;
          break;
        case '110':
          pieT = 8.0;
          break;
        case '115':
          pieT = 8.8;
          break;
        default:
          pieT = 1; // Default value
          break;
      }

      const lambdaNought = parseFloat(lambda0Value);
      const result = (lambdaNought * pieT * Math.pow(10, -9)).toString();
      setLambdaValue(result);
    } else {
      setLambdaValue('');
    }

    
  };

  return (
    <>
    <div style={{ fontFamily: 'sans-serif' }}>
    <h2>Failure Rate Optoelectronics</h2>
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
        <option value="80">80</option>
        <option value="85">85</option>
        <option value="90">90</option>
        <option value="95">95</option>
        <option value="100">100</option>
        <option value="105">105</option>
        <option value="110">110</option>
        <option value="115">115</option>
      </select>
      <p>Select λ0:</p>
      <select value={lambda0Value} onChange={handleLambda0Change}>
        <option value="">Select λ0</option>
        {/* Add options for λ0 values */}
        <option value="100">100</option>
        <option value="130">130</option>
        <option value="180">180</option>
        <option value="200">200</option>
        
      </select>
      <p>λ value:</p>
      <span style={{ fontStyle: 'oblique', color: 'red' }}>{lambdaValue}</span>

    <h2>Laser Diodes</h2>
      <Form3 />

    <h2>Photodiodes and Receiver</h2>
    <Form4 />

    <h2>Passive and Miscellaneous Optic</h2>
    <Form5 />
    </div>
   
  
    </>
  );


};

export default Form2;




>>>>>>> 139bc732b662c887a16a99767b2471234a95a93d
