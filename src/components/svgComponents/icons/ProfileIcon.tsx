import React from 'react'

interface ProfileIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ className }) => {
  return (
    <svg
      className={`fill-current ${className}`}
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
    <path
          d="M10.1667 33.9458L10.1644 34.101L10.2503 34.2302C13.349 38.8903 18.6589 41.9667 24.6666 41.9667C30.6744 41.9667 35.9843 38.8903 39.083 34.2302L39.1689 34.101L39.1666 33.9458C39.1464 32.605 38.4585 31.4552 37.4441 30.5064C36.4318 29.5595 35.0604 28.7783 33.5744 28.1574C30.6046 26.9166 27.0567 26.2667 24.6666 26.2667C22.2651 26.2667 18.7171 26.9165 15.75 28.1575C14.2654 28.7785 12.8961 29.5597 11.8855 30.5067C10.8729 31.4557 10.1869 32.6054 10.1667 33.9458ZM1.83331 24.6667C1.83331 12.0628 12.0628 1.83337 24.6666 1.83337C37.2705 1.83337 47.5 12.0628 47.5 24.6667C47.5 37.2706 37.2705 47.5 24.6666 47.5C12.0628 47.5 1.83331 37.2706 1.83331 24.6667ZM32.1666 15.3334C32.1666 11.1839 28.8161 7.83337 24.6666 7.83337C20.5172 7.83337 17.1666 11.1839 17.1666 15.3334C17.1666 19.4829 20.5172 22.8334 24.6666 22.8334C28.8161 22.8334 32.1666 19.4829 32.1666 15.3334Z" fill="black" stroke="black"/>
          <path d="M8.83339 32.6125L8.83105 32.7676L8.91698 32.8969C12.0157 37.5569 17.3256 40.6333 23.3333 40.6333C29.3411 40.6333 34.651 37.5569 37.7497 32.8969L37.8356 32.7676L37.8333 32.6125C37.8131 31.2716 37.1252 30.1218 36.1108 29.173C35.0985 28.2261 33.727 27.445 32.2411 26.8241C29.2713 25.5832 25.7234 24.9333 23.3333 24.9333C20.9317 24.9333 17.3838 25.5831 14.4167 26.8241C12.9321 27.4451 11.5627 28.2263 10.5522 29.1733C9.53957 30.1223 8.8536 31.272 8.83339 32.6125ZM0.5 23.3333C0.5 10.7295 10.7295 0.5 23.3333 0.5C35.9372 0.5 46.1667 10.7295 46.1667 23.3333C46.1667 35.9372 35.9372 46.1667 23.3333 46.1667C10.7295 46.1667 0.5 35.9372 0.5 23.3333ZM30.8333 14C30.8333 9.85052 27.4828 6.5 23.3333 6.5C19.1839 6.5 15.8333 9.85052 15.8333 14C15.8333 18.1495 19.1839 21.5 23.3333 21.5C27.4828 21.5 30.8333 18.1495 30.8333 14Z" fill="#3FF29B" stroke="black"/>
      <defs>
        <filter
          id="filter0_d_204_114"
          x="0"
          y="0"
          width="53"
          height="53"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
