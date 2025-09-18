import { Post } from '@/interfaces/Post';
import { useEffect, useState } from 'react';
import { getUser } from '@/services/api/user';
import { User } from '@/interfaces/User';
import Button from '../../utility/Button';

// Um componente simples para o item do post
function PostItemQuiz({ post, user }: { post: Post; user?: User }) {
  return (
    <div className="">
      <div className="flex flex-row items-center justify-between text-gray-400 text-sm">
        { user &&
          <p >{user.username}</p>
        }

        <p>{new Date(post.creation_date).toLocaleDateString()}</p>
      </div>
      <h4 className="font-bold text-gray-800 mb-2 mt-3">{post.title}</h4>
      <p className="text-cinza text-sm">{post.content}</p>
    </div>
  );
}

// Um componente simples para a resposta
function ReplyItem({ post, user }: { post: Post; user?: User }) {
  return (
    <div className="bg-gray-100 p-4 shadow-inner">
      <div className="flex flex-row items-center justify-between text-gray-400 text-sm">
        { user &&
          <p >{user.username}</p>
        }

        <p>{new Date(post.creation_date).toLocaleDateString()}</p>
      </div>
      <p className="text-cinza text-sm mt-3">{post.content}</p>

    </div>
  );
}

interface PostThreadQuizProps {
  post: Post;
  replies: Post[];
  onReply: (postId: string) => void;
}

export default function PostThreadQuiz({ post, replies, onReply }: PostThreadQuizProps) {
  const [users, setUsers] = useState<Record<string, User>>({});

  useEffect(() => {
      async function fetchUsers() {
        const postIds = [post.id_user, ...replies.map(r => r.id_user)];
        const uniqueIds = Array.from(new Set(postIds));

        const usersData: Record<string, User> = {};
        await Promise.all(
          uniqueIds.map(async (id) => {
            const userData = await getUser(id);
            usersData[id] = userData;
          })
        );
        setUsers(usersData);
      }

      fetchUsers();
    }, [post, replies]);

  return (
    <div className="bg-white p-4 shadow-md mb-4 border border-gray-200">
      <PostItemQuiz post={post} user={users[post.id_user]}/>

      {replies.length > 0 && (
        <div className="mt-6 pl-4 border-l-2 border-purple-300 space-y-2">
          {replies.map(reply => (
            <ReplyItem key={reply.id} post={reply} user={users[post.id_user]}/>
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
