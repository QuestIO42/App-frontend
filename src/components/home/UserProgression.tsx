import ProgressXpBar from './ProgressXpBar'
import ProgressCircle from './ProgressXpCircle'

export default function UserProgression() {
  return (
    <div className="grid h-40 w-[558px] grid-cols-2 rounded-lg border-4 border-preto-default bg-branco p-4 shadow-default-preto">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">olá, Usuário!</h2>
        <ProgressXpBar value={100}></ProgressXpBar>
      </div>
      <div className="ml-auto flex items-center">
        <ProgressCircle percentage={50}></ProgressCircle>
      </div>
    </div>
  )
}
