import React from 'react'

interface UnlockIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

const UnlockIcon: React.FC<UnlockIconProps> = ({ className }) => {
  return (
    <svg
      width="35"
      height="40"
      viewBox="0 0 45 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M33.0357 22.5H12.5536V13.4385C12.5536 9.95808 15.1717 7.06648 18.4422 7.03132C21.7458 6.99617 24.4464 9.85261 24.4464 13.3594V14.7657C24.4464 15.9346 25.3301 16.8751 26.4286 16.8751H29.0714C30.1699 16.8751 31.0536 15.9346 31.0536 14.7657V13.3594C31.0536 5.97664 25.3962 -0.0262806 18.4587 8.65298e-05C11.5212 0.0264537 5.94643 6.10847 5.94643 13.4913V22.5H3.96429C1.77567 22.5 0 24.3897 0 26.7188V40.7813C0 43.1104 1.77567 45 3.96429 45H33.0357C35.2243 45 37 43.1104 37 40.7813V26.7188C37 24.3897 35.2243 22.5 33.0357 22.5Z"
        fill="black"
      />
    </svg>
  )
}

export default UnlockIcon
