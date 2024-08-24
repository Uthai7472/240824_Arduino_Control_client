import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [status, setStatus] = useState('off');

  const sendCommand = (command) => {
    axios.post('https://arduino-control-server.vercel.app/api/arduino-control', { command })
      .then(response => {
        setStatus(command);
        console.log(response.data);
      })
      .catch(error => console.log('Error: ', error));
  }


  return (
    <div>
            <h1>Arduino Control</h1>
            <button onClick={() => sendCommand('on')}>Turn On</button>
            <button onClick={() => sendCommand('off')}>Turn Off</button>
            <p>Current Status: {status}</p>
    </div>
  )
}

export default App