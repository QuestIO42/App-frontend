interface ParagraphProps {
  title: string
  text: string
}

export default function Paragraph({title, text} : ParagraphProps) {
  return(
    <div className="flex flex-col gap-4">
      <h2 className="text-4xl font-bold text-preto">{title}</h2>
      <p className="text-2xl text-cinza">{text}</p>
    </div>
  )

}
