import React  from 'react';
import {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ModalSquare.css';
import imagem from '../../img/imagem(1).png';
import SquareForm from '../SquareForm';
import FileUploader from '../FileUploader';

const ModalSquare = ()=> {
  const [selectedColor, setSelectedColor] = useState('orange');

  // Handler das checkboxes
  const handleCheckChange = (value) => { 
    setSelectedColor(value); 
}; 
return (
   <div>
    <button type="button" class="btn btn-primary" id="mybtn" data-bs-toggle="modal" data-bs-target="#exampleModal" >
  criar novo curso
</button>




<div class="modal fade " id="exampleModal"  tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" data-bs-backdrop="false" data-bs-keyboard="true">
  <div class="modal-dialog" id="exmpmodal" role="document">
    <div class="modal-content mt-5" id="shadowmodal">
      <div class="modal-header border-0 modhead ">
        <button type="button" class="close" id="btn-close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <div class="modal-body modbody">
        <div class=" modal-left">
          <label  className="form-label2">nome do curso</label>
                                            <input
                                                type="text"
                                                className="form-input2"
                                            />
           <label  className="form-label2">professores</label>
                                            <input
                                                type="text"
                                                className="form-input2"
                                            />
          <label  className="form-label2">descrição do curso</label>
          
          <textarea className="form-input-slider" name="short_desc" required></textarea>
          
          <div className="form-label2">cor do seu curso</div>

              <div className="container-checkmark">
               
                  <label className="container-check">
                  <input  type="radio" name="radio2" id="radio-1" value="green" checked={selectedColor==="green"} onChange={() =>handleCheckChange("green") }/>
                  </label>
               
                <label className="container-check">
                  <input  type="radio"  name="radio2" id="radio-2" value="orange" checked={selectedColor==="orange"} onChange={() =>handleCheckChange("orange") }/>
                </label>
                
                <label className="container-check">
                  <input  type="radio" name="radio2" id="radio-3" value="purple" checked={selectedColor==="purple"} onChange={() =>handleCheckChange("purple")}/>
                </label>

            </div>

        </div>
        


         <div className="modal-right"><span className="form-label3">imagem do curso </span>
         <div className="modal-right-size">
         <SquareForm>
            
            <img src={imagem} className="square-image-modal"/>
            <FileUploader handleFile={(file) => console.log(file)} />
        
         </SquareForm>
         </div>
         </div>
      </div>
      <div class="modal-footer border-0 justify-content-center">
     
        <button type="button" class="btn btn-primary modal-btn">criar novo curso</button>
        </div> 
    </div>
  </div>
</div>
</div>



    );
    };

    export default ModalSquare;