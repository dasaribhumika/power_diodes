import React, { useState, useEffect } from 'react';

const Form = () => {
  const [piTValue, setPiTValue] = useState('');
  const [tauIValue, setTauIValue] = useState('');
  const [deltaTValue, setDeltaTValue] = useState('');
  const [tauOnValue, setTauOnValue] = useState('');
  const [tauOffValue, setTauOffValue] = useState('');
  const [piUValue, setPiUValue] = useState('');
  const [lambdaEOSValue, setLambdaEOSValue] = useState('');
  const [piIValue, setPiIValue] = useState('');
  const [telecomsSubcategoryValue, setTelecomsSubcategoryValue] = useState('');
  const [lambdaValue, setLambdaValue] = useState('');
  const [lambda0Value, setLambda0Value] = useState('');
  const [lambda0SubcategoryValue, setLambda0SubcategoryValue] = useState('');
  const [lambda0TransientValue, setLambda0TransientValue] = useState('');
  const [lambdaBValue, setLambdaBValue] = useState('');

  useEffect(() => {
    calculateLambdaValue();
  }, [piTValue, tauIValue, deltaTValue, tauOnValue, tauOffValue, piUValue, lambdaEOSValue, piIValue, telecomsSubcategoryValue, lambda0Value, lambda0SubcategoryValue, lambda0TransientValue, lambdaBValue]);

  const calculateLambdaValue = () => {
    if (piTValue && tauIValue && deltaTValue && tauOnValue && tauOffValue && piUValue && lambdaEOSValue && lambdaBValue) {
      const ΔT = parseFloat(deltaTValue);
      const πn = (ΔT / 3) + 30;
  
      let lambda = 0;
      switch (piUValue) {
        case 'permanent_use':
          lambda = 10;
          break;
        case 'triacs':
          lambda = 1;
          break;
        case 'other_diodes':
          lambda = 1;
          break;
        default:
          break;
      }
      
      if (lambdaEOSValue === 'protection_interface') {
        switch (piIValue) {
          case 'computer':
            lambda = 10;
            break;
          case 'telecoms':
            switch (telecomsSubcategoryValue) {
              case 'switching':
                lambda = 15;
                break;
              case 'transmitting_access':
                lambda = 40;
                break;
              case 'subscriber_equipment':
                lambda = 70;
                break;
              default:
                break;
            }
            break;
          case 'railways_payphone':
            lambda = 100;
            break;
          case 'civilian_avionics':
            lambda = 20;
            break;
          case 'voltage_supply_converters':
            lambda = 40;
            break;
          default:
            break;
        }
      } else if (lambdaEOSValue === 'non_interface') {
        lambda = 0;
      }
  
      // Adjust lambda based on lambdaBValue
      switch (lambdaBValue) {
        case 'TO-18':
          lambda += 1;
          break;
        case 'TO-39':
          lambda += 2;
          break;
        case 'TO-92':
          lambda += 1;
          break;
        default:
          break;
      }
  
      const result = (lambda * πn * Math.pow(ΔT, 0.68)) * 1e-9;
  
      setLambdaValue(result.toString());
    } else {
      setLambdaValue('');
    }
  };
  

  const handlePiUChange = (event) => {
    setPiUValue(event.target.value);
  };

  const handleLambdaEOSChange = (event) => {
    setLambdaEOSValue(event.target.value);
    setTelecomsSubcategoryValue(''); // Reset telecomsSubcategory if lambdaEOS changes
  };

  const handlePiIChange = (event) => {
    setPiIValue(event.target.value);
    setTelecomsSubcategoryValue(''); // Reset telecomsSubcategory if piI changes
  };

  const handleTelecomsSubcategoryChange = (event) => {
    setTelecomsSubcategoryValue(event.target.value);
  };

  const handleLambda0Change = (event) => {
    setLambda0Value(event.target.value);
    setLambda0SubcategoryValue('');
    setLambda0TransientValue('');
  };

  const handleLambda0SubcategoryChange = (event) => {
    setLambda0SubcategoryValue(event.target.value);
  };

  const handleLambda0TransientChange = (event) => {
    setLambda0TransientValue(event.target.value);
  };

  const handleLambdaBChange = (event) => {
    setLambdaBValue(event.target.value);
  };

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <p>Select πU:</p>
      <select value={piUValue} onChange={handlePiUChange}>
        <option value="">Select πU</option>
        <option value="permanent_use">Permanent Use</option>
        <option value="triacs">Triacs</option>
        <option value="other_diodes">Other Diodes</option>
      </select>
      <p>Select λEOS:</p>
      <select value={lambdaEOSValue} onChange={handleLambdaEOSChange}>
        <option value="">Select λEOS</option>
        <option value="protection_interface">Protection Interface</option>
        <option value="non_interface">Non Interface - All Electrical Environment</option>
      </select>
      {lambdaEOSValue === 'protection_interface' && (
        <>
          <p>Select πI:</p>
          <select value={piIValue} onChange={handlePiIChange}>
            <option value="">Select πI</option>
            <option value="computer">Computer</option>
            <option value="telecoms">Telecoms</option>
            <option value="railways_payphone">Railways, Payphone</option>
            <option value="civilian_avionics">Civilian Avionics</option>
            <option value="voltage_supply_converters">Voltage Supply, Converters</option>
          </select>
          {piIValue === 'telecoms' && (
            <>
              <p>Select Telecoms Subcategory:</p>
              <select value={telecomsSubcategoryValue} onChange={handleTelecomsSubcategoryChange}>
                <option value="">Select Telecoms Subcategory</option>
                <option value="switching">Switching</option>
                <option value="transmitting_access">Transmitting Access, Subscriber Cards</option>
                <option value="subscriber_equipment">Subscriber Equipment</option>
              </select>
            </>
          )}
        </>
      )}
      <p>Select λ0:</p>
      <select value={lambda0Value} onChange={handleLambda0Change}>
        <option value="">Select λ0</option>
        <option value="silicon_diodes">Silicon Diodes</option>
        <option value="gallium_arsenide_diodes">Gallium Arsenide Diodes</option>
        <option value="thyristors_triacs">Thyristors, Triacs</option>
      </select>
      {lambda0Value === 'silicon_diodes' && (
        <>
          <p>Select Silicon Diodes Subcategory:</p>
          <select value={lambda0SubcategoryValue} onChange={handleLambda0SubcategoryChange}>
            <option value="">Select Subcategory</option>
            <option value="signal">Signal</option>
            <option value="recovery_rectifier">Recovery, Rectifier</option>
            <option value="zener">Zener</option>
            <option value="suppressor">Suppressor</option>
          </select>
          {lambda0SubcategoryValue === 'suppressor' && (
            <>
              <p>Select Suppressor Type:</p>
              <select value={lambda0TransientValue} onChange={handleLambda0TransientChange}>
                <option value="">Select Suppressor Type</option>
                <option value="transient_voltage">Transient Voltage</option>
                <option value="trigger_transient_voltage">Trigger Transient Voltage</option>
              </select>
            </>
          )}
        </>
      )}
      <p>Select λB:</p>
      <select value={lambdaBValue} onChange={handleLambdaBChange}>
        <option value="">Select λB</option>
        <option value="TO-18">TO-18</option>
        <option value="TO-39">TO-39</option>
        <option value="TO-92">TO-92</option>
      </select>
      <p>Enter πt value:</p>
      <input type="text" value={piTValue} onChange={(e) => setPiTValue(e.target.value)} />
      <p>Enter 𝜏i value:</p>
      <input type="text" value={tauIValue} onChange={(e) => setTauIValue(e.target.value)} />
      <p>Enter ΔT value:</p>
      <input type="text" value={deltaTValue} onChange={(e) => setDeltaTValue(e.target.value)} />
      <p>Enter 𝜏on value:</p>
      <input type="text" value={tauOnValue} onChange={(e) => setTauOnValue(e.target.value)} />
      <p>Enter 𝜏off value:</p>
      <input type="text" value={tauOffValue} onChange={(e) => setTauOffValue(e.target.value)} />
      <p>λ value:</p>
      <span style={{ fontStyle: 'oblique', color: 'red' }}>{lambdaValue}</span>
    </div>
  );
};

export default Form;
