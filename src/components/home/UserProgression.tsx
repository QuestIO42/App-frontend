import ProgressXpBar from './ProgressXpBar'
import ProgressCircle from './ProgressXpCircle'

interface UserProgressionProps {
  username?: string
}
/* Os valores serão dados obtidos do usuario pela chama da api */

export default function UserProgression({ username }: UserProgressionProps) {
  return (
    <div className="grid h-40 w-[558px] grid-cols-2 border-4 border-preto-default bg-branco p-4 shadow-default-preto">
      <div className="flex flex-col">
        <h2 className="text-xl center font-bold">olá {username} !</h2>
        <ProgressXpBar value={75}></ProgressXpBar>
      </div>
      <div className="ml-auto flex-col items-center">
        <ProgressCircle level={1} progress={75}></ProgressCircle>
      </div>
    </div>
  )
}
