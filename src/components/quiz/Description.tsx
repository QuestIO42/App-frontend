interface DescriptionProps {
  variant?: 'orange' | 'purple' | 'green'
  text: string
}

export default function Description({variant, text} : DescriptionProps) {
  const getVariant=(variant :any) => {
  switch(variant) {
    case 'orange':
      return 'bg-laranja shadow-default-laranja text-cinza-900'
    case 'green':
      return 'bg-verde-300 shadow-default-verde-900 text-cinza-900'
    case 'purple':
      return 'bg-[#f8f7ff] border border-[#bab1fc] text-roxo-500'
    case 'default': {
      return 'bg-cinza shadow-default-cinza text-preto'
  }
}
  }
  return (
    <div className={`flex flex-col justify-center items-start gap-4 p-8 w-full max-w-[1000px] ${getVariant(variant)}`}>
      <p className={`text-base break-words`}>{text}</p>
    </div>
  )

}
