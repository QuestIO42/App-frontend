import React from 'react'

interface NotificationIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="48"
      height="48"
      viewBox="0 0 49 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
      d="M34.2716 33.5691V33.7762L34.4181 33.9226L39.082 38.5865V40.2845H1.59949V38.5865L6.26335 33.9226L6.4098 33.7762V33.5691V21.5433C6.4098 14.3098 10.2224 8.39915 16.8483 6.82925L17.233 6.7381V6.34272V4.70722C17.233 2.98708 18.6206 1.59949 20.3407 1.59949C22.0609 1.59949 23.4485 2.98708 23.4485 4.70722V6.34272V6.73778L23.8328 6.82916C30.4353 8.39899 34.2716 14.3343 34.2716 21.5433V33.5691ZM24.6219 43.6897C24.372 45.8262 22.5412 47.5 20.3407 47.5C18.1193 47.5 16.3063 45.8275 16.0591 43.6897H24.6219Z" fill="black" stroke="black"/>
      <path
      d="M33.1722 32.4696V32.6767L33.3186 32.8231L37.9825 37.487V39.185H0.5V37.487L5.16386 32.8231L5.31031 32.6767V32.4696V20.4438C5.31031 13.2103 9.1229 7.29966 15.7488 5.72977L16.1335 5.63861V5.24324V3.60773C16.1335 1.8876 17.5211 0.5 19.2412 0.5C20.9614 0.5 22.349 1.8876 22.349 3.60773V5.24324V5.63829L22.7333 5.72967C29.3358 7.2995 33.1722 13.2348 33.1722 20.4438V32.4696ZM23.5225 42.5902C23.2725 44.7267 21.4417 46.4005 19.2412 46.4005C17.0198 46.4005 15.2069 44.728 14.9597 42.5902H23.5225Z" fill="#F2DB3F" stroke="black"/>
      <defs>
        <filter
          id="filter0_d_204_112"
          x="0"
          y="0"
          width="43"
          height="50.6562"
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
            result="effect1_dropShadow_204_112"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_204_112"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default NotificationIcon
