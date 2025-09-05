import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

interface RankingProps {
  children: React.ReactNode
  className?: string
}

export default function Ranking(Children: RankingProps) {
  return (
    <div className={`flex flex-col gap-6 mr-10 md:mr-20`}>
      <div className="flex min-w-[360px] py-4 px-6 items-center justify-center bg-roxo-300 shadow-default-roxo-500 gap-4">
        <FontAwesomeIcon icon={faTrophy} className="text-amarelo text-3xl" />
        <p className="mr-2 text-center text-2xl font-bold text-amarelo">
          Ranking Geral
        </p>
      </div>
      <div className="h-auto max-w-[360px] bg-roxo-500 p-4 shadow-default-roxo-500">
        {Children.children}
      </div>
    </div>
  )
}
