import React from 'react';

const SquareDisplay = ({ imagem }) => {
  return (
    <div className='square-container'>
      <img src={imagem} alt="Square-Image" className="square-image" />
      <div className="rectangle-upper"> </div>
      <div className="rectangle-lower"> </div>
    </div>
  );
};

export default SquareDisplay;