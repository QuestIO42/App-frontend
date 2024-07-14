import RewardIcon from '../svgComponents/icons/RewardIcon'

export default function Ranking() {
  return (
    <div className="flex flex-col gap-4">
      <div className="shadow-default-roxo-500 flex min-h-[80px] min-w-[250px] items-center justify-center bg-roxo-300">
        <p className="text-center text-xl font-bold text-amarelo">
          Ranking Geral
        </p>
        <RewardIcon></RewardIcon>
      </div>

      <div className="shadow-default-roxo-500 min-h-[600px] min-w-[326px] bg-roxo-500"></div>
    </div>
  )
}
