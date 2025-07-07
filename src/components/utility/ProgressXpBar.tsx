interface ProgressXpBarProps {
  value: number
  text: string
}

export default function ProgressXpBar({ value, text  }: ProgressXpBarProps) {
  return (
    <div className="mt-2 flex flex-col items-center justify-center gap-1">
      <p className="mr-auto font-bold text-cinzaClaro">{text}</p>
      <div
        className="bg-gray-20 h-4 w-full border-2 border-preto-default" /* uma div pra caixa*/
      >
        <div className="h-full bg-laranja" style={{ width: `75%` }}></div>{' '}
        {/* uma div pra barra de progresso*/}
      </div>

      <div className="ml-auto text-right text-sm font-bold text-cinzaClaro">{value}</div>
    </div>
  )
}
