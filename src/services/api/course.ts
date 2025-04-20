import { api } from './api'

const fetchAllCourses = async () => {
  const response = await api.get('/course')
  return response
}

const fetchCourse = async (id: string) => {
  const response = await api.get(`/course/${id}`)
  return response
}

const fetchAllUserCourses = async (id: string) => {
  const response = await api.get(`/course/user/${id}`)
  return response.data
}


export { fetchAllCourses, fetchCourse, fetchAllUserCourses }
