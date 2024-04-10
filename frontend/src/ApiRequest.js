import React, { useState } from 'react';

function ApiRequestForm() {
  const [inputData, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('your-api-endpoint', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ inputData })
        });

        if (response.ok || response.status === 201) {
          const data = await response.json();
          setResponse(data);
          setError(null);
        } else {
          setResponse(null);
          setError(`Error: ${response.statusText}`);
          
        }
      
    } catch (error) {
      console.error('Error:', error);
      setError('Error: Failed to fetch data');
      
    }
  };

  const closeModal = () => {
    setShowErrorModal(false);
  };
  
  const handleChange = (e) => {
    const element = e.target;
    element.style.height = 'auto';
    element.style.height = Math.min(element.scrollHeight, 250) + 'px'; 
    const { value } = e.target;
    setInputData(value);
    
  };
  const handleChanges = (e) => {
    const { value } = e.target;
    setInputData(value);
  };

  return (
    <div>
      <h1>AI-Writing-Assistant</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <textarea
            id="inputData"
            name="inputData"
            placeholder='Message What You Want.....'
            value={inputData}
            onChange={handleChange}
            onSubmit={handleChanges}
            style={{
              width: '700px',
              minHeight: '30px',
              fontSize: '16px',
              height: 'auto',
              padding:'10px 15px',
              resize: 'none', 
              borderRadius: '15px',
              borderColor: 'grey',
            }}
          />
        </div>

        <br /><br />
        <button type="submit" style={{ backgroundColor: 'black', color: 'white', fontWeight: '700', borderRadius: '8px', padding: '10px 20px' }}>Submit</button>
      </form>
      {error && <p>{error}</p>}
      {error && showErrorModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{error}</p>
          </div>
        </div>
      )}
      {response && response.success && (
        <div>
          {/* <h2>Response:</h2>
          <p>Success: true</p> */}
          <p>Result: {response.res}</p>
        </div>
      )}
      {/* {response && response.status === 201 && (
        <div>
          <h2>Response:</h2>
          <p>Success: true</p>
          <p>Result: {response.statusText}</p>
        </div>
      )} */}
    </div>
  );
}

export default ApiRequestForm;
