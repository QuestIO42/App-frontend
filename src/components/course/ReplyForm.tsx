import { useState, useEffect } from 'react';
import Button from '@/components/utility/Button';
import { createPost } from '@/services/api/post';
import { useAuth } from '@/hooks/useAuth';
import { Post } from '@/interfaces/Post';

interface ReplyFormProps {
  parentId: string;
  onReplyCreated: (newReply: Post) => void;
  onClose: () => void;
  courseId?: string;
  questionId?: string;
  quizId?: string;
}

export default function ReplyForm({ parentId, onReplyCreated, onClose, courseId, questionId, quizId  }: ReplyFormProps) {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!courseId && !questionId) {
      console.error("ReplyForm requer 'courseId' ou 'questionId'.");
    }
  }, [courseId, questionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content) {
      setError('O conteúdo da resposta não pode estar vazio.');
      return;
    }
    if (!user) {
      setError('Você precisa estar logado para responder.');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const payload: any = {
        title: 'Resposta',
        content,
        id_user: user.id.toString(),
        id_parent: parentId,
      };

      if (courseId) {
        payload.id_course = courseId;
      } else if (questionId) {
        payload.id_question = questionId;
      }

      const createdReply = await createPost(payload, { quizId });
      onReplyCreated(createdReply);
      onClose();

    } catch (apiError) {
      setError('Falha ao enviar a resposta. Tente novamente.');
      console.error(apiError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
       <div className="bg-white p-8 rounded-lg shadow-2xl w-full max-w-2xl shadow-default-preto">
        <h2 className="text-2xl font-bold text-cinza mb-6 underline">Responder ao Tópico</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="content" className="block text-cinza font-bold mb-2">Sua Resposta</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full p-2 border border-gray-300 rounded-md shadow-default-cinza focus:ring-2 focus:ring-laranja focus:border-transparent"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={onClose} text="Cancelar" disabled={isSubmitting} />
            <Button type="submit" variant="primary" text={isSubmitting ? 'Enviando...' : 'Publicar'} disabled={isSubmitting} />
          </div>
        </form>
      </div>
    </div>
  );
}
