import React, { useState } from 'react';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonInput = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await fetch('https://your-backend-url/bfhl', { // Replace with your deployed backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Invalid JSON or error in fetching:', error);
    }
  };

  const handleSelectChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(options);
  };

  return (
    <div className="App">
      <h1>{'your_roll_number'}</h1> {/* Replace with your roll number */}
      <textarea
        placeholder='Enter JSON here...'
        value={jsonInput}
        onChange={handleJsonInput}
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <>
          <select multiple={true} onChange={handleSelectChange}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_lowercase_alphabet">Highest lowercase alphabet</option>
          </select>

          <div>
            {selectedOptions.includes('alphabets') && (
              <div>
                <h2>Alphabets</h2>
                <p>{response.alphabets.join(', ')}</p>
              </div>
            )}
            {selectedOptions.includes('numbers') && (
              <div>
                <h2>Numbers</h2>
                <p>{response.numbers.join(', ')}</p>
              </div>
            )}
            {selectedOptions.includes('highest_lowercase_alphabet') && (
              <div>
                <h2>Highest Lowercase Alphabet</h2>
                <p>{response.highest_lowercase_alphabet.join(', ')}</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
