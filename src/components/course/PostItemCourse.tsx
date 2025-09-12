import { Post } from '@/interfaces/Post';
import { User } from '@/interfaces/User';
import { getUser } from '@/services/api/user';
import { useEffect, useState } from 'react';

interface PostItemCourseProps {
  post: Post;
}

export default function PostItemCourse({ post }: PostItemCourseProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUser(post.id_user);
      setUser(userData);
    }
    fetchUser();
  }, [post.id_user]);

  return (
    <div className="bg-white p-6 w-full border border-gray-200">
      { user &&
        <p className="text-gray-400">{user.username}</p>
      }

      <h3 className="flex flex-wrap text-xl font-bold text-black pb-2 mt-4 border-b border-gray-200">{post.title}</h3>
      <p className="text-cinza mt-2">{post.content}</p>

      <div className="text-sm text-laranja mt-6 flex justify-start items-center">
        <span>{new Date(post.creation_date).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
