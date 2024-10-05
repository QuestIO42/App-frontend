import ProgressXpBar from '../utility/ProgressXpBar'
import ProgressXpCircle from '../utility/ProgressXpCircle'

interface UserProgressionProps {
  username?: string
}

export default function UserProgression({ username }: UserProgressionProps) {
  return (
    <div className="grid min-h-[193px] min-w-[558px] grid-cols-2 border-4 border-preto-default bg-branco pt-5 pb-3 pl-12 pr-0 shadow-default-preto">
      <div className="flex flex-col">
        <h2 className="center text-4xl font-bold text-cinza">olá, {username}!</h2>
        <ProgressXpBar text="xp" value={75}></ProgressXpBar>
      </div>
      <div className="ml-auto flex  items-center justify-center">
        <ProgressXpCircle level={1} progress={75}></ProgressXpCircle>
      </div>
    </div>
  )
}
