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
  logOut(): void
  isAuthenticated: boolean
  user: User | null
}

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const navigate = useNavigate()
  const isAuthenticated = !!user

  useEffect(() => {
    const token = Cookies.get('token')

    if (token) {
      try {
        const { sub } = jwtDecode<{ sub: string }>(token)
        const id = Number(sub)
        api.get(`/user/${id}`).then((response) => {
          setUser(response.data)
        })
      } catch (error) {
        logOut()
      }
    }
  }, [])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/auth/signin', { email, password })
      const { token } = response.data

      Cookies.set('token', token, { expires: 7 })

      // Decode the token to get the user data
      const { sub } = jwtDecode<{ sub: string }>(token)
      const id = Number(sub)
      const userResponse = await api.get(`/user/${id}`)
      setUser(userResponse.data)

      navigate('/home')
    } catch (error) {
      console.error(error)
    }
  }

  async function logOut() {
    try {
      await api.post('/auth/logout')
      Cookies.remove('token')
      setUser(null)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, logOut, isAuthenticated, user }}>
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
