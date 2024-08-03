import ProgressXpBar from '../home/ProgressXpBar'
import ProgressXpCircle from '../home/ProgressXpCircle'
import UserRank from './UserRank'

interface UserStatisticsProps {
  username?: string
}

export default function UserStatistics({ username }: UserStatisticsProps) {
  return (
    <aside className="flex h-auto flex-col items-center justify-center border-4 border-preto-default bg-branco p-4 shadow-default-preto md:min-w-[25rem]">
      <h2 className="center text-2xl font-bold">estatísticas</h2>

      <div className="flex w-2/3 flex-col justify-center">
        <ProgressXpCircle level={1} progress={50}></ProgressXpCircle>
        <ProgressXpBar value={75}></ProgressXpBar>
        <UserRank></UserRank>
      </div>
    </aside>
  )
}
