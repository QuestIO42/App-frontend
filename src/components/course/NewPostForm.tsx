import { useState, useEffect } from 'react';
import Button from '@/components/utility/Button';
import { createPost } from '@/services/api/post';
import { useAuth } from '@/hooks/useAuth';
import { Post } from '@/interfaces/Post';

interface NewPostFormProps {
  onPostCreated: (newPost: Post) => void;
  onClose: () => void;
  courseId?: string; // Opcional
  questionId?: string; // Opcional
}

export default function NewPostForm({ onPostCreated, onClose, courseId, questionId }: NewPostFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Validação para garantir que o componente é usado corretamente
    if (!courseId && !questionId) {
      console.error("NewPostForm requer 'courseId' ou 'questionId'.");
    }
  }, [courseId, questionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setError('O título e o conteúdo são obrigatórios.');
      return;
    }
    if (!user) {
      setError('Você precisa estar logado para criar um post.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    try {
      const payload: any = {
        title,
        content,
        id_user: user.id.toString(),
      };

      if (courseId) {
        payload.id_course = courseId;
      } else if (questionId) {
        payload.id_question = questionId;
      }
      
      const createdPost = await createPost(payload);
      onPostCreated(createdPost);
      onClose();

    } catch (apiError) {
      setError('Falha ao criar o post. Tente novamente.');
      console.error(apiError);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 w-full max-w-2xl shadow-default-preto">
        <h2 className="text-2xl font-bold text-cinza mb-6 underline">Criar Novo Tópico</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-cinza font-bold mb-2">Título</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 shadow-default-cinza"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="content" className="block text-cinza font-bold mb-2">Conteúdo</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="w-full p-2 border border-gray-300 shadow-default-cinza"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex justify-end gap-4">
            <Button type="button" variant="secondary" onClick={onClose} text="Cancelar" disabled={isSubmitting} />
            <Button type="submit" variant="primary" text={isSubmitting ? 'Publicando...' : 'Publicar'} disabled={isSubmitting} />
          </div>
        </form>
      </div>
    </div>
  );
}