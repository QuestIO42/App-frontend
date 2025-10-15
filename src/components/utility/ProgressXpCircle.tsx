interface ProgressCircleXp {
  level: number // número que fica no centro do circulo
  progress: number // deve representar o preenchimento do circulo
  width?: string,
  height?: string
}
/* Há uma adaptção interessante aqui. Fazer -progress para que o circulo comece
no local adequado, como está no figma. */

/*
<svg width="15.625em" height="8.125em" viewBox="0 0 250 160">
15.625em = 250px; 8.125em = 130px
*/
export default function ProgressXpCircle({
  level,
  progress,
  width = "8em",
  height = "8em"
}: ProgressCircleXp) {
  const radius = 90
  const stroke = 20
  const normalizedRadius = radius - stroke
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (-progress / 100) * circumference
  const size = (normalizedRadius + stroke) * 2

  return (
      <svg width={width} height={height}  viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <filter id="shadow">
            <feDropShadow dx="1" dy="1" stdDeviation="0" floodColor="black" />
          </filter>
        </defs>
        <circle
          strokeWidth={stroke}
          stroke={'#f8e0c9ff'}
          fill="transparent"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          stroke={'#F2953F'}
          fill="transparent"
          r={normalizedRadius}
          cx={size / 2}
          cy={size / 2}
          filter="url(#shadow)"
        />
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          className="text-2xl font-bold"
          fill="#F2953F"
        >
          <tspan x="50%" dy="0.4em" fontSize="2em">
            {level}
          </tspan>
        </text>
      </svg>
  )
}
