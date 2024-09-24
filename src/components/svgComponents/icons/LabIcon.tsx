import React from 'react'

interface LabIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

const LabIcon: React.FC<LabIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path 
      d="M19 21V37L33 29L19 21ZM43 13H27.84L34.42 6.42L33 5L25 13H24.94L16.94 5L15.56 6.42L22.12 13H7C4.8 13 3 14.8 3 17V41C3 43.2 4.8 45 7 45H43C45.2 45 47 43.2 47 41V17C47 14.8 45.2 13 43 13ZM43 41H7V17H43V41Z" fill="black"/>
      <path 
      d="M18 20V36L32 28L18 20ZM42 12H26.84L33.42 5.42L32 4L24 12H23.94L15.94 4L14.56 5.42L21.12 12H6.00003C3.80003 12 2.00003 13.8 2.00003 16V40C2.00003 42.2 3.80003 44 6.00003 44H42C44.2 44 46 42.2 46 40V16C46 13.8 44.2 12 42 12ZM42 40H6.00003V16H42V40Z" fill="#454545"/>
    </svg>
  )
}

export default LabIcon
