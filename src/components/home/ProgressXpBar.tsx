interface ProgressXpBarProps {
  value: number
}

export default function ProgressXpBar({ value }: ProgressXpBarProps) {
  return (
    <div className="mt-2 flex flex-col items-center justify-center gap-3">
      <p className="mr-auto">xp</p>
      <progress
        className="bg-gray-20 h-4 w-full rounded-full border-2 border-preto-default progress-filled:bg-laranja"
        max={100}
        value={value}
      ></progress>

      <div className="ml-auto text-right text-sm">{value}%</div>
    </div>
  )
}
