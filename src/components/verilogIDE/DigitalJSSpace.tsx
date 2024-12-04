import React, { useState } from 'react';

const DigitalJSSpace = () => {
  const [value, setValue] = useState(null);
  const [processedValue, setProcessedValue] = useState(null);
  const [text, setText] = useState('');

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (value !== null) {
      try {
        const response = await fetch('/api/process_sv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text }),
        });
        const data = await response.json();
        console.log("processed: ", data.processed);
        setProcessedValue(data.processed);
      } catch (error) {
        console.error("Error processing text:", error);
      }
    }
  };

  return (
    <div>
      <h1>Processed Value</h1>
      <button onClick={handleClick}>Process</button>
      {processedValue && <pre>{JSON.stringify(processedValue, null, 2)}</pre>}
    </div>
  );
};

export default DigitalJSSpace;
