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
      'iframe', 'h1', 'h2', 'h3', 'h4', 'blockquote'
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      iframe: ['src', 'width', 'height', 'allow', 'allowfullscreen', 'frameborder'],
    },
    allowedSchemes: ['http', 'https'],
    // Só permite iframe de YouTube
    allowedIframeHostnames: ['www.youtube.com'],
  });

  return(
    <div className="flex flex-col w-full gap-2">
      <h3 className="text-3xl font-bold mb-2">{title}</h3>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
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
        }}
      >
        {sanitizedText}
      </ReactMarkdown>
    </div>
  )
}
