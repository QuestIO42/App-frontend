import { Post } from '@/interfaces/Post';
import { useEffect, useState } from 'react';
import { getUser } from '@/services/api/user';
import { User } from '@/interfaces/User';
import PostItem from './PostItemCourse';
import Button from '../utility/Button';

interface PostThreadProps {
  post: Post;
  replies: Post[];
  onReply: (postId: string) => void;
}

function ReplyItem({ post }: { post: Post }) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function fetchUser() {
      const userData = await getUser(post.id_user);
      setUser(userData);
    }
    fetchUser();
  }, [post.id_user]);

  return (
    <div className="bg-gray-200/50 p-6 border border-gray-200">
      <div className="flex flex-row items-center justify-between text-gray-400 text-sm">
        { user &&
          <p >{user.username}</p>
        }

        <p>{new Date(post.creation_date).toLocaleDateString('pt-BR')}</p>
      </div>

      <p className="text-black mt-3">{post.content}</p>
    </div>
  );
}

export default function PostThread({ post, replies, onReply }: PostThreadProps) {
  return (
    <div className="mb-16">
      <PostItem post={post} />

      {replies.length > 0 && (
        <div className="mt-4 pl-8 space-y-4">
          {replies.map(reply => (
            <ReplyItem key={reply.id} post={reply} />
          ))}
        </div>
      )}

      <div className="flex justify-end mt-4 px-2">
        <Button
          variant="tertiary"
          size="medium"
          text="Responder"
          className="border-laranja py-2 text-[#754011] bg-laranja shadow-default-laranja"
          onClick={() => onReply(post.id)}
        />
      </div>
    </div>
  );
}
