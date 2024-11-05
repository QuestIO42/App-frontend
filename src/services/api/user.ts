import { jwtDecode } from 'jwt-decode'
import { api } from './api'

async function getUser(accessToken: string) {
  const { sub } = jwtDecode<{ sub: string }>(accessToken)
  console.log('id', sub)
  const userResponse = await api.get(`/user/${sub}`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  });
  return userResponse.data
}

async function signIn() {
  const response = await api.post('/auth/login')
  return response.data
}

export default { getUser, signIn}
