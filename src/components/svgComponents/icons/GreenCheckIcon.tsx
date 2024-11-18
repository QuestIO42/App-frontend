import React from 'react'

interface GreenCheckIconProps extends React.SVGProps<SVGSVGElement> {
    className?: string
}

const GreenCheckIcon: React.FC<GreenCheckIconProps> = ({ className }) => {
    return (
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="48" 
        height="36" 
        viewBox="0 0 48 36" 
        fill="none">
        <path 
        d="M16.3029 35.0912L0.702915 19.4912C-0.234305 18.554 -0.234305 17.0344 0.702915 16.0971L4.09695 12.7029C5.03417 11.7656 6.55386 11.7656 7.49108 12.7029L18 23.2118L40.5089 0.702915C41.4461 -0.234305 42.9658 -0.234305 43.9031 0.702915L47.2971 4.09704C48.2343 5.03426 48.2343 6.55386 47.2971 7.49117L19.6971 35.0913C18.7597 36.0285 17.2401 36.0285 16.3029 35.0912Z"
        fill="#3FF29B" 
        />
        </svg>
      )
    }
    
    export default GreenCheckIcon