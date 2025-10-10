import React from 'react'

interface CircuitRightProps extends React.SVGProps<SVGSVGElement> {}

const CircuitRight: React.FC<CircuitRightProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="3890"
      height="1314"
      viewBox="0 0 3890 1314"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform="scale(-1,1)"
      style={{ transform: 'scale(-1,1)', transformOrigin: 'center' }}
    >
      <line y1="483" x2="2549" y2="483" stroke="#3e347b" strokeWidth="10" />
      <line y1="693" x2="2365" y2="693" stroke="#3e347b" strokeWidth="10" />
      <line y1="893" x2="1183" y2="893" stroke="#3e347b" strokeWidth="10" />
      <line y1="283" x2="1580" y2="283" stroke="#3e347b" strokeWidth="10" />
      <line x1="1397" y1="1112" x2="2011" y2="1112" stroke="#3e347b" strokeWidth="10" />
      <line x1="1233" y1="65" x2="1847" y2="65" stroke="#3e347b" strokeWidth="10" />
      <line x1="2315" y1="265" x2="2929" y2="265" stroke="#3e347b" strokeWidth="10" />
      <line x1="3103" y1="1041" x2="3417" y2="1041" stroke="#3e347b" strokeWidth="10" />
      <line x1="3042" y1="535" x2="3606" y2="535" stroke="#3e347b" strokeWidth="10" />
      <line x1="2920" y1="1251" x2="3765" y2="1251" stroke="#3e347b" strokeWidth="10" />
      <line x1="3105.46" y1="1042.54" x2="2544.46" y2="481.536" stroke="#3e347b" strokeWidth="10" />
      <line x1="2922.46" y1="1252.54" x2="2361.46" y2="691.536" stroke="#3e347b" strokeWidth="10" />
      <line x1="1400.46" y1="1113.54" x2="1179.46" y2="892.536" stroke="#3e347b" strokeWidth="10" />
      <line x1="2097.46" y1="484.464" x2="2318.46" y2="263.464" stroke="#3e347b" strokeWidth="10" />
      <line x1="2824.46" y1="754.464" x2="3045.46" y2="533.464" stroke="#3e347b" strokeWidth="10" />
      <line x1="1016.46" y1="284.464" x2="1237.46" y2="63.4645" stroke="#3e347b" strokeWidth="10" />

      <circle cx="1909.5" cy="62.5" r="62.5" fill="#3e347b" />
      <circle cx="2979.5" cy="262.5" r="62.5" fill="#3e347b" />
      <circle cx="3479.5" cy="1041.5" r="62.5" fill="#3e347b" />
      <circle cx="3827.5" cy="1251.5" r="62.5" fill="#3e347b" />
      <circle cx="2073.5" cy="1112.5" r="57.5" stroke="#3e347b" strokeWidth="10" />
      <circle cx="3668.5" cy="532.5" r="57.5" stroke="#3e347b" strokeWidth="10" />
      <circle cx="1642.5" cy="283.5" r="57.5" stroke="#3e347b" strokeWidth="10" />
    </svg>
  )
}

export default CircuitRight
