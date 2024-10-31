import ProgressXpBar from '../utility/ProgressXpBar'
import ProgressXpCircle from '../utility/ProgressXpCircle'
import UserRank from './UserRank'

/* interface UserStatisticsProps {
  username?: string
} */

export default function UserStatistics() {
  return (
    <aside className="flex h-auto flex-col items-center justify-center border-4 border-preto-default bg-branco p-4 shadow-default-preto md:min-w-[25rem] gap-3">
      <h2 className="center text-4xl font-bold text-cinza">estatísticas</h2>

      <div className="flex  w-2/3 mt-4 flex-col justify-center gap-3">
        <ProgressXpCircle level={1} progress={70}></ProgressXpCircle>
        <ProgressXpBar text="xp" value={75}></ProgressXpBar>
        <UserRank></UserRank>
      </div>
    </aside>
  )
}
