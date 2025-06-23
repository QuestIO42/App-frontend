import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw' // <-- Adicione esta linha

interface ParagraphProps {
  title: string
  text: string
}

export default function Paragraph({title, text} : ParagraphProps) {
  return(
    <div className="flex flex-col gap-2">
      <h2 className="text-4xl font-bold text-cinza">{title}</h2>
      <div className="ml-1 text-1xl text-cinza-900 prose prose-sm max-w-none"> {/* Pode usar suas classes aqui */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]} // <-- Adicione esta linha
        >
          {text}
        </ReactMarkdown>
      </div>
    </div>
  )
}