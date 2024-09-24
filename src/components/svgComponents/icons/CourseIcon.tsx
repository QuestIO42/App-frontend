import React from 'react'

interface CourseIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

const CourseIcon: React.FC<CourseIconProps> = ({ className }) => {
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
        d="M25 7L3 19L11 23.36V35.36L25 43L39 35.36V23.36L43 21.18V35H47V19L25 7ZM38.64 19L25 26.44L11.36 19L25 11.56L38.64 19ZM35 32.98L25 38.44L15 32.98V25.54L25 31L35 25.54V32.98Z" fill="black"/>
        <path 
        d="M23.9998 6L1.99982 18L9.99982 22.36V34.36L23.9998 42L37.9998 34.36V22.36L41.9998 20.18V34H45.9998V18L23.9998 6ZM37.6398 18L23.9998 25.44L10.3598 18L23.9998 10.56L37.6398 18ZM33.9998 31.98L23.9998 37.44L13.9998 31.98V24.54L23.9998 30L33.9998 24.54V31.98Z" fill="#454545"/>
    </svg>
  )
}

export default CourseIcon
