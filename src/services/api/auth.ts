import { SignInCredentials } from '@/interfaces/SignInCredentials'
import { api } from './api'
import { RegisterCredentials } from '@/interfaces/RegisterCredentials'

async function signInUser({ username, password }: SignInCredentials) {
  try {
    const response = await api.post('/auth/login', { username, password })
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
  confirm_password,
}: RegisterCredentials) {
  const response = await api.post('/auth/register', {
    fullname: username,
    college_register: 'test',
    username,
    email,
    password,
    confirm_password,
  })
  return response.data
}

export default { signInUser, clearCookies, registerUser }
