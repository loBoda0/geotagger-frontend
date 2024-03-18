import { getAuthCookies, setAuthCookies } from '@/hooks/session';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'
import { parse } from 'cookie';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL,
  timeout: 10000,
  headers: {
      Authorization: undefined,
  },
})

const extractCookiesFromResponse = (response: AxiosResponse) => {
  const cookieArray = response.headers['set-cookie'] || [];
  const cleanedCookies = cookieArray.map(cookieString => cookieString.split(';')[0]);
  const cookies = cleanedCookies.flatMap(cookieString => Object.entries(parse(cookieString)))
  .map(([name, value]) => ({ name, value }));
  return cookies;
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const sessionCookie = await getAuthCookies();
    config.headers['Cookie'] = `access_token=${sessionCookie}`;
    
    return config;
  },
  (error) => {
    return {
      error: error,
    }
  },
  )
  
  axiosInstance.interceptors.response.use(
    (response) => {
      const cookies = extractCookiesFromResponse(response);
      const access_token = cookies.find(cookie => cookie.name === 'access_token')?.value
      if (access_token) {
      setAuthCookies(access_token)
      }

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
  const response = await axiosInstance.request<R>({
    url: path,
    method: method,
    data: input,
    headers: {
        ...options?.headers,
      },
      withCredentials: true
    })
    return response.data
}

export * from './User'
export * from './Test'