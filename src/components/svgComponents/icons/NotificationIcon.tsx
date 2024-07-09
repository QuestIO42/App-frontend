import React from 'react';

interface NotificationIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ className }) => {
  return (
    <svg
      className={className}
      width="43"
      height="51"
      viewBox="0 0 43 51"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_204_112)">
        <path
          d="M34.125 29.5312V29.7384L34.2714 29.8848L38.5 34.1134V35.5938H4.5V34.1134L8.72855 29.8848L8.875 29.7384V29.5312V18.5938C8.875 12.0306 12.3328 6.67717 18.334 5.25528L18.7188 5.16413V4.76875V3.28125C18.7188 1.74177 19.9605 0.5 21.5 0.5C23.0395 0.5 24.2812 1.74177 24.2812 3.28125V4.76875V5.16381L24.6656 5.25519C30.6456 6.67701 34.125 12.0529 34.125 18.5938V29.5312ZM25.3426 38.7812C25.0952 40.6777 23.4608 42.1562 21.5 42.1562C19.5205 42.1562 17.9017 40.679 17.657 38.7812H25.3426Z"
          fill="#F2DB3F"
          stroke="black"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_204_112"
          x="0"
          y="0"
          width="43"
          height="50.6562"
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
  );
};

export default NotificationIcon;
