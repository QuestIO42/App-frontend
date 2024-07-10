export default function ProgressXpBar() {
  return (
    <div className="mt-2 flex flex-col items-center justify-center gap-3">
      <p className="mr-auto">xp</p>
      <div className="h-2.5 w-full rounded-full border-2 border-preto bg-gray-200">
        <div
          className="h-1.5 rounded-full bg-orange-500"
          style={{ width: `${10}%` }}
        ></div>
      </div>
      <div className="ml-auto text-right text-sm">{2}%</div>
    </div>
  )
}
