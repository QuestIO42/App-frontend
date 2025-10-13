interface FormTitleProps {
  title: string
}

export default function FormTitle({ title }: FormTitleProps) {
  return (
    <h1 className="mr-auto text-3xl sm:text-4xl font-bold text-roxo-900">
      {title}
    </h1>
  )
}
