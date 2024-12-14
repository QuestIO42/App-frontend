import { SignInCredentials } from '@/interfaces/SignInCredentials'
import { api } from './api'
import { RegisterCredentials } from '@/interfaces/RegisterCredentials'
import { error } from 'console'
import Cookies from 'js-cookie'


async function signInUser({ login, password }: SignInCredentials) {
  const response = await api.post('/auth/login', { login, password })
  return response.data
}

async function clearCookies() {
  const response = await api.patch('/auth/clear-cookies')
  return response.data
}

async function registerUser({
  username,
  full_name,
  email,
  password,
}: RegisterCredentials) {
  const response = await api.post('/auth/self-register', {
    email,
    username,
    full_name,
    password,
    confirm_password: password,
  })
  return response.data
}

async function logout() {
  const logoutResponse = await api.post(`/auth/logout`, {
    refresh: Cookies.get('refreshToken'),
  })
  return logoutResponse.data
}

  async function forgotPassword(email: string) {
    try {
      const response = await api.post(`auth/forgot-password-request`, {email})
      return response.data
    } catch(error) {
      console.log(error)
    }
  }

export  { signInUser, clearCookies, registerUser, logout, forgotPassword}

