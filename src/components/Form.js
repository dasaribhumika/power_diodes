import React, { useState, useEffect } from 'react';

const Form = () => {
  const [piT, setpiT] = useState('low_power_diodes');
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
  const [tjValue, setTjValue] = useState('');
  const [missionProfilePhase, setMissionProfilePhase] = useState('');
  const [temperature, setTemperature] = useState('');
  const [temperatureOptions, setTemperatureOptions] = useState([]);


  useEffect(() => {
    calculateLambdaValue();
  }, [piT, tauIValue, deltaTValue, tauOnValue, tauOffValue, piUValue, lambdaEOSValue, piIValue, telecomsSubcategoryValue, lambda0Value, lambda0SubcategoryValue, lambda0TransientValue, lambdaBValue, tjValue, missionProfilePhase, temperature]);
 
  const calculateLambdaValue = () => {
    if (piT && tauIValue && deltaTValue && tauOnValue && tauOffValue && piUValue && piIValue && lambdaEOSValue && lambdaBValue && missionProfilePhase && temperature && tjValue) {
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
        case 'SOT-23':
          lambda += 1;
          break;
        case 'SOT-143':
          lambda += 1;
          break;
        case 'SOT-223':
          lambda += 3.4;
          break;
        case 'SOT-323':
          lambda += 0.8;
          break;
        case 'SOT-343':
          lambda += 0.8;
          break;
        case 'SOT-346':
          lambda += 1;
          break;
        case 'SOT-363':
          lambda += 0.8;
          break;
        case 'SOT-457':
          lambda += 1.1;
          break;
        case 'SOT-89':
          lambda += 2;
          break;
        case 'SOT-32(TO-126)':
          lambda += 5.3;
          break;
        case 'SOT-82':
          lambda += 5.3;
          break;
        case 'DPACK (SOT428)':
          lambda += 5.1;
          break;
        case 'D2PACK':
          lambda += 5.7;
          break;
        case 'TO-220':
          lambda += 5.7;
          break;
        case 'TO-218(SOT-93)':
          lambda += 6.9;
          break;
        case 'TO-247':
          lambda += 6.9;
          break;
        case 'ISOTOP':
          lambda += 20;
          break;
        case 'SOT-90B(optocoupler)':
          lambda += 4.1;
          break;
        case 'SO-8(optocoupler)':
          lambda += 4.5;
          break;
        case 'DO-34(DO-204AG)':
          lambda += 2.5;
          break;
        case 'DO-35(DO-204AH)':
          lambda += 2.5;
          break;
        case 'DO-41(DO-204AL)(glass)':
          lambda += 2.5;
          break;
        case 'DO-41(DO-204AL)(plastic)':
          lambda += 1;
          break;
        case 'F 126':
          lambda += 1;
          break;
        case 'micromelf':
          lambda += 2.5;
          break;
        case 'SOD-80(minimelf)':
          lambda += 2.5;
          break;
        case 'melf':
          lambda += 5;
          break;
        case 'SOD-110':
          lambda += 0.8;
          break;
        case 'SOD-123':
          lambda += 1;
          break;
        case 'SOD-323':
          lambda += 0.7;
          break;
        case 'SOD-523':
          lambda += 0.5;
          break;
        case 'SMA':
          lambda += 1.8;
          break;
        case 'SMB(DO-214)':
          lambda += 2.4;
          break;
        case 'SMC(DO-215)':
          lambda += 5.1;
          break;
        case 'DO-220':
          lambda += 5.7;
          break;
        case 'SOD-15':
          lambda += 5.1;
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

  const DEFAULT_PI_I_VALUE = 'computer';
  const DEFAULT_TELECOMS_SUBCATEGORY_VALUE = 'switching';
  const DEFAULT_LAMBDA0_TRANSIENT_VALUE = 'transient_voltage';


  const handlePiUChange = (event) => {
    setPiUValue(event.target.value);
  };

  const handleLambdaEOSChange = (event) => {
    setLambdaEOSValue(event.target.value);
    setPiIValue(DEFAULT_PI_I_VALUE); // Set default value for piI
    setTelecomsSubcategoryValue('');
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

  const handlePiIChange = (event) => {
    const newValue = event.target.value;
    setPiIValue(newValue !== '' ? newValue : DEFAULT_PI_I_VALUE);
    setTelecomsSubcategoryValue(''); // Reset telecomsSubcategory if piI changes
  };
  

  const handleTelecomsSubcategoryChange = (event) => {
    const newValue = event.target.value;
    setTelecomsSubcategoryValue(newValue !== '' ? newValue : DEFAULT_TELECOMS_SUBCATEGORY_VALUE);
  };
  
  

  const handleLambda0Change = (event) => {
    setLambda0Value(event.target.value);
    setLambda0SubcategoryValue('');
    setLambda0TransientValue('');
  };

  const handleLambda0SubcategoryChange = (event) => {
    setLambda0SubcategoryValue(event.target.value);
    setTjValue('');
  };

  const handleLambda0TransientChange = (event) => {
    const newValue = event.target.value;
    setLambda0TransientValue(newValue !== '' ? newValue : DEFAULT_LAMBDA0_TRANSIENT_VALUE);
  };
  
  
  const handleLambdaBChange = (event) => {
    setLambdaBValue(event.target.value);
  };

  const handlepiTChange = (event) => {
    const selectedTj = event.target.value;
    setTjValue('');
    let piT;
  
    if (
      [
        'general_purpose_analog',
        'switching',
        'fast_recovery',
        'power_rectifier',
        'transient_suppressor',
      ].includes(lambda0SubcategoryValue)
    ) {
      // For the specified subcategories
      switch (selectedTj) {
        case '25':
          piT = 1;
          break;
        case '30':
          piT = 1.2;
          break;
        case '35':
          piT = 1.4;
          break;
        case '40':
          piT = 1.6;
          break;
        case '45':
          piT = 1.9;
          break;
        case '50':
          piT = 2.2;
          break;
        case '55':
          piT = 2.6;
          break;
        case '60':
          piT = 3.0;
          break;
        case '65':
          piT = 3.4;
          break;
        case '70':
          piT = 3.9;
          break;
        case '75':
          piT = 4.4;
          break;
        case '80':
          piT = 5.0;
          break;
        case '85':
          piT = 5.7;
          break;
        case '90':
          piT = 6.4;
          break;
        case '95':
          piT = 7.2;
          break;
        case '100':
          piT = 8.0;
          break;
        case '105':
          piT = 9.0;
          break;
        case '110':
          piT = 10.0;
          break;
        case '115':
          piT = 11.0;
          break;
        case '120':
          piT = 12.0;
          break;
        case '125':
          piT = 14.0;
          break;
        case '130':
          piT = 15.0;
          break;
        case '135':
          piT = 16.0;
          break;
        case '140':
          piT = 18.0;
          break;
        case '145':
          piT = 20.0;
          break;
        case '150':
          piT = 21.0;
          break;
        case '155':
          piT = 23.0;
          break;
        case '160':
          piT = 25.0;
          break;
        case '165':
          piT = 28.0;
          break;
        case '170':
          piT = 30.0;
          break;
        case '175':
          piT = 32.0;
          break;
        default:
          piT = 1; // Default value
          break;
      }
    } else {
      // For other subcategories
      switch (selectedTj) {
        case '25':
          piT = 1;
          break;
        case '30':
          piT = 1.1;
          break;
        case '35':
          piT = 1.2;
          break;
        case '40':
          piT = 1.4;
          break;
        case '45':
          piT = 1.5;
          break;
        case '50':
          piT = 1.6;
          break;
        case '55':
          piT = 1.8;
          break;
        case '60':
          piT = 2.0;
          break;
        case '65':
          piT = 2.1;
          break;
        case '70':
          piT = 2.3;
          break;
        case '75':
          piT = 2.5;
          break;
        case '80':
          piT = 2.7;
          break;
        case '85':
          piT = 3.0;
          break;
        case '90':
          piT = 3.2;
          break;
        case '95':
          piT = 3.4;
          break;
        case '100':
          piT = 3.7;
          break;
        case '105':
          piT = 3.9;
          break;
        case '110':
          piT = 4.2;
          break;
        case '115':
          piT = 4.5;
          break;
        case '120':
          piT = 4.8;
          break;
        case '125':
          piT = 5.1;
          break;
        case '130':
          piT = 5.4;
          break;
        case '135':
          piT = 5.7;
          break;
        case '140':
          piT = 6.0;
          break;
        case '145':
          piT = 6.4;
          break;
        case '150':
          piT = 6.7;
          break;
        case '155':
          piT = 7.1;
          break;
        case '160':
          piT = 7.5;
          break;
        case '165':
          piT = 7.9;
          break;
        case '170':
          piT = 8.3;
          break;
        case '175':
          piT = 8.7;
          break;
        default:
          piT = 1; // Default value
          break;
      }
    }
  
    setpiT(piT);
  };
  
  const handleTjChange = (event) => {
    setTjValue(event.target.value);
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
        <option value="SOT-23">SOT-23</option>
        <option value="SOT-143">SOT-143</option>
        <option value="SOT-223">SOT-223</option>
        <option value="SOT-323">SOT-323</option>
        <option value="SOT-343">SOT-343</option>
        <option value="SOT-346">SOT-346</option>
        <option value="SOT-363">SOT-363</option>
        <option value="SOT-457">SOT-457</option>
        <option value="SOT-89">SOT-89</option>
        <option value="SOT-32(TO-126)">SOT-32(TO-126)</option>
        <option value="SOT-82">SOT-82</option>
        <option value="DPACK (SOT428)">DPACK (SOT428)</option>
        <option value="D2PACK">D2PACK</option>
        <option value="TO-220">TO-220</option>
        <option value="TO-218(SOT-93)">TO-218(SOT-93)</option>
        <option value="TO-247">TO-247</option>
        <option value="ISOTOP">ISOTOP</option>
        <option value="SOT-90B(optocoupler)">SOT-90B(optocoupler)</option>
        <option value="SO-8(optocoupler)">SO-8(optocoupler)</option>
        <option value="DO-34(DO-204AG)">DO-34(DO-204AG)</option>
        <option value="DO-35(DO-204AH)">DO-35(DO-204AH)</option>
        <option value="DO-41(DO-204AL)(glass)">DO-41(DO-204AL)(glass)</option>
        <option value="DO-41(DO-204AL)(plastic)">DO-41(DO-204AL)(plastic)</option>
        <option value="F 126">F 126</option>
        <option value="micromelf">micromelf</option>
        <option value="SOD-80(minimelf)">SOD-80(minimelf)</option>
        <option value="melf">melf</option>
        <option value="SOD-110">SOD-110</option>
        <option value="SOD-123">SOD-123</option>
        <option value="SOD-323">SOD-323</option>
        <option value="SOD-523">SOD-523</option>
        <option value="SMA">SMA</option>
        <option value="SMB(DO-214)">SMB(DO-214)</option>
        <option value="SMC(DO-215)">SMC(DO-215)</option>
        <option value="DO-220">DO-220</option>
        <option value="SOD-15">SOD-15</option>
      </select>
      <p>Select Power Diodes:</p>
      <select value={piT} onChange={handlepiTChange}>
        <option value="">Select Power Diodes</option>
        <option value="low_power_diodes">Low Power Diodes</option>
        <option value="high_power_diodes">High Power Diodes</option>
        <option value="low_power_transistor">Low Power Transistor</option>
        <option value="high_power_transistor">High Power Transistor</option>
      </select>
      {piT !== '' && (
        <>
          <p>Select Diode Subcategory:</p>
          <select value={lambda0SubcategoryValue} onChange={handleLambda0SubcategoryChange}>
            <option value="">Select Subcategory</option>
            <option value="general_purpose_analog">General Purpose Analog</option>
            <option value="switching">Switching</option>
            <option value="fast_recovery">Fast Recovery</option>
            <option value="power_rectifier">Power Rectifier</option>
            <option value="transient_suppressor">Transient Suppressor</option>
            <option value="voltage_regulator">Voltage Regulator</option>
            <option value="voltage_reference">Voltage Reference</option>
            <option value="current_regulator">Current Regulator</option>
          </select>
          {/* Dropdown for Tj based on selected subcategory */}
          {['general_purpose_analog', 'switching', 'fast_recovery', 'power_rectifier', 'transient_suppressor'].includes(lambda0SubcategoryValue) && (
            <>
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
                <option value="120">120</option>
                <option value="125">125</option>
                <option value="130">130</option>
                <option value="135">135</option>
                <option value="140">140</option>
                <option value="145">145</option>
                <option value="150">150</option>
                <option value="155">155</option>
                <option value="160">160</option>
                <option value="165">165</option>
                <option value="170">170</option>
                <option value="175">175</option>
              </select>
            </>
          )}
          {['voltage_regulator', 'voltage_reference', 'current_regulator'].includes(lambda0SubcategoryValue) && (
            <>
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
                <option value="120">120</option>
                <option value="125">125</option>
                <option value="130">130</option>
                <option value="135">135</option>
                <option value="140">140</option>
                <option value="145">145</option>
                <option value="150">150</option>
                <option value="155">155</option>
                <option value="160">160</option>
                <option value="165">165</option>
                <option value="170">170</option>
                <option value="175">175</option>
              </select>
            </>
          )}
        </>
      )}  
      <p>Enter ΔT value:</p>
      <select value={deltaTValue} onChange={(e) => setDeltaTValue(e.target.value)}>
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
      <p>Select Phase:</p>
      <select >
        <option value="">Select Phase</option>
        <option value="Phase 1: 2 night starts">Phase 1: 2 night starts</option>
        <option value="Phase 2: 4 day light starts">Phase 2: 4 day light starts</option>
        <option value="Phase 3: Non-used vehicle">Phase 3: Non-used vehicle</option>
      </select>

      <p>Select Temperature:</p>
      <select value={temperature} onChange={handleTemperatureChange}>
        <option value="">Select Temperature</option>
        <option value="32/27">32/27</option>
        <option value="60/30">60/30</option>
        <option value="85">85</option>
      </select>
      <p>λ value:</p>
      <span style={{ fontStyle: 'oblique', color: 'red' }}>{lambdaValue}</span>
    </div>
  );
};

export default Form;
