import React from 'react';

const Square_display = ({imagem}) => {
  return (
    <div>
      {<img src={imagem} alt="Square_Image" style="width: 228px; height: 227px; background: #D9D9D9"></img>}
      {<div class="Rectangle18" style="width: 250px; height: 250px; background: rgba(217, 217, 217, 0); border: 5px #454545 solid"></div>}
      {<div class="Rectangle19" style="width: 250px; height: 250px; background: rgba(217, 217, 217, 0); border: 5px #454545 solid"></div>}
    </div>
  );
};

export default Square_display;