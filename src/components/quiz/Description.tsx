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
      return 'bg-roxo-300 shadow-default-roxo-description text-amarelo'
    case 'default': {
      return 'bg-cinza shadow-default-cinza text-preto'
  }
}
  }
  return (
    <div className={`flex flex-col align-center justify-center items-start gap-4 px-10 py-6 sm:w-[380px] md:w-[480px] lg:w-[766px] max-w-[766px] ${getVariant(variant)}`}>
      <p className={`text-1xl font-bold break-words`}>{text}</p>
    </div>
  )

}
