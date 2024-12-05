import { jwtDecode } from 'jwt-decode'
import { api } from './api'
import { UserUpdateProps } from '@/interfaces/User'

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

async function updateUser(accessToken: string, newValues: Partial<UserUpdateProps> )
{
  const currentResponse = await getUser(accessToken)
  console.log('currentResponse', currentResponse)
  const currentUser = currentResponse
  console.log('newValues', newValues)

  const dataToSend: Partial<UserUpdateProps> = {
    full_name: newValues.full_name || currentUser.full_name,
    username: newValues.username || currentUser.username,
    email: newValues.email || currentUser.email,
    password: newValues.password || currentUser.password,
    confirmPassword: newValues.confirmPassword || currentUser.confirmPassword,

    // Add other fields as needed, using currentUser values to keep them unchanged
  };
  const response = await api.put(`/user/${currentUser.id}`, dataToSend, { headers: { 'Authorization': `Bearer ${accessToken}` } })
  return response.data
}

export  { getUser, signIn, updateUser}
