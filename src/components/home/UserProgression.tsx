import ProgressXpBar from './ProgressXpBar'
import ProgressXpSpinner from './ProgressXpSpinner'

export default function UserProgression() {
  return (
    <div className="flex h-40 w-[558px] items-center justify-between rounded-lg border-4 border-preto bg-branco p-4 shadow-default-black">
      <div className="flex flex-col">
        <h2 className="text-xl font-bold">olá, Usuário!</h2>
        <ProgressXpBar></ProgressXpBar>
      </div>
      <ProgressXpSpinner></ProgressXpSpinner>
    </div>
  )
}
