import { Post } from '@/interfaces/Post';

interface PostItemQuizProps {
  post: Post;
}

export default function PostItemQuiz({ post }: PostItemQuizProps) {
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