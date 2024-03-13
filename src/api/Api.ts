import { ErrorResponse } from '@/interfaces/ErrorResponse'
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

// Default instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  timeout: 10000,
  headers: {
      Authorization: undefined
  },
})

axiosInstance.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    return {
      error: error,
    }
  },
)

axiosInstance.interceptors.response.use(
  (response) => {
    // Extract cookies from the response headers
    /* const cookies = response.headers['set-cookie']; */

    // Do something with the cookies if needed
    /* if (cookies) {
      // You can parse the cookies or store them as needed
      console.log('Cookies:', cookies);
    } */
    return response
  },
  async (error) => {
    return error.response
  },
)

export async function apiRequest<D = Record<string, unknown>, R = unknown>(
  method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch',
  path: string,
  input?: D,
  options?: {
    headers?: AxiosRequestHeaders
  } & AxiosRequestConfig,
) {
  const response = await axiosInstance.request<R | ErrorResponse>({
    baseURL: process.env.BACKEND_URL || 'http://localhost:8085',
    url: path,
    method: method,
    data: input,
    headers: {
        ...options?.headers,
      },
      withCredentials: true
    })
    return response
}

export * from './User'
export * from './Test'