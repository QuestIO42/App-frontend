import { createContext, useState, useLayoutEffect, useEffect } from 'react'
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
  const navigate = useNavigate()

  const accessToken = Cookies.get('accessToken')

  const isAuthenticated = import.meta.env.VITE_APP_ENV == 'development' ? true : !!accessToken

  useLayoutEffect(() => {
    const fetchUser = async () => {
      if (!accessToken && import.meta.env.VITE_APP_ENV !== 'development') {
        setIsLoading(false)
        return
      }

    try {
      if (accessToken && import.meta.env.VITE_APP_ENV !== 'development') {
        const { sub } = jwtDecode<{ sub: string }>(accessToken)
        await fetchPerson(sub)
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
          const originalRequest = error.config;

          // Se a requisição já foi tentada antes, não tentar de novo
          if (originalRequest._retry) {
            return Promise.reject(error)
          }
          originalRequest._retry = true

          if (!error.response || error.response.status !== 401) {
            return Promise.reject(error);
          }

          const refreshToken = Cookies.get('refreshToken');
          if (!refreshToken) {
            console.warn('Refresh token ausente, deslogando...');
            signOut();
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
              });

              // Resolve todas as requisições que estavam na fila
              failedRequestQueue.forEach(req => req.onSuccess(newAccessToken));
              failedRequestQueue = []
            } catch (err: unknown) {
              const axiosError = err as AxiosError;
              failedRequestQueue.forEach(req => req.onFailure(axiosError));
              failedRequestQueue = []
              signOut();
            } finally {
              isRefreshing = false;
            }
          }

          // Retorna uma promise para a requisição original aguardar o refresh
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
  }, []);

  async function signIn({ login, password }: SignInCredentials) {
    try {
      if (import.meta.env.VITE_APP_ENV === 'development') {
        // Em desenvolvimento, simula um usuário autenticado
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
        })

        Cookies.set('refreshToken', refreshToken, {
          sameSite: 'Lax',
          secure: true,
        })

        const { sub } = jwtDecode<{ sub: string }>(accessToken)
        await fetchPerson(sub)
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
    try {
      if (import.meta.env.VITE_APP_ENV !== 'development') {
        logout()
      }
    } finally {
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
        navigate(`/change-password/${verificationCode}`)
      })
    } catch (error) {
      console.error('Erro no login:', error)
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
