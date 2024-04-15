import React, { useState } from 'react';

function ApiRequestForm() {
  const [text, setInputData] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [loading, setLoading] = useState(false); 
  
  const allExamples = [
  "She don't like carrots",
  "He plays soccer good",
  "The cat laying on sofa",
  "We goes to the beach",
  "They're coming home tomorrow",
  "I seen that movie already",
  "Her dog is bigger then mine",
  "The book is laying in table",
  "He can't hardly wait",
  "You should of asked earlier",
  "Their going to the party",
  "The baby's crying for milk",
  "The teacher gives us homeworks",
  "He don't know the answer",
  "She sings goodly",
  "Let's ate in our favourite restaurant",
  "You must not to do that",
  "They are all have pets",
  "She's taller then him",
  "We was at the store",
  "I could of helped you",
  "The dog bark louder",
  "I'm went to the shop",
  "He eats a apple",
  "Their house is big then ours"
];

  
  const [examples, setExamples] = useState(getRandomExamples(allExamples, 3));

  function getRandomExamples(examples, count) {
    return examples.sort(() => Math.random() - 0.5).slice(0, count);
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when the request starts
    try {
      const response = await fetch('http://localhost:5000/correct_grammar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text })
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
    } finally {
      setLoading(false); // Set loading state to false when the request completes
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

  const handleExampleClick = (example) => {
    setInputData(example);
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', color: 'white', padding: '10px', gap: '10px' }}>
        <img src='https://avatars.githubusercontent.com/u/82580313?s=200&v=4' style={{ width: '80px' }} />
        <h1>AI Grammar Check</h1>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <textarea
            id="inputData"
            name="text"
            placeholder='Message What You Want.....'
            value={text}
            onChange={handleChange}
            onSubmit={handleChanges}
            maxLength={50}
            required
            style={{
              width: '700px',
              minHeight: '30px',
              fontSize: '16px',
              height: 'auto',
              padding: '10px 15px',
              resize: 'none',
              borderRadius: '15px',
              borderColor: 'grey',
            }}
          />
        </div>
        <br /><br />
        <button type="submit" disabled={loading} style={{ backgroundColor: 'black', color: 'white', fontWeight: '700', borderRadius: '8px', padding: '10px 20px' }}>
          {loading ? 'Sending...' : 'Send'}
        </button>
        <br /><br />
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {/* <p style={{ fontWeight: 'bold' }}>Suggestions to try:</p> */}
          {examples.map((example, index) => (
            <div
              key={index}
              onClick={() => handleExampleClick(example)}
              style={{
                backgroundColor: '#f5f5f5',
                padding: '10px 20px 10px 20px',
                borderRadius: '20px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              {/* <span style={{ fontWeight: 'bold' }}>Example {index + 1}:</span> */}
              <p>{example}</p>
            </div>
          ))}
        </div>
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
      {response && response.data && (
        <div>
          <p>Result: {response.data}</p>
        </div>
      )}
    </div>
  );
}

export default ApiRequestForm;