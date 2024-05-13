import React, { useState, useEffect } from 'react';

const Form5 = () => {
  
    const [componentValue, setComponentValue] = useState('');
    const [lambdaValue, setLambdaValue] = useState('');
  
    const handleComponentChange = (event) => {
      setComponentValue(event.target.value);
    };
  
    useEffect(() => {
      calculateLambda();
    }, [componentValue]);
  
    const calculateLambda = () => {
      if (componentValue) {
        const componentLambdaValues = {
          'Attenuators - Bulk': 2,
          'Attenuators - Fusion splice (<= 10db)': 2,
          'Attenuators - Fusion splice (> 10db)': 10,
          'Attenuators - Pasted splice': 10,
          'Fusing - stretching couplers (1 to 2)': 25,
          'Fusing - stretching couplers (1 to n, with n <= 5)': 50,
          'Integrated optical couplers': 60,
          'Multiplexer/ demultiplexer- Fusing Strength 1 to 2': 25,
          'Multiplexer/ demultiplexer- Fusing Strength 1 to n': 50,
          'Multiplexer/ demultiplexer- Micro-optic' : 60,
          'Connectors' : 5,
          'Jumper or optical cord' : 10,
          'Optical fiber' : 500,
          'Doped optical fibre' : 1
         
        };
  
        const lambdaNought = componentLambdaValues[componentValue];
        const result = (lambdaNought * Math.pow(10, -9)).toString();
        setLambdaValue(result);
      } else {
        setLambdaValue('');
      }
    };
  
    return (
      <div style={{ fontFamily: 'sans-serif' }}>
        <p>Select Component:</p>
        <select value={componentValue} onChange={handleComponentChange}>
          <option value="">Select Component</option>
          <option value="Attenuators - Bulk">Attenuators - Bulk</option>
          <option value="Attenuators - Fusion splice (<= 10db)">Attenuators - Fusion splice (&lt;= 10db)</option>
          <option value="Attenuators - Fusion splice (> 10db)">Attenuators - Fusion splice (&gt; 10db)</option>
          <option value="Attenuators - Pasted splice">Attenuators - Pasted splice</option>
          <option value="Fusing - stretching couplers (1 to 2)">Fusing - stretching couplers (1 to 2)</option>
          <option value="Fusing - stretching couplers (1 to n, with n <= 5)">Fusing - stretching couplers (1 to n, with n &lt;= 5)</option>
          <option value="Integrated optical coupler">Integrated optical coupler</option>
          <option value="Multiplexer/ demultiplexer- Fusing Strength 1 to 2">Multiplexer/ demultiplexer- Fusing Strength 1 to 2</option>
          <option value="Multiplexer/ demultiplexer- Fusing Strength 1 to n">Multiplexer/ demultiplexer- Fusing Strength 1 to n</option>
          <option value="'Multiplexer/ demultiplexer- Micro-optic'">'Multiplexer/ demultiplexer- Micro-optic'</option>
          <option value="Connectors">Connectors</option>
          <option value="Jumper or optical cord">Jumper or optical cord</option>
          <option value="Optical fiber">Optical fiber</option>
          <option value="Doped optical fibre">Doped optical fibre</option>


          {/* Add more options for other components */}
        </select>
        <p>λ value:</p>
        <span style={{ fontStyle: 'oblique', color: 'red' }}>{lambdaValue}</span>
      </div>
    );


};

export default Form5;




