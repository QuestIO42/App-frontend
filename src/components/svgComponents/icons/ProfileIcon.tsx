import React from 'react'

interface ProfileIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="53"
      height="53"
      viewBox="0 0 53 53"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_204_114)">
        <path
          d="M12.5001 31.4475L12.4977 31.6026L12.5836 31.7319C15.5749 36.2303 20.7006 39.2 26.5 39.2C32.2994 39.2 37.4251 36.2303 40.4164 31.7319L40.5023 31.6026L40.4999 31.4475C40.4804 30.148 39.8137 29.035 38.8333 28.1181C37.855 27.203 36.5305 26.4488 35.0965 25.8496C32.2307 24.6521 28.8072 24.025 26.5 24.025C24.1817 24.025 20.7582 24.6521 17.8949 25.8497C16.4622 26.4489 15.1397 27.2032 14.1631 28.1184C13.1845 29.0356 12.5196 30.1485 12.5001 31.4475ZM4.5 22.5C4.5 10.3561 14.3561 0.5 26.5 0.5C38.6439 0.5 48.5 10.3561 48.5 22.5C48.5 34.6439 38.6439 44.5 26.5 44.5C14.3561 44.5 4.5 34.6439 4.5 22.5ZM33.75 13.5C33.75 9.48886 30.5111 6.25 26.5 6.25C22.4889 6.25 19.25 9.48886 19.25 13.5C19.25 17.5111 22.4889 20.75 26.5 20.75C30.5111 20.75 33.75 17.5111 33.75 13.5Z"
          fill="#3FF29B"
          stroke="black"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_204_114"
          x="0"
          y="0"
          width="53"
          height="53"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_204_114"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_204_114"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default ProfileIcon
