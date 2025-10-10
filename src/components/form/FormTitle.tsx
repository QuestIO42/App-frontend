interface FormTitleProps {
  title: string
}

export default function FormTitle({ title }: FormTitleProps) {
  return (
    <h1 className="mr-auto text-3xl font-bold text-roxo-900 lg:text-5xl">
      {title}
    </h1>
  )
}
