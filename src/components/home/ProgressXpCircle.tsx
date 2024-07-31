interface ProgressCircleXp {
  level: number // número que fica no centro do circulo
  progress: number // deve representar o preenchimento do circulo
}
/* Há uma adaptção interessante aqui. Fazer -progress para que o circulo comece
no local adequado, como está no figma. */

export default function ProgressXpCircle({
  level,
  progress,
}: ProgressCircleXp) {
  const radius = 90
  const stroke = 20
  const normalizedRadius = radius - stroke
  const circumference = normalizedRadius * 2 * Math.PI
  const strokeDashoffset = circumference - (-progress / 100) * circumference

  return (
    <div className="flex items-center justify-center">
      <svg width="12em" height="12em" viewBox="0 43 250 250">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="1" dy="1" stdDeviation="0" floodColor="black" />
          </filter>
        </defs>
        <circle
          strokeWidth={stroke}
          stroke={'#F2DB3F'}
          fill="transparent"
          r={normalizedRadius}
          cx={125}
          cy={125}
        />
        <circle
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset }}
          stroke={'#F2953F'}
          fill="transparent"
          r={normalizedRadius}
          cx={125}
          cy={125}
          filter="url(#shadow)"
        />
        <text
          x="50%"
          y="50%"
          dy=".3em"
          textAnchor="middle"
          className="text-2xl text-black"
        >
          <tspan x="50%" dy="0em">
            level
          </tspan>
          <tspan x="50%" dy="1.2em" fontSize="1.3em">
            {level}
          </tspan>
        </text>
      </svg>
    </div>
  )
}
