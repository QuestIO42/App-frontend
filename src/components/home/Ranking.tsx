import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'

interface RankingProps {
  children: React.ReactNode
  className?: string
}

export default function Ranking(Children: RankingProps) {
  return (
    <div className={`flex flex-col gap-5 mr-10 md:mr-20`}>
      <div className="flex min-h-[72px] min-w-[360px] items-center justify-center bg-roxo-300 shadow-default-roxo-500">
        <p className="mr-2 text-center text-2xl font-bold text-amarelo">
          Ranking Geral
        </p>
        <FontAwesomeIcon icon={faTrophy} className="text-amarelo text-3xl" />
      </div>
      <div className="h-auto max-w-[360px] bg-roxo-500 px-4 py-2 shadow-default-roxo-500">
        {Children.children}
      </div>
    </div>
  )
}
