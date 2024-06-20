import React, { useState, useEffect } from 'react';

const Form7 = () => {
  const [tauIValue, setTauIValue] = useState('');
  const [tauOnValue, setTauOnValue] = useState('');
  const [tauOffValue, setTauOffValue] = useState('');
  const [piNValue, setPiNValue] = useState('');
  const [deltaTValue, setDeltaTValue] = useState('');
  const [lambdaValue, setLambdaValue] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [ths, setThs] = useState('');
  const [piT, setPiT] = useState('');
  const [temperature, setTemperature] = useState('');
  const [missionProfilePhase, setMissionProfilePhase] = useState('');
  const [selectedPhase, setSelectedPhase] = useState('');

  useEffect(() => {
    console.log("tauIValue:", tauIValue);
    console.log("tauOnValue:", tauOnValue);
    console.log("tauOffValue:", tauOffValue);
    console.log("piNValue:", piNValue);
    console.log("deltaTValue:", deltaTValue);
    console.log("lambdaValue:", lambdaValue);
    console.log("maxTemp:", maxTemp);
    console.log("ths:", ths);
    console.log("piT:", piT);
    console.log("temperature:", temperature);
    console.log("missionProfilePhase:", missionProfilePhase);
    console.log("selectedPhase:", selectedPhase);
    calculateLambdaValue();
  }, [piT, tauIValue, tauOnValue, tauOffValue, piNValue, deltaTValue, selectedPhase, maxTemp, ths]);

  const calculateLambdaValue = () => {
    if (piT && tauIValue && tauOnValue && tauOffValue && piNValue && deltaTValue && selectedPhase  && maxTemp && ths) {
      const πt = parseFloat(piT);
      const ΔT = parseFloat(deltaTValue);
      const τi = parseFloat(tauIValue);
      const τon = parseFloat(tauOnValue);
      const τoff = parseFloat(tauOffValue);
      const πn = parseFloat(piNValue);

      

      const result = (0.5 * ((πt * τi) / (τon + τoff) + 1.4 * Math.pow(10, -3) * (πn * Math.pow(ΔT, 0.68)))) * Math.pow(10, -9);
      setLambdaValue(result.toString());
    } else {
      setLambdaValue('');
    }
  };

  




  const handleMissionProfilePhaseChange = (event) => {
    setMissionProfilePhase(event.target.value);
  };

  const handleTemperatureChange = (event) => {
    setTemperature(event.target.value);
  };

  const updateTauIValue = () => {
    switch (temperature) {
      case '32/27':
        if (missionProfilePhase === 'Motor Control') {
          setTauIValue('0.020');
        } else if (missionProfilePhase === 'Passenger Compartment') {
          setTauIValue('0.006');
        }
        break;
      case '60/30':
        if (missionProfilePhase === 'Motor Control') {
          setTauIValue('0.015');
        } else if (missionProfilePhase === 'Passenger Compartment') {
          setTauIValue('0.046');
        }
        break;
      case '85':
        if (missionProfilePhase === 'Motor Control') {
          setTauIValue('0.023');
        } else if (missionProfilePhase === 'Passenger Compartment') {
          setTauIValue('0.006');
        }
        break;
      default:
        setTauIValue('');
        break;
    }
  };

  const updateTauOnValue = () => {
    let tauOn = '';
    if (missionProfilePhase === 'Motor Control') {
          tauOn = '0.058';
    } else if (missionProfilePhase === 'Passenger Compartment') {
          tauOn = '0.058';
    }
    setTauOnValue(tauOn);
  };
  
  const updateTauOffValue = () => {
    let tauOff = '';
  
    if (missionProfilePhase === 'Motor Control') {
          tauOff = '0.942';
    } else if (missionProfilePhase === 'Passenger Compartment') {
          tauOff = '0.942';
    }
    setTauOffValue(tauOff);
  };
  useEffect(() => {
  updateTauOnValue();
  updateTauOffValue();
}, [missionProfilePhase, updateTauOnValue, updateTauOffValue]);

  // Call updateTauIValue whenever missionProfilePhase or temperature changes
  useEffect(() => {
    updateTauIValue();
  }, [missionProfilePhase, temperature, updateTauIValue]);

  const handleMaxTempChange = (event) => {
    setMaxTemp(event.target.value);
  };

  const handleThsChange = (event) => {
    setThs(event.target.value);
  };
  const handleDeltaTChange = (event) => {
    setDeltaTValue(event.target.value);
  };


  useEffect(() => {
    // Calculate PiT when MaxTemp and Ths change
    if (maxTemp && ths) {
      // Perform calculations to determine PiT value based on maxTemp and ths
      let calculatedPiN = 0;

      // Example calculations (replace with actual calculations)
      switch (maxTemp) {
        case '0.1':
          switch (ths) {
            case '0':
              calculatedPiN = 0.00007;
              break;
            case '10':
              calculatedPiN = 0.00011;
              break;
            case '20':
              calculatedPiN = 0.00015;
              break;
            case '30':
              calculatedPiN = 0.00022;
              break;
            case '40':
              calculatedPiN = 0.00031;
              break;
            case '50':
              calculatedPiN = 0.00044;
              break;
            case '60':
              calculatedPiN = 0.00063;
              break;
            case '70':
              calculatedPiN = 0.00090;
              break;
            case '80':
              calculatedPiN = 0.0013;
              break;
            case '90':
              calculatedPiN = 0.0018;
              break;
            case '100':
              calculatedPiN = 0.0026;
              break;
            case '110':
              calculatedPiN = 0.0038;
              break;
            case '120':
              calculatedPiN = 0.0054;
              break;
              
            default:
              break;
          }
          break;
        // Add cases for other MaxTemp values (e.g., 105, 130, etc.)
        case '0.3':
          switch (ths) {
            case '0':
              calculatedPiN = 0.00010;
              break;
            case '10':
              calculatedPiN = 0.00015;
              break;
            case '20':
              calculatedPiN = 0.00022;
              break;
            case '30':
              calculatedPiN = 0.00031;
              break;
            case '40':
              calculatedPiN = 0.00045;
              break;
            case '50':
              calculatedPiN = 0.00066;
              break;
            case '60':
              calculatedPiN = 0.00095;
              break;
            case '70':
              calculatedPiN = 0.0014;
              break;
            case '80':
              calculatedPiN = 0.0020;
              break;
            case '90':
              calculatedPiN = 0.0029;
              break;
            case '100':
              calculatedPiN = 0.0041;
              break;
            case '110':
              calculatedPiN = 0.0060;
              break;
            case '120':
              calculatedPiN = 0.0;
              break;
              
            default:
              break;

          }
          break;
          case '0.5':
          switch (ths) {
            case '0':
              calculatedPiN = 0.00015;
              break;
            case '10':
              calculatedPiN = 0.00021;
              break;
            case '20':
              calculatedPiN = 0.00031;
              break;
            case '30':
              calculatedPiN = 0.00046;
              break;
            case '40':
              calculatedPiN = 0.00067;
              break;
            case '50':
              calculatedPiN = 0.00098;
              break;
            case '60':
              calculatedPiN = 0.0014;
              break;
            case '70':
              calculatedPiN = 0.0021;
              break;
            case '80':
              calculatedPiN = 0.0032;
              break;
            case '90':
              calculatedPiN = 0.0047;
              break;
            case '100':
              calculatedPiN = 0.00;
              break;
            case '110':
              calculatedPiN = 0.00;
              break;
            case '120':
              calculatedPiN = 0.00;
              break;
              
            default:
              break;

          }
          break;
          case '0.7':
          switch (ths) {
            case '0':
              calculatedPiN = 0.00020;
              break;
            case '10':
              calculatedPiN = 0.00030;
              break;
            case '20':
              calculatedPiN = 0.00045;
              break;
            case '30':
              calculatedPiN = 0.00066;
              break;
            case '40':
              calculatedPiN = 0.00098;
              break;
            case '50':
              calculatedPiN = 0.0014;
              break;
            case '60':
              calculatedPiN = 0.0021;
              break;
            case '70':
              calculatedPiN = 0.0032;
              break;
            case '80':
              calculatedPiN = 0.0047;
              break;
            case '90':
              calculatedPiN = 0.00;
              break;
            case '100':
              calculatedPiN = 0.00;
              break;
            case '110':
              calculatedPiN = 0.00;
              break;
            case '120':
              calculatedPiN = 0.00;
              break;
              
            default:
              break;

          }
          break;
          case '0.9':
          switch (ths) {
            case '0':
              calculatedPiN = 0.00028;
              break;
            case '10':
              calculatedPiN = 0.00043;
              break;
            case '20':
              calculatedPiN = 0.00064;
              break;
            case '30':
              calculatedPiN = 0.00096;
              break;
            case '40':
              calculatedPiN = 0.0014;
              break;
            case '50':
              calculatedPiN = 0.0021;
              break;
            case '60':
              calculatedPiN = 0.0032;
              break;
            case '70':
              calculatedPiN = 0.0048;
              break;
            case '80':
              calculatedPiN = 0.00;
              break;
            case '90':
              calculatedPiN = 0.00;
              break;
            case '100':
              calculatedPiN = 0.00;
              break;
            case '110':
              calculatedPiN = 0.00;
              break;
            case '120':
              calculatedPiN = 0.00;
              break;
              
            default:
              break;

          }
          break;
          
        default:
          break;
      }
      
      // Update PiN state with the calculated value
      setPiNValue(calculatedPiN.toString());
    }
  }, [maxTemp, ths]);

  useEffect(() => {
    calculatePiTValue();
  }, [selectedPhase]);

  const calculatePiTValue = () => {
    if (selectedPhase) {
      let piT = 0;
  
      switch (selectedPhase) {
        case 'Phase 1: 2 night starts':
          piT= 670;
          break;
        case 'Phase 2: 4 day light starts':
          piT = 1340;
          break;
        case 'Phase 3: Non-used vehicle':
          piT = 30;
          break;
        default:
          break;
      }
  
      setPiT(piT.toString());
    } else {
      
      setPiT('');
    }

  };

  const handlePhaseChange = (event) => {
    setSelectedPhase(event.target.value);
  };

  
  return (
    <div style={{ fontFamily: 'sans-serif' }}>

      {/* Render dropdowns for MaxTemp and Ths */}
      <p>Select Stress:</p>
      <select value={maxTemp} onChange={handleMaxTempChange}>
        <option value="">Select Stress</option>
        <option value="0.1">0.1</option>
        <option value="0.3">0.3</option>
        <option value="0.5">0.5</option>
        <option value="0.7">0.7</option>
        <option value="0.8">0.8</option>

      </select>
      <p>Select Ta:</p>
      <select value={ths} onChange={handleThsChange}>
        <option value="">Select Ta</option>
        <option value="0">0</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
        <option value="60">60</option>
        <option value="70">70</option>
        <option value="80">80</option>
        <option value="90">90</option>
        <option value="100">100</option>
        <option value="110">110</option>
        <option value="120">120</option>
        
      </select>


      <p>Enter ΔT value:</p>
      <select value={deltaTValue} onChange={handleDeltaTChange}>
        <option value="">Select ΔT</option>
        <option value="0">0</option>
        <option value="8">8</option>
        <option value="10">10</option>
      </select>

      <p>Select Mission Profile Phase:</p>
      <select value={missionProfilePhase} onChange={handleMissionProfilePhaseChange}>
        <option value="">Select Mission Profile Phase</option>
        <option value="Motor Control">Motor Control</option>
        <option value="Passenger Compartment">Passenger Compartment</option>
      </select>
      <p>Select Temperature:</p>
      <select value={temperature} onChange={handleTemperatureChange}>
        <option value="">Select Temperature</option>
        <option value="32/27">32/27</option>
        <option value="60/30">60/30</option>
        <option value="85">85</option>
      </select>

      <p>Select Phase:</p>
      <select value={selectedPhase} onChange={handlePhaseChange}>
        <option value="">Select Phase</option>
        <option value="Phase 1: 2 night starts">Phase 1: 2 night starts</option>
        <option value="Phase 2: 4 day light starts">Phase 2: 4 day light starts</option>
        <option value="Phase 3: Non-used vehicle">Phase 3: Non-used vehicle</option>
      </select>

      <p>λ value:</p>
      <span style={{ fontStyle: 'oblique', color: 'red' }}>{lambdaValue}</span>
    </div>
  );
};

export default Form7;