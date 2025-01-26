import React from 'react'

interface PlayIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

const PlayIcon: React.FC<PlayIconProps> = ({ className }) => {
return (
<svg className={className} width="24" height="31" viewBox="0 0 24 31" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.26844 3.57817L1.5 3.08916V4V29V29.9108L2.26844 29.4218L21.9113 16.9218L22.5742 16.5L21.9113 16.0782L2.26844 3.57817Z" fill="black" stroke="black"/>
<path d="M1.26844 1.57817L0.5 1.08916V2V27V27.9108L1.26844 27.4218L20.9113 14.9218L21.5742 14.5L20.9113 14.0782L1.26844 1.57817Z" fill="#3FF29B" stroke="black"/>
</svg>

)
}

export default PlayIcon
