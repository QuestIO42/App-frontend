import { createContext, useState, useLayoutEffect, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '@/services/api/api'
import { AxiosError } from 'axios'
import { SignInCredentials } from '@/interfaces/SignInCredentials'
import { User } from '@/interfaces/User'
import { mockUser } from '@/utils/mockUser'
import { jwtDecode } from 'jwt-decode'
import { signInUser, logout } from '@/services/api/auth'
import { getUser } from '@/services/api/user'
import Cookies from 'js-cookie'

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>
  signOut(): void
  configPass(verificationCode: string): Promise<void>
  isAuthenticated: boolean
  user: User | null
  isLoading: boolean
}

type AuthProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

let isRefreshing = false
let failedRequestQueue: {
  onSuccess: (accessToken: string) => void
  onFailure: (error: AxiosError) => void
}[] = []

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const navigate = useNavigate()

  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null)

  const accessToken = Cookies.get('accessToken')

  const isAuthenticated = import.meta.env.VITE_APP_ENV == 'development' ? true : !!accessToken

  // Agendamento da renovação automática do token
  function scheduleRefresh(accessToken: string) {
    try {
      const { exp } = jwtDecode<{ exp: number }>(accessToken)
      const expiresIn = exp * 1000 - Date.now()

      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }

      refreshTimerRef.current = setTimeout(async () => {
        try {
          const refreshToken = Cookies.get('refreshToken')
          if (!refreshToken) {
            signOut()
            return
          }

          const response = await api.post('/auth/token/refresh', {
            refresh: refreshToken,
          })
          const newAccessToken = response.data.access

          Cookies.set('accessToken', newAccessToken, {
            sameSite: 'Lax',
            secure: import.meta.env.PROD,
            expires: 7,
          })

          scheduleRefresh(newAccessToken) // Agenda o próximo refresh
        } catch (error) {
          console.error('Erro ao renovar token automaticamente:', error)
          signOut()
        }
      }, expiresIn - 30_000) // 30s antes de expirar
    } catch (error) {
      console.error('Erro ao agendar refresh:', error)
    }
  }

  // Refresh imediato se token expirado
  async function refreshAccessTokenIfNeeded(): Promise<string | null> {
    const token = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')
    if (!token || !refreshToken) return null

    const { exp } = jwtDecode<{ exp: number }>(token)
    if (Date.now() < exp * 1000) return token

    try {
      const response = await api.post('/auth/token/refresh', { refresh: refreshToken })
      const newAccessToken = response.data.access
      Cookies.set('accessToken', newAccessToken, {
        sameSite: 'Lax',
        secure: import.meta.env.PROD,
        expires: 7,
      })
      scheduleRefresh(newAccessToken)
      return newAccessToken
    } catch (error) {
      console.error('Erro ao renovar token automaticamente:', error)
      signOut()
      return null
    }
  }

  useLayoutEffect(() => {
    const fetchUser = async () => {
      if (!accessToken && import.meta.env.VITE_APP_ENV !== 'development') {
        setIsLoading(false)
        return
      }

    try {
      if (import.meta.env.VITE_APP_ENV !== 'development') {
        const validToken = await refreshAccessTokenIfNeeded()
        if (validToken) {
          const { sub } = jwtDecode<{ sub: string }>(validToken)
          await fetchPerson(sub)
        } else {
          setUser(null)
        }
      } else {
        setUser(mockUser)
      }
    } catch (error) {
      console.error("Falha ao buscar dados do usuário", error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }
  fetchUser()
 }, [accessToken])

  // Refresh automático no 401
  useEffect(() => {
    if (import.meta.env.VITE_APP_ENV !== 'development') {
      const refreshInterceptor = api.interceptors.response.use(
        response => response,
        async (error) => {
          if (isLoggingOut) {
            return Promise.reject(error)
          }

          const originalRequest = error.config;

          if (originalRequest._retry) {
            return Promise.reject(error)
          }
          originalRequest._retry = true

          if (!error.response || error.response.status !== 401) {
            return Promise.reject(error);
          }

          const refreshToken = Cookies.get('refreshToken');
          if (!refreshToken) {
            console.warn('Refresh token ausente. A requisição falhará.');
            return Promise.reject(error);
          }

          if (!isRefreshing) {
            isRefreshing = true;

            try {
              const response = await api.post('/auth/token/refresh', { refresh: refreshToken });
              const newAccessToken = response.data.access;

              Cookies.set('accessToken', newAccessToken, {
                sameSite: 'Lax',
                secure: import.meta.env.PROD,
                expires: 7,
              });

              scheduleRefresh(newAccessToken)

              failedRequestQueue.forEach(req => req.onSuccess(newAccessToken));
              failedRequestQueue = []
            } catch (err: unknown) {
              const axiosError = err as AxiosError;
              failedRequestQueue.forEach(req => req.onFailure(axiosError));
              failedRequestQueue = []
              return Promise.reject(err)
            } finally {
              isRefreshing = false;
            }
          }

          return new Promise((resolve, reject) => {
            failedRequestQueue.push({
              onSuccess: (token: string) => {
                originalRequest.headers['Authorization'] = `Bearer ${token}`;
                resolve(api(originalRequest));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        }
      );

      return () => {
        api.interceptors.response.eject(refreshInterceptor);
      };
    }
  }, [isLoggingOut]);


  async function signIn({ login, password }: SignInCredentials) {
    try {
      if (import.meta.env.VITE_APP_ENV === 'development') {
        setUser(mockUser)
        Cookies.set('accessToken', 'fake-token')
        navigate('/home')
      } else {
        const response = await signInUser({ login, password })
        const accessToken = response.access
        const refreshToken = response.refresh

        Cookies.set('accessToken', accessToken, {
          sameSite: 'Lax',
          secure: true,
          expires: 7,
        })

        Cookies.set('refreshToken', refreshToken, {
          sameSite: 'Lax',
          secure: true,
          expires: 30,
        })

        const { sub } = jwtDecode<{ sub: string }>(accessToken)
        await fetchPerson(sub)
        scheduleRefresh(accessToken)
        navigate('/home')
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

  function signOut() {
    setIsLoggingOut(true);

    try {
      if (import.meta.env.VITE_APP_ENV !== 'development') {
        logout()
      }
    } finally {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current)
      }
      setUser(null)
      Cookies.remove('accessToken')
      Cookies.remove('refreshToken')
      navigate('/')

      setTimeout(() => {
        setIsLoggingOut(false)
      }, 500);
    }
  }

  const configPass = async (verificationCode: string) => {
    try {
      const response = await api.get(`auth/reset-password/${verificationCode}`)
      console.log(response)
      navigate(`/change-password/${verificationCode}`)
    } catch (error) {
      console.error('Erro ao validar código de reset:', error)
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, configPass, isAuthenticated, user, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
