import { Post } from '@/interfaces/Post';
import Button from '../../utility/Button';

// Um componente simples para o item do post
function PostItemQuiz({ post }: { post: Post }) {
  return (
    <div className="">
      <h4 className="font-bold text-gray-800 mb-2">{post.title}</h4>
      <p className="text-cinza text-sm">{post.content}</p>
      <div className="text-sm text-gray-400 mt-4">
        <span>Postado em: {new Date(post.creation_date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

// Um componente simples para a resposta
function ReplyItem({ post }: { post: Post }) {
  return (
    <div className="bg-gray-100 p-4 shadow-inner">
      <p className="text-cinza text-sm">{post.content}</p>
      <div className="text-sm text-gray-400 mt-4">
        <span>Respondido em: {new Date(post.creation_date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

interface PostThreadQuizProps {
  post: Post;
  replies: Post[];
  onReply: (postId: string) => void;
}

export default function PostThreadQuiz({ post, replies, onReply }: PostThreadQuizProps) {
  return (
    <div className="bg-white p-4 shadow-md mb-4 border border-gray-200">
      <PostItemQuiz post={post} />

      {replies.length > 0 && (
        <div className="mt-6 pl-4 border-l-2 border-purple-300 space-y-2">
          {replies.map(reply => (
            <ReplyItem key={reply.id} post={reply} />
          ))}
        </div>
      )}

      <div className="flex justify-end my-3 mr-2">
        <Button
          variant="primary"
          size="small"
          text="Responder"
          className="text-sm"
          onClick={() => onReply(post.id)}
        />
      </div>
    </div>
  );
}
