import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/services/api'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import UserApi from '@/services/api/user'
import AuthApi from '@/services/api/auth'
import { SignInCredentials } from '@/interfaces/SignInCredentials'
import { User } from '@/interfaces/User'

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  isAuthenticated: boolean
  user: User | null
}

type AuthProviderProps = {
  children: React.ReactNode
}

interface FailedRequest {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

let isRefreshing = false
let failedRequestQueue: FailedRequest[] = []

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(() => {
    return Cookies.get('token') || null
  })
  const navigate = useNavigate()
  const isAuthenticated = !!token

  useEffect(() => {
    if (token) {
      fetchPerson(token)
    }
  }, [token])

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )
    return () => {
      api.interceptors.request.eject(authInterceptor)
    }
  }, [token])

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (error.response.status === 401) {
          if (error.response.data.message === 'Token expired.') {
            if (!isRefreshing) {
              isRefreshing = true
              api
                .patch('/auth/token/refresh', {}, { withCredentials: true })
                .then((response) => {
                  const { token } = response.data
                  setToken(token)
                  Cookies.set('token', token)

                  // Atualiza o header Authorization com o novo token de acesso
                  api.defaults.headers['Authorization'] = `Bearer ${token}`

                  failedRequestQueue.forEach((request) =>
                    request.onSuccess(token)
                  )
                  failedRequestQueue = []
                })
                .catch((err) => {
                  failedRequestQueue.forEach((request) =>
                    request.onFailure(err)
                  )
                  failedRequestQueue = []
                })
                .finally(() => {
                  isRefreshing = false
                })
            }

            return new Promise((resolve, reject) => {
              failedRequestQueue.push({
                onSuccess: (token: string) => {
                  originalRequest.headers['Authorization'] = `Bearer ${token}`

                  resolve(api(originalRequest))
                },
                onFailure: (err: AxiosError) => {
                  reject(err)
                },
              })
            })
          } else {
            signOut()
          }
        }
        return Promise.reject(error)
      }
    )
    return () => {
      api.interceptors.response.eject(refreshInterceptor)
    }
  }, [token])

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await AuthApi.signInUser({ email, password })
      const { token } = response
      setToken(token)
      Cookies.set('token', token)
      fetchPerson(token)
      navigate('/home')
    } catch (error) {
      console.error('Erro no login:', error)
      throw new Error('Erro ao fazer login')
    }
  }

  async function fetchPerson(token: string) {
    try {
      const response = await UserApi.getUser(token)
      setUser(response)
    } catch (error) {
      console.error(error)
      signOut()
    }
  }

  async function signOut() {
    try {
      await AuthApi.clearCookies()
    } finally {
      setToken(null)
      setUser(null)
      Cookies.remove('token')
      navigate('/')
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
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
