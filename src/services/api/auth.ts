import { SignInCredentials } from '@/interfaces/SignInCredentials'
import { api } from './api'
import { RegisterCredentials } from '@/interfaces/RegisterCredentials'

async function signInUser({ login, password }: SignInCredentials) {
  try {
    const response = await api.post('/auth/login', { login, password })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

async function clearCookies() {
  const response = await api.patch('/auth/clear-cookies')
  console.log(response.data)
  return response.data
}

async function registerUser({
  username,
  email,
  password,
}: RegisterCredentials) {
  const response = await api.post('/auth/register',{
    email,
    fullname: username,
    username,
    password,
    college_register: 'test',
  })
  return response.data
}

export default { signInUser, clearCookies, registerUser }
