interface ProgressXpBarProps {
  value: number
  text: string
  progress: number
  maxValue: number
}

export default function ProgressXpBar({ value, text, progress, maxValue }: ProgressXpBarProps) {
  return (
    <div className="my-2 flex flex-col items-center justify-center gap-2">
      <p className="mr-auto font-bold text-gray-400">{text}</p>
      <div className="bg-white h-4 w-full border-2 border-gray-300">
        <div className="h-full bg-laranja" style={{ width: `${progress}%` }}></div>{' '}
      </div>

      <div className="ml-auto text-right text-sm font-bold text-gray-400">{value}/{maxValue}</div>
    </div>
  )
}
