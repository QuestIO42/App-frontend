import React from 'react'

interface CircuitFullProps extends React.SVGProps<SVGSVGElement> {}

const CircuitTop: React.FC<CircuitFullProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="3228"
      height="1327"
      viewBox="0 0 3228 1327"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line y1="64" x2="3103" y2="64" stroke="#3e347b" strokeWidth="10" />
      <line y1="264" x2="1732" y2="264" stroke="#3e347b" strokeWidth="10" />
      <line y1="464" x2="2261" y2="464" stroke="#3e347b" strokeWidth="10" />
      <line y1="664" x2="726" y2="664" stroke="#3e347b" strokeWidth="10" />
      <line y1="864" x2="2640" y2="864" stroke="#3e347b" strokeWidth="10" />
      <line y1="1064" x2="1320" y2="1064" stroke="#3e347b" strokeWidth="10" />
      <line y1="1264" x2="951" y2="1264" stroke="#3e347b" strokeWidth="10" />

      <circle cx="3165.5" cy="62.5" r="57.5" stroke="#3e347b" strokeWidth="10" />
      <circle cx="2323.5" cy="463.5" r="57.5" stroke="#3e347b" strokeWidth="10" />
      <circle cx="1794.5" cy="264.5" r="62.5" fill="#3e347b" />
      <circle cx="788.5" cy="664.5" r="62.5" fill="#3e347b" />
      <circle cx="1382.5" cy="1064.5" r="62.5" fill="#3e347b" />
      <circle cx="2702.5" cy="860.5" r="57.5" stroke="#3e347b" strokeWidth="10" />
      <circle cx="1013.5" cy="1264.5" r="57.5" stroke="#3e347b" strokeWidth="10" />
    </svg>
  )
}

export default CircuitTop
