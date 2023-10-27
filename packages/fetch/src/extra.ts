import Axios from 'axios'
import { toArray } from '@vt7/utils'
// @ts-ignore
import type { AxiosInstance, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

declare module 'axios' {
  interface AxiosInstance {
    $request<T = any>(config: AxiosRequestConfig): Promise<T>
    $get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
    $delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
    $head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
    $options<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>
    $post<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>
    $put<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>
    $patch<T = any, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<T>

    setBaseURL(baseURL: string): void
    setHeader(name: string, value?: string | false, scopes?: string | string[]): void
    setToken(token: string, type?: string | false, scopes?: string | string[]): void
    onRequest(
      callback: (
        config?: InternalAxiosRequestConfig,
      ) => void | InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>,
    ): void
    onResponse<T = any>(
      callback: (response: AxiosResponse<T>) => void | AxiosResponse<T> | Promise<AxiosResponse<T>>,
    ): void
    onError(callback: (error: AxiosError) => any): void
    onRequestError(callback: (error: AxiosError) => any): void
    onResponseError(callback: (error: AxiosError) => any): void
    isCancel(value: any): boolean
  }
}

export const createAxiosExtra = (axios: AxiosInstance) => {
  // Request helpers ($get, $post, ...)
  for (const method of ['request', 'delete', 'get', 'head', 'options', 'post', 'put', 'patch']) {
    // @ts-ignore
    axios['$' + method] = function () {
      // @ts-ignore
      // eslint-disable-next-line prefer-rest-params
      return Reflect.apply(this[method], this, arguments).then((res: { data: any }) => res && res.data)
    }
  }

  axios.setBaseURL = baseURL => {
    axios.defaults.baseURL = baseURL
  }

  axios.setHeader = (name, value, scopes = 'common') => {
    for (const scope of toArray(scopes)) {
      if (!value) {
        // @ts-ignore
        delete axios.defaults.headers[scope][name]
        continue
      }

      // @ts-ignore
      axios.defaults.headers[scope][name] = value
    }
  }

  axios.setToken = (token, type, scopes = 'common') => {
    const value = token ? (type ? `${type} ` : '') + token : ''
    axios.setHeader('Authorization', value, scopes)
  }

  axios.onRequest = callback => {
    axios.interceptors.request.use(config => callback(config) || config)
  }

  axios.onResponse = callback => {
    axios.interceptors.response.use(response => callback(response) || response)
  }

  axios.onRequestError = callback => {
    axios.interceptors.request.use(undefined, error => callback(error) || Promise.reject(error))
  }

  axios.onResponseError = callback => {
    axios.interceptors.response.use(undefined, error => callback(error) || Promise.reject(error))
  }

  axios.onError = callback => {
    axios.onRequestError(callback)
    axios.onResponseError(callback)
  }

  axios.isCancel = Axios.isCancel
}
