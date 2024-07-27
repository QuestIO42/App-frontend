import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { api } from '@/services/api'
import Cookies from 'js-cookie'

type User = {
  id: number
  fullname: string
  username: string
  email: string
  college_register: string
  xp_count?: number
}

type SignInCredentials = {
  email: string
  password: string
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>

  isAuthenticated: boolean
  user: User | null
}

type AuthProviderProps = {
  children: React.ReactNode
}

export async function signOut() {
  try {
    await api.post('/auth/clear-cookie')
    Cookies.remove('token')
    window.location.href = '/'
  } catch (error) {
    console.error(error)
  }
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()
  const isAuthenticated = !!user

  useEffect(() => {
    const token = Cookies.get('token')

    if (token) {
      fetchPerson(token)
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/auth/signin', { email, password })
      const { token } = response.data

      Cookies.set('token', token, { expires: 7 })

      fetchPerson(token)
      navigate('/home')
    } catch (error) {
      console.error(error)
    }
  }

  async function fetchPerson(token: string) {
    try {
      const { sub } = jwtDecode<{ sub: string }>(token)
      const id = Number(sub)
      const userResponse = await api.get(`/user/${id}`)
      setUser(userResponse.data)
    } catch (error) {}
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}
