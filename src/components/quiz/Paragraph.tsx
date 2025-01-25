interface ParagraphProps {
  title: string
  text: string
}

export default function Paragraph({title, text} : ParagraphProps) {
  return(
    <div className="flex flex-col gap-2">
      <h2 className="text-4xl font-bold text-cinza">{title}</h2>
      <p className=" ml-1 text-1xl text-cinza-900">{text}</p>
    </div>
  )

}
