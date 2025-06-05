interface ErrorMessageProps {
  error?: string
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
  return (
    <div className="mr-auto text-[0.9rem] text-red-500 md:text-xs">{error}</div>
  )
}
