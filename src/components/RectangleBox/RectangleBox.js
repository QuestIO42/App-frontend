import React , {useState} from 'react';



const RectangleBoxHover = ({bgcolor, bgcolor2 , fontcolor2, boxcolor, boxshadow,fontcolor,children }) => {
    const [hover, setHover] = useState(false);

    const defaultStyle = {
        backgroundColor: bgcolor,
        color: fontcolor,
        border: '4px solid ' + boxcolor,
        padding: '0.3em 1em',
        fontSize: '1.2em',
        fontWeight: '600',
        transition:  'all 0.2s ease-in-out' ,
        boxShadow: '0px 0px 0px 0px #3affdf, 10px 10px ' + boxshadow ,
    };


    return (
        <div className="rectangle-box" style={defaultStyle}>
            {children}
        </div>
    );
};

export default RectangleBoxHover;