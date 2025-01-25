import {api} from './api'

const fetchAllQuizes = async (id: string) => {
  const response = await api.get(`/quiz/course/${id}`)
  return response.data
}

const fetchQuizQuestion = async (id: string) => {
  const response = await api.get(`/question/quiz/${id}`)
  return response.data
}

const fetchQuestion = async (id: string[]) => {
  const iterators = id.map(id => api.get(`/question/${id}`));
  const responses = await Promise.all(iterators);
  return responses.map(response => response.data);
}

export {fetchAllQuizes, fetchQuizQuestion, fetchQuestion}
