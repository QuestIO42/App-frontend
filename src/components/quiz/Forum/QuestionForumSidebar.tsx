import { useState } from 'react';
import { Post } from '@/interfaces/Post';
import PostThreadQuiz from './PostThreadQuiz';
import Button from '../../utility/Button';
import NewPostForm from '../../course/NewPostForm';
import ReplyForm from '../../course/ReplyForm';

interface QuestionForumSidebarProps {
  questionId: string | null;
  posts: Post[];
  onPostCreated: (newPost: Post) => void;
  onClose: () => void;
  quizId?: string;
}

export default function QuestionForumSidebar({ questionId, posts, onPostCreated, onClose, quizId }: QuestionForumSidebarProps) {
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [replyingToPostId, setReplyingToPostId] = useState<string | null>(null);

  if (!questionId) {
    return (
      <div className="sticky top-24 w-full h-[70vh] bg-white border-l border-gray-200 p-4 flex items-center justify-center rounded-lg shadow-lg">
        <p className="text-gray-500 text-center">Clique em uma questão para ver ou iniciar uma discussão.</p>
      </div>
    );
  }

  const questionPosts = posts.filter(p => p.id_question === questionId);
  const topLevelPosts = questionPosts.filter(p => p.id_parent === null);
  const replies = questionPosts.filter(p => p.id_parent !== null);
  const getRepliesForPost = (postId: string) => replies.filter(reply => reply.id_parent === postId);

  return (
    <aside className="sticky mt-3 top-24 w-full h-[80vh] bg-gray-50 border-l border-gray-200 p-8 shadow-lg flex flex-col">
      {isCreatingPost && (
        <NewPostForm
          questionId={questionId}
          quizId={quizId}
          onClose={() => setIsCreatingPost(false)}
          onPostCreated={(newPost) => {
            onPostCreated(newPost);
            setIsCreatingPost(false);
          }}
        />
      )}
      {replyingToPostId && (
        <ReplyForm
          parentId={replyingToPostId}
          questionId={questionId}
          quizId={quizId}
          onClose={() => setReplyingToPostId(null)}
          onReplyCreated={(newReply) => {
            onPostCreated(newReply);
            setReplyingToPostId(null);
          }}
        />
      )}

      <div className="flex flex-col flex-wrap justify-center items-start mb-8">
        <h3 className="w-full text-xl font-bold text-black pb-2 mb-5 border-b">Discussão</h3>

        <div className="flex gap-6">
          <Button variant="primary" text="Novo Post" onClick={() => setIsCreatingPost(true)} className="text-sm" />
          <Button variant="quaternary" text="Fechar" onClick={onClose} className="text-sm" />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto">
        {topLevelPosts.length > 0 ? (
          topLevelPosts.map(post => (
            <PostThreadQuiz
              key={post.id}
              post={post}
              replies={getRepliesForPost(post.id)}
              onReply={setReplyingToPostId}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <p>Nenhuma discussão para esta questão ainda.</p>
            <p className="font-semibold">Seja o primeiro a perguntar!</p>
          </div>
        )}
      </div>
    </aside>
  );
}
