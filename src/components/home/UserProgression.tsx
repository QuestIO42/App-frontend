import ProgressXpBar from '../utility/ProgressXpBar'
import ProgressXpCircle from '../utility/ProgressXpCircle'

interface UserProgressionProps {
  username?: string
}

export default function UserProgression({ username }: UserProgressionProps) {
  return (
    <div className="grid h-40 w-[558px] grid-cols-2 border-4 border-preto-default bg-branco p-4 shadow-default-preto">
      <div className="flex flex-col">
        <h2 className="center text-xl font-bold">olá {username} !</h2>
        <ProgressXpBar value={75}></ProgressXpBar>
      </div>
      <div className="ml-auto flex items-center justify-center">
        <ProgressXpCircle level={1} progress={50}></ProgressXpCircle>
      </div>
    </div>
  )
}
