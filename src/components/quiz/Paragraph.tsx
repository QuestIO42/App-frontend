import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface ParagraphProps {
  title: string
  text: string
}

export default function Paragraph({title, text} : ParagraphProps) {
  return(
    <div className="flex flex-col gap-2">
      <h2 className="text-4xl font-bold text-cinza">{title}</h2>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="text-cinza">{children}</p>,
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}
