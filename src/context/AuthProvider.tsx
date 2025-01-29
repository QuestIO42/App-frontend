import { createContext, useState, useEffect, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/services/api/api'
import { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import { SignInCredentials } from '@/interfaces/SignInCredentials'
import { User } from '@/interfaces/User'
import { mockUser } from '@/utils/mockUser'
import { jwtDecode } from 'jwt-decode'
import { signInUser, logout } from '@/services/api/auth'
import { getUser } from '@/services/api/user'

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  configPass(verificationCode: string): Promise<void>
  isAuthenticated: boolean
  user: User | null
}

type AuthProviderProps = {
  children: React.ReactNode
}

interface FailedRequest {
  onSuccess: (accessToken: string) => void
  onFailure: (error: AxiosError) => void
}

let isRefreshing = false
let failedRequestQueue: FailedRequest[] = []

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  const [accessToken, setToken] = useState<string | null>(() => {
    return Cookies.get('accessToken') || null
  })
  const [refreshToken, _] = useState<string | null>(() => {
    return Cookies.get('refreshToken') || null
  })

  const navigate = useNavigate()
  const isAuthenticated =
    import.meta.env.VITE_APP_ENV == 'development' ? true : !!accessToken

  useLayoutEffect(() => {
    const fetchUser = async () => {
      if (accessToken && import.meta.env.VITE_APP_ENV !== 'development') {
        const { sub } = jwtDecode<{ sub: string }>(accessToken)
        await fetchPerson(sub)
      } else {
        setUser(mockUser)
      }
    }
    fetchUser()
  }, [accessToken])

  useLayoutEffect(() => {
    if (import.meta.env.VITE_APP_ENV !== 'development') {
      const authInterceptor = api.interceptors.request.use(
        (config) => {
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
          }
          return config
        },
        (error) => Promise.reject(error)
      )
      return () => {
        api.interceptors.request.eject(authInterceptor)
      }
    }
  }, [accessToken])

  useLayoutEffect(() => {
    if (import.meta.env.VITE_APP_ENV !== 'development') {
      const refreshInterceptor = api.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config

          if (error.response.status === 401) {
            if (
              error.response.data.code === 'token_not_valid' ||
              error.response.data.message === 'Token expired.'
            ) {
              if (!isRefreshing) {
                isRefreshing = true
                api
                  .post('/auth/token/refresh', { refresh: refreshToken })
                  .then((response) => {
                    const { access: accessToken } = response.data
                    setToken(accessToken)
                    console.log('accessToken', accessToken)
                    Cookies.set('accessToken', accessToken)
                    // Atualiza o header Authorization com o novo token de acesso
                    api.defaults.headers['Authorization'] =
                      `Bearer ${accessToken}`

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
                    if (accessToken) {
                      originalRequest.headers['Authorization'] =
                        `Bearer ${accessToken}`
                      resolve(api(originalRequest))
                    } else {
                      console.error('Access token is null')
                      reject(new Error('Access token is null'))
                    }
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
  }, [accessToken])

  async function signIn({ login, password }: SignInCredentials) {
    try {
      if (import.meta.env.VITE_APP_ENV === 'development') {
        // Em desenvolvimento, simula um usuário autenticado
        setToken('fake-token')
        setUser(mockUser)
        Cookies.set('token', 'fake-token')
        navigate('/home')
      } else {
        const response = await signInUser({ login, password })

        const accessToken = response.access
        const refreshToken = response.refresh
        setToken(accessToken)

        Cookies.set('accessToken', accessToken, {
          sameSite: 'Lax',
          secure: true,
        })

        Cookies.set('refreshToken', refreshToken, {
          sameSite: 'Lax',
          secure: true,
        })

        const { sub } = jwtDecode<{ sub: string }>(accessToken)

        await fetchPerson(sub)
        navigate('/home')
        console.log('Login realizado com sucesso')
      }
    } catch (error) {
      console.error('Erro no login:', error)
      throw new Error('Erro ao fazer login')
    }
  }

  async function fetchPerson(id: string) {
    try {
      const response = await getUser(id)
      setUser(response)
    } catch (error) {
      console.error(error)
    }
  }

  async function signOut() {
    try {
      if (import.meta.env.VITE_APP_ENV === 'development') {
        // Em desenvolvimento, limpa a simulação de autenticação
        setToken(null)
        setUser(null)
        Cookies.remove('accessToken')
        Cookies.remove('refreshToken')
        navigate('/')
      } else {
        if (accessToken) {
          await logout()
        }
      }
    } finally {
      setToken(null)
      setUser(null)
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      navigate('/')
    }
  }

  const configPass = async (verificationCode: string) => {
    try {
      api.get(`auth/reset-password/${verificationCode}`).then((response) => {
        console.log(response)
        const accessToken = response.data.access
        Cookies.set('accessToken', response.data.access, {
          sameSite: 'Lax',
          secure: true,
        })
        Cookies.set('refreshToken', response.data.refresh, {
          sameSite: 'Lax',
          secure: true,
        })
        setToken(accessToken)
        navigate('/change-password')
      })
    } catch (error) {
      console.error('Erro no login:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, configPass, isAuthenticated, user }}
    >
      {children}
    </AuthContext.Provider>
  )
}
