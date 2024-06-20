import React from 'react';
import SquareForm from '../SquareForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const SquareDisplay = ({ imagem, nome,curso }) => {
  return (
    <div className='square-grid mx-1'>
      <SquareForm>
        <a href="#"> {/* Mudar links depois */}
        <img src={imagem} className="square-image"/>
        </a>
      </SquareForm>
      <div className="nome-professor-display">
          <a class="text-decoration-none" href="#"><h3 className='curso-courses'> {curso}</h3></a>
          <h4 className='nome-professor'>{nome} </h4>
      </div>
    </div>
  );
};

export default SquareDisplay;