import RewardIcon from '../svgComponents/icons/RewardIcon'

interface RankingProps {
  children: React.ReactNode
  className?: string
}

export default function Ranking(Children: RankingProps) {
  return (
    <div className={`flex flex-col gap-5`}>
      <div className="flex min-h-[88px] min-w-[310px] items-center justify-center bg-roxo-300 shadow-default-roxo-500 mr-[90px]">
        <p className="mr-2 text-center text-2xl font-bold text-amarelo">
          ranking geral
        </p>
        <RewardIcon></RewardIcon>
      </div>
      <div className="h-auto max-w-[312px] bg-roxo-500 px-4 py-2 shadow-default-roxo-500">
        {Children.children}
      </div>
    </div>
  )
}
