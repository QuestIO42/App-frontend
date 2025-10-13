import React from 'react'

interface CircuitFullRightProps extends React.SVGProps<SVGSVGElement> {}

const CircuitBottom: React.FC<CircuitFullRightProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="3228"
      height="1327"
      viewBox="0 0 3228 1327"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="3228" y1="1263" x2="125" y2="1263" stroke="#3e347b" strokeWidth="10" />
      <line x1="3228" y1="1063" x2="1496" y2="1063" stroke="#3e347b" strokeWidth="10" />
      <line x1="3228" y1="863" x2="967" y2="862.999" stroke="#3e347b" strokeWidth="10" />
      <line x1="3228" y1="663" x2="2502" y2="663" stroke="#3e347b" strokeWidth="10" />
      <line x1="3228" y1="463" x2="587.999" y2="463" stroke="#3e347b" strokeWidth="10" />
      <line x1="3228" y1="263" x2="1908" y2="263" stroke="#3e347b" strokeWidth="10" />
      <line x1="3228" y1="63" x2="2277" y2="62.9999" stroke="#3e347b" strokeWidth="10" />

      <circle cx="62.502" cy="1264.5" r="57.5" transform="rotate(-180 62.502 1264.5)" stroke="#3e347b" strokeWidth="10" />
      <circle cx="904.5" cy="863.5" r="57.5" transform="rotate(-180 904.5 863.5)" stroke="#3e347b" strokeWidth="10" />
      <circle cx="1433.5" cy="1062.5" r="62.5" transform="rotate(-180 1433.5 1062.5)" fill="#3e347b" />
      <circle cx="2439.5" cy="662.5" r="62.5" transform="rotate(-180 2439.5 662.5)" fill="#3e347b" />
      <circle cx="1845.5" cy="262.5" r="62.5" transform="rotate(-180 1845.5 262.5)" fill="#3e347b" />
      <circle cx="525.5" cy="466.5" r="57.5" transform="rotate(-180 525.5 466.5)" stroke="#3e347b" strokeWidth="10" />
      <circle cx="2214.5" cy="62.4995" r="57.5" transform="rotate(-180 2214.5 62.4995)" stroke="#3e347b" strokeWidth="10" />
    </svg>
  )
}

export default CircuitBottom
