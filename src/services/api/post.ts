import { api } from './api';
import { NewPostData, Post } from '@/interfaces/Post';

export const fetchPostsByCourse = async (courseId: string): Promise<Post[]> => {
  try {
    const response = await api.get(`/post/course/${courseId}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch posts for course ${courseId}:`, error);
    throw error;
  }
};

export const createPost = async (postData: NewPostData): Promise<Post> => {
  try {
    const response = await api.post('/post/', postData);
    return response.data;
  } catch (error) {
    console.error('Failed to create post:', error);
    throw error;
  }
};