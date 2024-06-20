import React, { useState, useEffect } from 'react';

const Form6 = () => {
  const [tauIValue, setTauIValue] = useState('');
  const [tauOnValue, setTauOnValue] = useState('');
  const [tauOffValue, setTauOffValue] = useState('');
  const [piNValue, setPiNValue] = useState('');
  const [deltaTValue, setDeltaTValue] = useState('');
  const [lambdaNaught, setLambdaNaught] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
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
    console.log("lambdaNaught:", lambdaNaught);
    console.log("selectedCategory:", selectedCategory);
    console.log("selectedSubcategory:", selectedSubcategory);
    console.log("selectedType:", selectedType);
    console.log("lambdaValue:", lambdaValue);
    console.log("maxTemp:", maxTemp);
    console.log("ths:", ths);
    console.log("piT:", piT);
    console.log("temperature:", temperature);
    console.log("missionProfilePhase:", missionProfilePhase);
    console.log("selectedPhase:", selectedPhase);
    calculateLambdaValue();
  }, [piT, tauIValue, tauOnValue, tauOffValue, piNValue, deltaTValue, lambdaNaught, selectedPhase, maxTemp, ths]);

  const calculateLambdaValue = () => {
    if (piT && tauIValue && tauOnValue && tauOffValue && piNValue && deltaTValue && lambdaNaught && selectedPhase  && maxTemp && ths) {
      const πt = parseFloat(piT);
      const ΔT = parseFloat(deltaTValue);
      const τi = parseFloat(tauIValue);
      const τon = parseFloat(tauOnValue);
      const τoff = parseFloat(tauOffValue);
      const πn = parseFloat(piNValue);

      const λo = calculateLambdaO();

      const result = (λo * ((πt + τi) / (τon + τoff) + 7 * Math.pow(10, -3) * (πn * Math.pow(ΔT, 0.68)))) * Math.pow(10, -9);
      setLambdaValue(result.toString());
    } else {
      setLambdaValue('');
    }
  };

  const calculateLambdaO = () => {
    let lambdaO = 1;
    switch (lambdaNaught) {
      case 'inductors':
        switch (selectedCategory) {
          case 'low_current_inductors':
            switch (selectedType) {
              case 'Fixed':
                lambdaO = 0.2;
                break;
              case 'Variable':
                lambdaO = 0.4;
                break;
              default:
                break;
            }
            break;
          case 'power_inductors':
            lambdaO = 0.6;
            break;
          default:
            break;
        }
        break;
      case 'transformers':
        switch (selectedSubcategory) {
          case 'signal_transformers':
            lambdaO = 1.5;
            break;
          case 'power_transformers':
            lambdaO = 3;
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
    return lambdaO;
  };
  


  const handleLambdaNaughtChange = (event) => {
    setLambdaNaught(event.target.value);
    setSelectedSubcategory('');
    setSelectedType('');
    setLambdaValue('');
};

const handleSubcategoryChange = (event) => {
  setSelectedSubcategory(event.target.value);
  if (event.target.value === 'power_inductors') {
    setSelectedCategory('inductors'); // Set selectedCategory to 'inductors' for power inductors
    setLambdaNaught(0.6); // Set lambdaNaught to 0.6 for power inductors
  } else if (event.target.value === 'signal_transformers') {
    setSelectedCategory('transformers'); // Set selectedCategory to 'transformers' for signal transformers
    setLambdaNaught(1.5); // Set lambdaNaught to 1.5 for signal transformers
  } else if (event.target.value === 'power_transformers') {
    setSelectedCategory('transformers'); // Set selectedCategory to 'transformers' for power transformers
    setLambdaNaught(3); // Set lambdaNaught to 3 for power transformers
  } 
  setLambdaValue('');
  setSelectedType('');
};


const handleTypeChange = (event) => {
  setSelectedType(event.target.value);
  if (event.target.value === 'Fixed') {
    setLambdaNaught(0.2); // Set lambdaNaught to 0.2 for Fixed type
  } else if (event.target.value === 'Variable') {
    setLambdaNaught(0.4); // Set lambdaNaught to 0.4 for Variable type
  } else {
    setLambdaNaught(''); // Set lambdaNaught to empty string if no type selected
  }
  setLambdaValue('');
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
        case '85':
          switch (ths) {
            case '30':
              calculatedPiN = 0.0024;
              break;
            case '35':
              calculatedPiN = 0.0026;
              break;
            case '40':
              calculatedPiN = 0.0028;
              break;
            case '45':
              calculatedPiN = 0.0032;
              break;
            case '50':
              calculatedPiN = 0.0038;
              break;
            case '55':
              calculatedPiN = 0.0047;
              break;
            case '60':
              calculatedPiN = 0.0060;
              break;
            case '65':
              calculatedPiN = 0.0083;
              break;
            case '70':
              calculatedPiN = 0.012;
              break;
            case '75':
              calculatedPiN = 0.020;
              break;
            case '80':
              calculatedPiN = 0.036;
              break;
            case '85':
              calculatedPiN = 0.075;
              break;
              case '90':
                calculatedPiN = 0.0;
                break;
              case '95':
                calculatedPiN = 0.0;
                break;
              case '100':
                calculatedPiN = 0.0;
                break;
              case '105':
                calculatedPiN = 0.0;
                break;
              case '110':
                calculatedPiN = 0.0;
                break;
              case '115':
                calculatedPiN = 0.0;
                break;
              case '120':
                calculatedPiN = 0.0;
                break;
              case '125':
                calculatedPiN = 0.0;
                break;
              case '130':
                calculatedPiN = 0.0;
                break;
              case '135':
                calculatedPiN = 0.0;
                break;
              case '140':
                calculatedPiN = 0.0;
                break;
              case '145':
                calculatedPiN = 0.0;
                break;
              case '150':
                calculatedPiN = 0.0;
                break;
              case '155':
                calculatedPiN = 0.0;
                break;
              case '160':
                calculatedPiN = 0.0;
                break;
            default:
              break;
          }
          break;
        // Add cases for other MaxTemp values (e.g., 105, 130, etc.)
        case '105':
          switch (ths) {
            case '30':
              calculatedPiN = 0.0023;
              break;
            case '35':
              calculatedPiN = 0.0023;
              break;
            case '40':
              calculatedPiN = 0.0024;
              break;
            case '45':
              calculatedPiN = 0.0025;
              break;
            case '50':
              calculatedPiN = 0.0027;
              break;
            case '55':
              calculatedPiN = 0.0029;
              break;
            case '60':
              calculatedPiN = 0.0032;
              break;
            case '65':
              calculatedPiN = 0.0035;
              break;
            case '70':
              calculatedPiN = 0.0040;
              break;
            case '75':
              calculatedPiN = 0.0047;
              break;
            case '80':
              calculatedPiN = 0.0057;
              break;
            case '85':
              calculatedPiN = 0.0071;
              break;
            case '90':
              calculatedPiN = 0.0093;
              break;
            case '95':
              calculatedPiN = 0.013;
              break;
            case '100':
              calculatedPiN = 0.019;
              break;
            case '105':
              calculatedPiN = 0.030;
              break;
            case '110':
              calculatedPiN = 0.0;
              break;
            case '115':
              calculatedPiN = 0.0;
              break;
            case '120':
              calculatedPiN = 0.0;
              break;
            case '125':
              calculatedPiN = 0.0;
              break;
            case '130':
              calculatedPiN = 0.0;
              break;
            case '135':
              calculatedPiN = 0.0;
              break;
            case '140':
              calculatedPiN = 0.0;
              break;
            case '145':
              calculatedPiN = 0.0;
              break;
            case '150':
              calculatedPiN = 0.0;
              break;
            case '155':
              calculatedPiN = 0.0;
              break;
            case '160':
              calculatedPiN = 0.0;
              break;
            default:
              break;

          }
          break;
          case '130':
          switch (ths) {
            case '30':
              calculatedPiN = 0.0022;
              break;
            case '35':
              calculatedPiN = 0.0023;
              break;
            case '40':
              calculatedPiN = 0.0024;
              break;
            case '45':
              calculatedPiN = 0.0025;
              break;
            case '50':
              calculatedPiN = 0.0026;
              break;
            case '55':
              calculatedPiN = 0.0027;
              break;
            case '60':
              calculatedPiN = 0.0029;
              break;
            case '65':
              calculatedPiN = 0.0030;
              break;
            case '70':
              calculatedPiN = 0.0033;
              break;
            case '75':
              calculatedPiN = 0.0035;
              break;
            case '80':
              calculatedPiN = 0.0039;
              break;
            case '85':
              calculatedPiN = 0.0043;
              break;
            case '90':
              calculatedPiN = 0.0048;
              break;
            case '95':
              calculatedPiN = 0.0054;
              break;
            case '100':
              calculatedPiN = 0.0062;
              break;
            case '105':
              calculatedPiN = 0.0072;
              break;
            case '110':
              calculatedPiN = 0.0085;
              break;
            case '115':
              calculatedPiN = 0.010;
              break;
            case '120':
              calculatedPiN = 0.013;
              break;
            case '125':
              calculatedPiN = 0.016;
              break;
            case '130':
              calculatedPiN = 0.020;
              break;
            case '135':
              calculatedPiN = 0.0;
              break;
            case '140':
              calculatedPiN = 0.0;
              break;
            case '145':
              calculatedPiN = 0.0;
              break;
            case '150':
              calculatedPiN = 0.0;
              break;
            case '155':
              calculatedPiN = 0.0;
              break;
            case '160':
              calculatedPiN = 0.0;
              break;
            default:
              break;

          }
          break;
          case '155':
          switch (ths) {
            case '30':
              calculatedPiN = 0.0021;
              break;
            case '35':
              calculatedPiN = 0.0022;
              break;
            case '40':
              calculatedPiN = 0.0022;
              break;
            case '45':
              calculatedPiN = 0.0022;
              break;
            case '50':
              calculatedPiN = 0.0023;
              break;
            case '55':
              calculatedPiN = 0.0023;
              break;
            case '60':
              calculatedPiN = 0.0024;
              break;
            case '65':
              calculatedPiN = 0.0025;
              break;
            case '70':
              calculatedPiN = 0.0026;
              break;
            case '75':
              calculatedPiN = 0.0027;
              break;
            case '80':
              calculatedPiN = 0.0028;
              break;
            case '85':
              calculatedPiN = 0.0029;
              break;
            case '90':
              calculatedPiN = 0.0031;
              break;
            case '95':
              calculatedPiN = 0.0033;
              break;
            case '100':
              calculatedPiN = 0.0035;
              break;
            case '105':
              calculatedPiN = 0.0038;
              break;
            case '110':
              calculatedPiN = 0.0042;
              break;
            case '115':
              calculatedPiN = 0.0046;
              break;
            case '120':
              calculatedPiN = 0.0052;
              break;
            case '125':
              calculatedPiN = 0.0059;
              break;
            case '130':
              calculatedPiN = 0.0068;
              break;
            case '135':
              calculatedPiN = 0.0079;
              break;
            case '140':
              calculatedPiN = 0.0095;
              break;
            case '145':
              calculatedPiN = 0.011;
              break;
            case '150':
              calculatedPiN = 0.014;
              break;
            case '155':
              calculatedPiN = 0.0;
              break;
            case '160':
              calculatedPiN = 0.0;
              break;
            default:
              break;

          }
          break;
          case '170':
          switch (ths) {
            case '30':
              calculatedPiN = 0.0018;
              break;
            case '35':
              calculatedPiN = 0.0018;
              break;
            case '40':
              calculatedPiN = 0.0019;
              break;
            case '45':
              calculatedPiN = 0.0019;
              break;
            case '50':
              calculatedPiN = 0.0020;
              break;
            case '55':
              calculatedPiN = 0.0020;
              break;
            case '60':
              calculatedPiN = 0.0021;
              break;
            case '65':
              calculatedPiN = 0.0021;
              break;
            case '70':
              calculatedPiN = 0.0022;
              break;
            case '75':
              calculatedPiN = 0.0023;
              break;
            case '80':
              calculatedPiN = 0.0024;
              break;
            case '85':
              calculatedPiN = 0.0024;
              break;
            case '90':
              calculatedPiN = 0.0025;
              break;
            case '95':
              calculatedPiN = 0.0026;
              break;
            case '100':
              calculatedPiN = 0.0027;
              break;
            case '105':
              calculatedPiN = 0.0028;
              break;
            case '110':
              calculatedPiN = 0.0030;
              break;
            case '115':
              calculatedPiN = 0.0031;
              break;
            case '120':
              calculatedPiN = 0.0032;
              break;
            case '125':
              calculatedPiN = 0.0034;
              break;
            case '130':
              calculatedPiN = 0.0036;
              break;
            case '135':
              calculatedPiN = 0.0038;
              break;
            case '140':
              calculatedPiN = 0.0040;
              break;
            case '145':
              calculatedPiN = 0.0042;
              break;
            case '150':
              calculatedPiN = 0.0044;
              break;
            case '155':
              calculatedPiN = 0.0047;
              break;
            case '160':
              calculatedPiN = 0.0050;
              break;
            default:
              break;

          }
          break;
          case '>170':
          switch (ths) {
            case '30':
              calculatedPiN = 0.0016;
              break;
            case '35':
              calculatedPiN = 0.0016;
              break;
            case '40':
              calculatedPiN = 0.0016;
              break;
            case '45':
              calculatedPiN = 0.0016;
              break;
            case '50':
              calculatedPiN = 0.0017;
              break;
            case '55':
              calculatedPiN = 0.0017;
              break;
            case '60':
              calculatedPiN = 0.0017;
              break;
            case '65':
              calculatedPiN = 0.0017;
              break;
            case '70':
              calculatedPiN = 0.0017;
              break;
            case '75':
              calculatedPiN = 0.0017;
              break;
            case '80':
              calculatedPiN = 0.0017;
              break;
            case '85':
              calculatedPiN = 0.0017;
              break;
            case '90':
              calculatedPiN = 0.0018;
              break;
            case '95':
              calculatedPiN = 0.0018;
              break;
            case '100':
              calculatedPiN = 0.0018;
              break;
            case '105':
              calculatedPiN = 0.0018;
              break;
            case '110':
              calculatedPiN = 0.0019;
              break;
            case '115':
              calculatedPiN = 0.0019;
              break;
            case '120':
              calculatedPiN = 0.0019;
              break;
            case '125':
              calculatedPiN = 0.0020;
              break;
            case '130':
              calculatedPiN = 0.0020;
              break;
            case '135':
              calculatedPiN = 0.0021;
              break;
            case '140':
              calculatedPiN = 0.0021;
              break;
            case '145':
              calculatedPiN = 0.0022;
              break;
            case '150':
              calculatedPiN = 0.0023;
              break;
            case '155':
              calculatedPiN = 0.0024;
              break;
            case '160':
              calculatedPiN = 0.0025;
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
  
      // Assign PiN value based on selected phase
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
  
      // Update the PiN value state
      setPiT(piT.toString());
    } else {
      // If no phase is selected, reset PiN value
      setPiT('');
    }

  };

  const handlePhaseChange = (event) => {
    setSelectedPhase(event.target.value);
  };

  
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <p>Select λo:</p>
      <select value={lambdaNaught} onChange={handleLambdaNaughtChange}>
        <option value="">Select λo</option>
        <option value="inductors">Inductors</option>
        <option value="transformers">Transformers</option>
      </select>

      {/* Render Subcategory dropdown based on selected λo */}
      {lambdaNaught === 'inductors' && (
        <>
          <p>Select Subcategory:</p>
          <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
            <option value="">Select Subcategory</option>
            <option value="low_current_inductors">Low Current Inductors</option>
            <option value="power_inductors">Power Inductors</option>
          </select>
        </>
      )}

      {lambdaNaught === 'transformers' && (
        <>
          <p>Select Subcategory:</p>
          <select value={selectedSubcategory} onChange={handleSubcategoryChange}>
            <option value="">Select Subcategory</option>
            <option value="signal_transformers">Signal Transformers</option>
            <option value="power_transformers">Power Transformers</option>
          </select>
        </>
      )}


      {/* Render Subcategory Type dropdown based on selected Subcategory */}
      {selectedSubcategory === 'low_current_inductors' && (
        <>
          <p>Select Subcategory Type:</p>
          <select value={selectedType} onChange={handleTypeChange}>
            <option value="">Select Subcategory Type</option>
            <option value="Fixed">Fixed</option>
            <option value="Variable">Variable</option>
          </select>
        </>
      )}


      {/* Render dropdowns for MaxTemp and Ths */}
      <p>Select Maximum Rated Operating Temperature:</p>
      <select value={maxTemp} onChange={handleMaxTempChange}>
        <option value="">Select MaxTemp</option>
        <option value="85">85</option>
        <option value="105">105</option>
        <option value="130">130</option>
        <option value="155">155</option>
        <option value="170">170</option>
        <option value=">105">&gt; 170</option>
      </select>
      <p>Select Ths:</p>
      <select value={ths} onChange={handleThsChange}>
        <option value="">Select Ths</option>
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
        <option value="120">120</option>
        <option value="125">125</option>
        <option value="130">130</option>
        <option value="135">135</option>
        <option value="140">140</option>
        <option value="145">145</option>
        <option value="150">150</option>
        <option value="155">155</option>
        <option value="160">160</option>
        
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

export default Form6;