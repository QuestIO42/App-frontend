import RewardIcon from '../svgComponents/icons/RewardIcon'

interface UserPosition {
  position: number
}

export default function UserRank({
  position,
}: UserPosition) {
  return (
    <div className="flex min-h-[80px] min-w-[264px] items-center justify-center bg-roxo-300 shadow-default-roxo-500 gap-2 pr-2">
      <RewardIcon></RewardIcon>
      <div>
        <p className="text-left text-xl font-bold text-amarelo">
          posição ranking
        </p>
        <p className="text-left text-xl font-bold text-amarelo">geral: {position}°</p>
      </div>
    </div>

  )
}
