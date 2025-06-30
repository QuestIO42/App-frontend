import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw';
import sanitizeHtml from 'sanitize-html';

interface ParagraphProps {
  title: string
  text: string
}

export default function Paragraph({title, text} : ParagraphProps) {
  // Sanitiza o conteúdo
  const sanitizedText = sanitizeHtml(text, {
    allowedTags: [
      'b', 'i', 'em', 'strong', 'a', 'p', 'ul', 'ol', 'li', 'code', 'pre', 'br',
      'iframe', 'h1', 'h2', 'h3', 'h4', 'blockquote', 'img'
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder'],
      img: ['src', 'alt', 'width', 'height', 'style', 'class'],
      code: ['class'],
      pre: ['class'],
    },
    allowedSchemes: ['http', 'https'],
    allowedIframeHostnames: ['www.youtube.com'],
  });

  return(
    <div className="flex flex-col w-full gap-2">
      <h3 className="text-3xl font-bold mb-2">{title}</h3>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl text-cinza font-bold mb-3">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl text-cinza font-bold mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl text-cinza font-bold mb-1">{children}</h3>,
          p: ({ children }) => <p className="text-cinza">{children}</p>,
          iframe: ({ node, ...props }) => (
            <div className="w-full my-4 max-w-4xl aspect-video self-center">
              <iframe
                {...props}
                className="w-full h-full rounded-md border"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ),
          img: ({ node, ...props }) => (
              <img
                  {...props}
                  // Exemplo de estilos/classes customizadas:
                  className="max-w-full h-auto rounded-md my-4 self-center"
              />
          ),
          ul: ({ children }) => (
            <ul className="list-disc pl-12 space-y-1 text-cinza">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-12 space-y-1 text-cinza">
              {children}
            </ol>
          ),
          code: ({node, className, children, ...props}) => {
            return (
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            ) 
          },
        }}
      >
        {sanitizedText}
      </ReactMarkdown>
    </div>
  )
}
