import {
  createContext,
  useContext,
  useState,
  useEffect,
  useLayoutEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { api } from '@/services/api'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'

type User = {
  id: number
  fullname: string
  username: string
  email: string
  college_register: string
  xp_count?: number
}
/* Usuario para testar as páginas sem desatuvar a autenticaçao*/
const mockUser: User = {
  id: 1,
  fullname: 'Test User',
  username: 'testuser',
  email: 'test@example.com',
  college_register: '123456',
  xp_count: 100,
}

const mockToken = 'mock-token'
const isTesting = false /* mudar valor conforme necessário*/

type SignInCredentials = {
  email: string
  password: string
}

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
    if (isTesting) {
      setUser(mockUser)
    } else if (token) {
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
      if (isTesting) {
        setToken(mockToken)
        Cookies.set('token', mockToken)
        setUser(mockUser)
        navigate('/home')
      } else {
        const response = await api.post('/auth/signin', { email, password })
        const { token } = response.data
        setToken(token)
        Cookies.set('token', token)
        fetchPerson(token)
        navigate('/home')
      }
    } catch (error) {
      throw new Error('Erro ao fazer login')
    }
  }
  async function fetchPerson(token: string) {
    try {
      const { sub } = jwtDecode<{ sub: string }>(token)
      const id = Number(sub)
      const userResponse = await api.get(`/user/${id}`)
      setUser(userResponse.data)
    } catch (error) {
      console.error(error)
      signOut()
    }
  }

  function signOut() {
    api.post('/auth/clear-cookie').finally(() => {
      setToken(null)
      setUser(null)
      Cookies.remove('token')
      navigate('/')
    })
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
