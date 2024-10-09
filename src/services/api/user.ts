import { jwtDecode } from 'jwt-decode'
import { api } from './api'

async function getUser(token: string) {
  const { user_id } = jwtDecode<{ user_id: string }>(token)
  console.log('id', user_id)
  const userResponse = await api.get(`/user/${user_id}`)
  return userResponse.data
}

async function signIn() {
  const response = await api.post('/auth/login')
  return response.data
}

export default { getUser, signIn }
