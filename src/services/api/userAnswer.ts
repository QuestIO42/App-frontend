import {api} from './api'

const getUserAnswer = async (id_user: string) => {
  const response = await api.get(`/userquiz/${id_user}`) //Obtem todos os questionarios de um usuario
  return response.data
}

const getUserAnswerbyQuestion = async (id_user: string, id_question: string) => {
  const response = await api.get(`/userquiz/${id_user}/${id_question}`) //Obtem todos os questionarios de um usuario
  return response.data
}

export {getUserAnswer, getUserAnswerbyQuestion}
