import axios, { AxiosError } from 'axios'

import type { ApiError } from '@/types/api'

const baseURL = import.meta.env.VITE_API_BASE_URL

if (!baseURL) {
  throw new Error('La variable VITE_API_BASE_URL no está configurada')
}

export const api = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    Accept: 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<{ message?: string }>) => {
    const apiError: ApiError = {
      message:
        error.response?.data?.message ??
        error.message ??
        'Ocurrió un error inesperado',
      status: error.response?.status,
    }

    return Promise.reject(apiError)
  },
)