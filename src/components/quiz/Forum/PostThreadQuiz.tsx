import { Post } from '@/interfaces/Post';
import Button from '../../utility/Button';

// Um componente simples para o item do post
function PostItemQuiz({ post }: { post: Post }) {
  return (
    <div className="bg-white p-3 shadow-sm mb-2 border border-gray-200 rounded-md">
      <h4 className="font-bold text-gray-800">{post.title}</h4>
      <p className="text-gray-700 text-sm mt-1">{post.content}</p>
      <div className="text-xs text-gray-500 mt-2">
        <span>Postado em: {new Date(post.creation_date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

// Um componente simples para a resposta
function ReplyItem({ post }: { post: Post }) {
  return (
    <div className="bg-gray-100 p-2 rounded-md shadow-inner">
      <p className="text-gray-800 text-sm">{post.content}</p>
      <div className="text-xs text-gray-500 mt-1">
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
    <div className="bg-white p-3 rounded-lg shadow-md mb-4 border border-gray-200">
      <PostItemQuiz post={post} />
      <div className="flex justify-end mt-1">
        <Button
          variant="tertiary"
          size="small"
          text="Responder"
          className="text-xs py-1 px-2"
          onClick={() => onReply(post.id)}
        />
      </div>
      {replies.length > 0 && (
        <div className="mt-3 pl-4 border-l-2 border-purple-300 space-y-2">
          {replies.map(reply => (
            <ReplyItem key={reply.id} post={reply} />
          ))}
        </div>
      )}
    </div>
  );
}