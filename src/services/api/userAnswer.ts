import {api} from './api'

// Interface para o corpo da requisição POST
interface PostUserAnswerPayload {
  id_user: string;
  id_quiz: string;
  id_question: string;
  id_answer: string;
  text_answer: string;
}

// Interface para o corpo da requisição PUT
interface PutUserAnswerPayload {
  id_answer: string;   // Novo ID da opção (múltipla escolha) ou "" (aberta)
  text_answer: string; // Novo texto (aberta) ou "" (múltipla escolha)
}

// Pegar respostas do questionario
const getUserAnswer = async (quizId: string) => {
  const response = await api.get(`/userquizquestionanswer/quiz/${quizId}`);
  return response.data;
}

// Pegar resposta de questão
const getUserAnswerbyQuestion = async (quizId: string, id_question: string) => {
  const response = await api.get(`/userquizquestionanswer/quizquestion/${quizId}/${id_question}`)
  return response.data
}

// Pegar resposta específica pelo ID da resposta
const getUserAnswerById = async (id_answer: string) => {
  const response = await api.get(`/userquizquestionanswer/${id_answer}`);
  return response.data;
};

// Enviar resposta
const postUserAnswer = async (payload: PostUserAnswerPayload) => {
  const response = await api.post(`/userquizquestionanswer/`, payload);
  return response.data;
};


// Atualizar resposta
const putUserAnswer = async (
  id_user_answer_instance: string,
  payload: PutUserAnswerPayload
) => {
  const response = await api.put(`/userquizquestionanswer/${id_user_answer_instance}`, payload);
  return response.data;
};

// Deletar resposta
const deleteUserAnswer = async (id_answer: string) => { // ID da resposta específica a ser deletada
  const response = await api.delete(`/userquizquestionanswer/${id_answer}`);
  return response.data;
};

export {getUserAnswer, getUserAnswerbyQuestion, getUserAnswerById, postUserAnswer, putUserAnswer, deleteUserAnswer}
