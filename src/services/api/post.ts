import { api } from './api';
import { Post } from '@/interfaces/Post';

export const fetchPostsByCourse = async (courseId: string): Promise<Post[]> => {
  try {
    const response = await api.get(`/post/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch posts for course ${courseId}:`, error);
    throw error;
  }
};

export const fetchPostsByQuestion = async (questionId: string, quizId: string): Promise<Post[]> => {
  try {
    const response = await api.get(`/post/question/${questionId}?id_quiz=${quizId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch posts for question ${questionId}:`, error);
    throw error;
  }
};

export const createPost = async (postData: Partial<Post>, context?: { quizId?: string }): Promise<Post> => {
  try {
    let url = '/post';
    const bodyData = { ...postData };

    if (bodyData.id_course) {
      url = `/post`;
    } else if (bodyData.id_question && context?.quizId) {
      url = `/post?id_quiz=${context.quizId}`; 
    }
    
    const response = await api.post(url, bodyData);
    return response.data;

  } catch (error) {
    console.error('Failed to create post:', error);
    throw error;
  }
};