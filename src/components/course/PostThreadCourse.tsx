import { Post } from '@/interfaces/Post';
import PostItem from './PostItemCourse';
import Button from '../utility/Button';

interface PostThreadProps {
  post: Post;
  replies: Post[];
  onReply: (postId: string) => void;
}

function ReplyItem({ post }: { post: Post }) {
  return (
    <div className="bg-gray-200 p-3 shadow-default-cinza-300">
      <p className="text-gray-800">{post.content}</p>
      <div className="text-xs text-gray-600 mt-2">
        <span>Respondido em: {new Date(post.creation_date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}


export default function PostThread({ post, replies, onReply }: PostThreadProps) {
  return (
    <div className="bg-white p-4 mb-6">
      {/* Renderiza o Post Principal */}
      <PostItem post={post} />

      {/* --- 2. Adicionar Botão de Resposta --- */}
      <div className="flex justify-end mt-2">
        <Button
          variant="tertiary"
          size="small"
          text="Responder"
          onClick={() => onReply(post.id)} // Dispara a função passando o ID do post pai
        />
      </div>

      {/* Renderiza as respostas aninhadas */}
      {replies.length > 0 && (
        <div className="mt-4 pl-8 space-y-3">
          {replies.map(reply => (
            <ReplyItem key={reply.id} post={reply} />
          ))}
        </div>
      )}
    </div>
  );
}