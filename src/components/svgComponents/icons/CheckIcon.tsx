import React from 'react'

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

const CheckIcon: React.FC<CheckIconProps> = ({ className }) => {
  return(
<svg width="38" height="29" viewBox="0 0 38 29" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.9065 27.7805L0.556474 15.4305C-0.185491 14.6886 -0.185491 13.4855 0.556474 12.7435L3.24342 10.0565C3.98538 9.31444 5.18847 9.31444 5.93044 10.0565L14.25 18.376L32.0696 0.556474C32.8115 -0.185491 34.0146 -0.185491 34.7566 0.556474L37.4435 3.24349C38.1855 3.98546 38.1855 5.18847 37.4435 5.93051L15.5935 27.7806C14.8515 28.5226 13.6485 28.5226 12.9065 27.7805Z" fill="#3FF29B"/>
</svg>

)
}
export default CheckIcon
