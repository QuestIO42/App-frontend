import RewardIcon from '../svgComponents/icons/RewardIcon'


export default function Ranking(Children:any) {
  return (
    <div className="flex flex-col gap-4">
      <div className="mr-14 shadow-default-roxo-500 flex min-h-[80px] min-w-[250px] max-w-[90%] items-center  justify-center bg-roxo-300">
        <p className="text-center text-xl font-bold text-amarelo">
          Ranking Geral
        </p>
        <RewardIcon></RewardIcon>
      </div>
      <div className="py-2 px-2 shadow-default-roxo-500 min-h-[600px] min-w-[250px] max-w-[90%] bg-roxo-500">
        {Children.children}
      </div>
    </div>
  )
}
