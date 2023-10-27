import type { AxiosInstance } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    cancelId?: string
  }
}

export function createAxiosCancel(axios: AxiosInstance) {
  const controllerMapper = new Map<string, AbortController>()

  axios.interceptors.request.use(config => {
    const { cancelId } = config

    if (cancelId) {
      const oldController = controllerMapper.get(cancelId)

      if (oldController) {
        oldController.abort()
      }

      const newController = new AbortController()
      config.signal = newController.signal
      controllerMapper.set(cancelId, newController)
    }

    return config
  })

  axios.interceptors.response.use(response => {
    const { cancelId } = response.config

    if (cancelId) {
      controllerMapper.delete(cancelId)
    }

    return response
  })
}
