import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

interface FailedRequest {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
}

let isRefreshing = false
let failedRequestQueue: FailedRequest[] = []

export const api = axios.create({
  baseURL: 'http://localhost:4000',
  withCredentials: true,
})

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
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
              Cookies.set('token', token)

              // Atualiza o header Authorization com o novo token de acesso
              api.defaults.headers['Authorization'] = `Bearer ${token}`

              failedRequestQueue.forEach((request) => request.onSuccess(token))
              failedRequestQueue = []
            })
            .catch((err) => {
              failedRequestQueue.forEach((request) => request.onFailure(err))
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
        Cookies.remove('token')
        Cookies.remove('refreshToken')
      }
    }
    return Promise.reject(error)
  }
)
