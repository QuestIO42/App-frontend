import { jwtDecode } from 'jwt-decode'
import { api } from './api'

async function getUser(token: string) {
  const { sub } = jwtDecode<{ sub: string }>(token)
  const id = sub
  console.log('id', id)
  const userResponse = await api.get(`/user/${id}`)
  return userResponse.data
}

async function signIn() {
  const response = await api.post('/auth/login')
  return response.data
}

export default { getUser, signIn }
