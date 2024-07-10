import RewardIcon from '../svgComponents/icons/RewardIcon'

export default function Ranking() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex min-h-[80px] min-w-[250px] items-center justify-center bg-roxo-claro shadow-default-btn-hover">
        <p className="text-center text-xl font-bold text-amarelo">
          Ranking Geral
        </p>
        <RewardIcon></RewardIcon>
      </div>

      <div className="min-h-[600px] min-w-[326px] bg-roxo-medio shadow-default-btn-hover"></div>
    </div>
  )
}
