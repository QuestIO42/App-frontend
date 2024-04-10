import { useRef } from 'react';
import SaveCloud from './/../img/SaveCloud.svg';

export const FileUploader = ({handleFile}) => {  // Create a reference to the hidden file input element
  const hiddenFileInput = useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };  
  const handleChange = event => {
    const fileUploaded = event.target.files[0];
    handleFile(fileUploaded);
  };return (
    <>
      <button className="button-upload" onClick={handleClick}>
        <img className="save-cloud" src={SaveCloud}/>
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