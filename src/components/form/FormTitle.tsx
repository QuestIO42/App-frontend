interface FormTitleProps {
  title: string
}

export default function FormTitle({ title }: FormTitleProps) {
  return (
    <h1 className="mr-auto text-2xl font-bold leading-8 text-preto-texto sm:mt-5 sm:text-[25px] sm:leading-9 md:mt-6 md:text-3xl md:leading-10 lg:text-5xl">
      {title}
    </h1>
  )
}
