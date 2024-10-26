import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/services/api/api'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import UserApi from '@/services/api/user'
import AuthApi from '@/services/api/auth'
import { SignInCredentials } from '@/interfaces/SignInCredentials'
import { User } from '@/interfaces/User'
import { mockUser } from '@/utils/mockUser'
import { jwtDecode } from 'jwt-decode'


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
    return Cookies.get('accessToken') || null
  })
  const navigate = useNavigate()
  const isAuthenticated =
    import.meta.env.VITE_APP_ENV == 'development' ? true : !!token

  useEffect(() => {
    if (token && import.meta.env.VITE_APP_ENV !== 'development') {
      fetchPerson(token)
    } else {
      setUser(mockUser)
    }
  }, [token])

  useLayoutEffect(() => {
    if (import.meta.env.VITE_APP_ENV !== 'development') {
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
    }
  }, [token])

  useLayoutEffect(() => {
    if (import.meta.env.VITE_APP_ENV !== 'development') {
      const refreshInterceptor = api.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config

          if (error.response.status === 401) {
            if (error.response.data.message === 'Token expired.') {
              if (!isRefreshing) {
                isRefreshing = true
                api
                  .post('/auth/token/refresh', {}, { withCredentials: true })
                  .then((response) => {
                    const { accessToken } = response.data
                    setToken(accessToken)
                    Cookies.set('accessToken', accessToken)
                    // Atualiza o header Authorization com o novo token de acesso
                    api.defaults.headers['Authorization'] = `Bearer ${token}`

                    failedRequestQueue.forEach((request) =>
                      request.onSuccess(accessToken)
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
                  onSuccess: (accessToken: string) => {
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`

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
    }
  }, [token])

  async function signIn({ username, password }: SignInCredentials) {
    try {
      if (import.meta.env.VITE_APP_ENV === 'development') {
        // Em desenvolvimento, simula um usuário autenticado
        setToken('fake-token')
        setUser(mockUser)
        Cookies.set('token', 'fake-token')
        navigate('/home')
      } else {
        const response = await AuthApi.signInUser({ username, password })
        const accessToken = response.data
        setToken(accessToken)
        const decoded = jwtDecode(accessToken)
        console.log(decoded)
        Cookies.set('accessToken', accessToken, { sameSite: 'strict' })
        fetchPerson(accessToken)
        navigate('/home')
        console.log('Login realizado com sucesso')
      }
    } catch (error) {
      console.error('Erro no login:', error)
      throw new Error('Erro ao fazer login')
    }
  }

  async function fetchPerson(accessToken: string) {
    try {
      const response = await UserApi.getUser(accessToken)
      setUser(response)
    } catch (error) {
      console.error(error)
      signOut()
    }
  }

  async function signOut() {
    try {
      if (import.meta.env.VITE_APP_ENV === 'development') {
        // Em desenvolvimento, limpa a simulação de autenticação
        setToken(null)
        setUser(null)
        Cookies.remove('accessToken')
        navigate('/')
      } else {
        await AuthApi.clearCookies()
      }
    } finally {
      setToken(null)
      setUser(null)
      Cookies.remove('accessToken')
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
