import { api } from './api'

const fetchAllCourses = async () => {
  const response = await api.get('/course')
  return response.data
}

const fetchAllUserCourses = async (id: string) => {
  const response = await api.get(`/course/user/${id}`)
  return response.data
}

export { fetchAllCourses, fetchAllUserCourses }
