import { api } from './api'
import { UserUpdateProps } from '@/interfaces/User'

async function getUser(id: string) {
  const userResponse = await api.get(`/user/${id}`)
  return userResponse.data
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

export { getUser, signIn, updateUser }
