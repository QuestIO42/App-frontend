import {api} from './api'

const fetchAllQuizes = async (id: string) => {
  const response = await api.get(`/quiz/course/${id}`)
  return response.data
}

const fetchQuizQuestion = async (id: string) => {
  const response = await api.get(`/quiz/${id}`) //Retorna todas questões de um quiz
  return response.data.questions;
}

const fetchQuestion = async (id: string[]) => {
  const iterators = id.map(id => api.get(`/question/${id}`));
  const responses = await Promise.all(iterators);
  return responses.map(response => response.data);
}

const fetchRemainingTries = async (id: string) => {
  const response = await api.get(`/quiz/remainingtries/${id}`);
  return response.data;
}

export const fetchUserQuizProgress = async (quizId: string, userId: string) => {
  try {
    const response = await api.get(`/userquizquestionanswer/quiz/${quizId}`, {
      params: { id_user: userId }
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch user progress for quiz ${quizId}:`, error);
    return { user_max_score: 0, quiz_max_score: 0 };
  }
};

export {fetchAllQuizes, fetchQuizQuestion, fetchQuestion, fetchRemainingTries}
