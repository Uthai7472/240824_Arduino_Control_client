import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [status, setStatus] = useState('off');
  const [arduinoValue, setArduinoValue] = useState(null);

  const sendCommand = (command) => {
    axios.post('http://localhost:3001/api/arduino-control', { command })
      .then(response => {
        setStatus(command);
        console.log(response.data);
      })
      .catch(error => console.log('Error: ', error));
  }

  const fetchArduinoValue = async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/arduino-data');
        setArduinoValue(response.data.randomValue);
        console.log('Received random value:', arduinoValue);
        // Do something with the randomValue, like updating state if in a React component
        // setRandomValue(randomValue); // Example if you use useState
    } catch (error) {
        console.error('Error fetching Arduino value:', error);
    }
  }

  useEffect(() => {
    fetchArduinoValue();
    const interval = setInterval(fetchArduinoValue, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
            <h1>Arduino Control</h1>
            <button onClick={() => sendCommand('on')}>Turn On</button>
            <button onClick={() => sendCommand('off')}>Turn Off</button>
            <p>Current Status: {status}</p>
            <h2>Arduino data</h2>
            <p>Current Arudino value: {arduinoValue}</p>
    </div>
  )
}

export default App