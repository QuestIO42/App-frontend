import { Post } from '@/interfaces/Post';

interface PostItemCourseProps {
  post: Post;
}

export default function PostItemCourse({ post }: PostItemCourseProps) {
  return (
    <div className="bg-white p-4 shadow-default-cinza mb-4 w-full border border-gray-200">
      <h3 className="text-xl font-bold text-cinza-800">{post.title}</h3>
      <p className="text-cinza-600 mt-2">{post.content}</p>
      <div className="text-sm text-cinza-500 mt-4 flex justify-between items-center">
        <span>Postado em: {new Date(post.creation_date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}