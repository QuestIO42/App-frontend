import { useState } from 'react';
import { useRef } from 'react';
import SaveCloud from '../../img/SaveCloud.svg';

import './FileUploader.css'

export const FileUploader = ({handleFile}) => {  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };  
  const [file, setFile] =useState(SaveCloud);
    

  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
    setFile(URL.createObjectURL(fileUploaded)); 
    
  };return (
    <>
      <button className="button-upload" onClick={handleClick}>
        <img className="save-cloud" src={file} alt=''/>
      </button>
      <input
        type="file"
        onChange={handleChange}
        ref={hiddenFileInput}
        style={{display: 'none'}} // Make the file input element invisible
      />
    </>
  );
};
export default FileUploader;