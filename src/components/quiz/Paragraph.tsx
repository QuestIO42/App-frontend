import { ReactNode } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize'

interface ParagraphProps {
  title: string
  text: string
}

interface CustomCodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: ReactNode;
}

const sanitizeSchema = {
  ...defaultSchema,
  tagNames: [
    ...defaultSchema.tagNames ?? [],
    'iframe', 'img', 'video'
  ],
  attributes: {
    ...defaultSchema.attributes,
    img: ['src', 'alt', 'title', 'width', 'height', 'class'],
    iframe: ['src', 'width', 'height', 'allowfullscreen', 'frameborder'],
    '*': ['class', 'id'],
    code: [['className', /^language-./]],
  },
  protocols: {
    ...(defaultSchema.protocols ?? {}),
    src: ['https'],
    iframe: {
      src: ['https://www.youtube.com', 'https://youtube-nocookie.com']
    }
  }
}

export default function Paragraph({ title, text }: ParagraphProps) {
  return (
    <div className="flex flex-col w-full gap-2">
      <h3 className="text-3xl font-bold mb-2">{title}</h3>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeSchema]]}
        components={{
          h1: ({ children }) => <h1 className="text-3xl text-cinza font-bold mb-3">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl text-cinza font-bold mb-2">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl text-cinza font-bold mb-1">{children}</h3>,
          p: ({ children }) => <p className="text-cinza">{children}</p>,
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {children}
            </a>
          ),
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
            <img {...props} className="max-w-full h-auto rounded-md my-4 self-center" />
          ),
          ul: ({ children }) => <ul className="list-disc pl-12 space-y-1 text-cinza">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-12 space-y-1 text-cinza">{children}</ol>,
          code: ({ node, inline, className, children, ...props }: CustomCodeProps) => {
            const match = /language-(\w+)/.exec(className || '')
            if (!inline && match) {
              return (
                <pre className="bg-gray-100 p-4 rounded-md overflow-auto my-4">
                  <code className={className} {...props}>
                    {children}
                  </code>
                </pre>
              )
            }
            return (
              <code className="bg-gray-200 text-red-600 font-mono px-1 rounded" {...props}>
                {children}
              </code>
            )
          },
        }}
      >
        {text}
      </ReactMarkdown>
    </div>
  )
}
