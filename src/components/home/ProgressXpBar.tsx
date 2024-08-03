interface ProgressXpBarProps {
  value: number
}

export default function ProgressXpBar({ value }: ProgressXpBarProps) {
  return (
    <div className="mt-2 flex flex-col items-center justify-center gap-3">
      <p className="mr-auto">xp</p>
      <div
        className="bg-gray-20 h-4 w-full border-2 border-preto-default" /* uma div pra caixa*/
      >
        <div className="h-full bg-laranja" style={{ width: `${value}%` }}></div>{' '}
        {/* uma div pra barra de progresso*/}
      </div>

      <div className="ml-auto text-right text-sm">{value}%</div>
    </div>
  )
}
