import React from "react";
import './LevelProgress.css';

const LevelProgress = ({circleWidth}) => {
    const radius = 85;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * circleWidth/ 100;
    
    return (
        <div className="level-progress">
           <svg width={circleWidth} height={circleWidth} 
            viewBox={`0 0 ${circleWidth} ${circleWidth}`}>

            <circle
            cx={circleWidth / 2}
            cy={circleWidth / 2}
            r={radius}
            className="circle-background"
            strokeWidth="10px"
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            />
            
            <circle 
             cx={circleWidth / 2}
                cy={circleWidth / 2}
                r={radius}
                className="circle-progress"
                strokeWidth="10px"
                style={{strokeDasharray: dashArray, strokeDashoffset: dashOffset}}
                
            />
            </svg>
        </div>
    );
}

export default LevelProgress;