import {api} from './api'

// Pegar respostas do questionario
const getUserAnswer = async (id_quiz: string) => {
  const response = await api.get(`/userquizquestionanswer/quiz/${id_quiz}`)
  return response.data
}

// Pegar resposta de questão
const getUserAnswerbyQuestion = async (id_quiz: string, id_question: string) => {
  const response = await api.get(`/userquizquestionanswer/quizquestion/${id_quiz}/${id_question}`)
  return response.data
}

// Enviar resposta
const postUserAnswer = async (
  id_user: string,
  id_quiz: string,
  id_question: string,
  id_answer?: string,
  text_answer?: number
) => {
  const response = await api.post(`/userquizquestionanswer/`, {
    userId: id_user,
    id_quiz,
    id_question,
    id_answer,
    text_answer,
  });
  return response.data;
};

// Atualizar resposta
const putUserAnswer = async (
  id_user: string,
  id_quiz: string,
  id_question: string,
  answer?: string,
  value?: number
) => {
  const response = await api.put(`/userquizquestionanswer/${id_quiz}`, {
    userId: id_user,
    id_question,
    answer,
    value,
  });
  return response.data;
};

// Deletar resposta
const deleteUserAnswer = async (id_question: string) => {
  const response = await api.delete(`/userquizquestionanswer/${id_question}`)
  return response.data
}

export {getUserAnswer, getUserAnswerbyQuestion, postUserAnswer, putUserAnswer, deleteUserAnswer}
