import { api } from './api'
import { UserUpdateProps } from '@/interfaces/User'

async function getUser(id: string) {
  const userResponse = await api.get(`/user/${id}`)
  return userResponse.data
}

// Busca usuários de um curso, filtrando por role (ex: 1)
async function getUsersInCourse(
  idCourse: string,
  role?: number
) {
  const response = await api.get(`/user/course/${idCourse}`, {
    params: { course_role: role }
  })
  return response.data
}

async function signIn() {
  const response = await api.post('/auth/login')
  return response.data
}

async function updateUser({
  id,
  updateUser,
}: {
  id: string
  updateUser: Partial<UserUpdateProps>
}) {
  const response = await api.put(`/user/${id}`, updateUser)
  return response.data
}

export { getUser, getUsersInCourse, signIn, updateUser }
