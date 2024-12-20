import {api} from './api'

const fetchAllQuizes = async (id: string) => {
  const response = await api.get(`/quiz/course/${id}`)
  return response.data
}

const fetchQuizQuestion = async (id: string) => {
  const response = await api.get(`/question/quiz/${id}`)
  return response.data
}

export {fetchAllQuizes, fetchQuizQuestion}
