import RewardIcon from '../svgComponents/icons/RewardIcon'

export default function UserRank() {
  return (
    <div className="flex min-h-[80px] min-w-[264px] items-center justify-center bg-roxo-300 shadow-default-roxo-500 gap-2">
      <RewardIcon></RewardIcon>
      <div>
        <p className="text-left text-xl font-bold text-amarelo">
          posição ranking
        </p>
        <p className="text-left text-xl font-bold text-amarelo">geral: 150°</p>
      </div>
    </div>

  )
}
