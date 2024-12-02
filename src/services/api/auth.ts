import { SignInCredentials } from '@/interfaces/SignInCredentials'
import { api } from './api'
import { RegisterCredentials } from '@/interfaces/RegisterCredentials'
import { ChangePasswordValues } from '@/interfaces/ChangePasswordValues'
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
  full_name,
  email,
  password,
}: RegisterCredentials) {
  const response = await api.post('/auth/self-register',{
    email,
    username,
    full_name,
    password,
    confirm_password: password
  })
  return response.data
}

async function changePassword({
  password,
  confirmPassword,
}: ChangePasswordValues) {
  const response = await api.put('user', {
    password,
    confirmPassword,
  })
  return response.data
}

type Logout = {
  accessToken : string
} | null

async function logout(data: Logout ){
  const logoutResponse = await api.post(`auth/logout`, { access:data?.accessToken }, {
    headers: {
      'Authorization': `Bearer ${data?.accessToken}`,
    }
  });
  return logoutResponse.data

}


export  { signInUser, clearCookies, registerUser, logout, changePassword}
