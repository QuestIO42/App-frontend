import RewardIcon from '../svgComponents/icons/RewardIcon'

interface RankingProps {
  children: React.ReactNode
}

export default function Ranking(Children: RankingProps) {
  return (
    <div className="flex flex-col relative left-20 gap-5">
      <div className="shadow-default-roxo-500 flex min-h-[70px] min-w-[300px] max-w-[75%] items-center justify-center bg-roxo-300">
        <p className="text-center text-2xl font-bold mr-2 text-amarelo">
          ranking geral
        </p>
        <RewardIcon></RewardIcon>
      </div>
      <div className="py-2 px-4  shadow-default-roxo-500 min-h-[600px] min-w-[300px] max-w-[75%] bg-roxo-500">
        {Children.children}
      </div>
    </div>
  )
}
