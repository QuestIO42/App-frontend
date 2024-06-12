import React , {useState} from 'react';

const RectangleBoxHover = ({bgcolor, bgcolor2 , fontcolor2, boxcolor, boxshadow,fontcolor,children }) => {
    const [hover, setHover] = useState(false);

    const defaultStyle = {
        backgroundColor: bgcolor,
        color: fontcolor,
        border: '3px solid ' + boxcolor,
        padding: '0.3em 1em',
        fontSize: '1.2em',
        fontWeight: '600',
        transition:  'all 0.2s ease-in-out' ,
        boxShadow: '0px 0px 0px 0px #3affdf, 8px 8px ' + boxshadow ,
    };

    const hoverStyle = {
        backgroundColor: bgcolor2,
        color: fontcolor2,
        border: '3px solid ' + boxcolor,
        padding: '0.3em 1em',
        fontSize: '1.2em',
        fontWeight: '600',
      
        boxShadow: hover ? '0px 0px 0px 0px #3affdf, 8px 8px ' + boxshadow : '2px 2px 5px 1px ' + bgcolor ,
    };


    return (
        <div
        className="rectangle-box"
        style={hover ? { ...defaultStyle, ...hoverStyle } : defaultStyle}
        onMouseEnter={() =>  setHover(true)}
        onMouseLeave={() =>  setHover(false)}
    >
        
            {children}
        </div>
    );
};

export default RectangleBoxHover;