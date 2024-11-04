import { jwtDecode } from 'jwt-decode'
import { api } from './api'

async function getUser(token: string) {
  const { sub } = jwtDecode<{ sub: string }>(token)
  console.log('id', sub)
  const userResponse = await api.get(`/user/${sub}`)
  return userResponse.data
}

async function signIn() {
  const response = await api.post('/auth/login')
  return response.data
}

export default { getUser, signIn}
