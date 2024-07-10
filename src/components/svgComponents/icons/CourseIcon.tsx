import React from 'react'

interface CourseIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

const CourseIcon: React.FC<CourseIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="50"
      height="50"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.7497 20.8333V37.5L33.333 29.1666L18.7497 20.8333ZM43.7497 12.5H27.958L34.8122 5.64579L33.333 4.16663L24.9997 12.5H24.9372L16.6038 4.16663L15.1663 5.64579L21.9997 12.5H6.24967C3.95801 12.5 2.08301 14.375 2.08301 16.6666V41.6666C2.08301 43.9583 3.95801 45.8333 6.24967 45.8333H43.7497C46.0413 45.8333 47.9163 43.9583 47.9163 41.6666V16.6666C47.9163 14.375 46.0413 12.5 43.7497 12.5ZM43.7497 41.6666H6.24967V16.6666H43.7497V41.6666Z"
        fill="#454545"
      />
    </svg>
  )
}

export default CourseIcon
