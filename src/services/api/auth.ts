import { SignInCredentials } from '@/interfaces/SignInCredentials'
import { api } from './api'
import { RegisterCredentials } from '@/interfaces/RegisterCredentials'

async function signInUser({ email, password }: SignInCredentials) {
  try {
    const response = await api.post('/auth/signin', { email, password })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

async function clearCookies() {
  const response = await api.post('/auth/clear-cookie')
  return response.data
}

async function registerUser({
  password,
  username,
  email,
}: RegisterCredentials) {
  const response = await api.post('/auth/register', {
    fullname: username,
    college_register: 'test',
    password,
    username,
    email,
  })
  return response.data
}

export default { signInUser, clearCookies, registerUser }
