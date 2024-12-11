import type { AxiosInstance } from 'axios'
import { transformedDataByEnv } from './utils'

declare module 'axios' {
  interface AxiosRequestConfig {
    debug?: boolean
    debugError?: boolean
  }
}

const HEADER_REQUEST_START_TIME = 'request-start-time'

const getDuration = (headers: any) => {
  const endTime = new Date()
  const startTime = headers[HEADER_REQUEST_START_TIME]
  return Math.round(Number(endTime) - Number(startTime))
}

export const createAxiosDebug = (axios: AxiosInstance) => {
  axios.onRequest(config => {
    if (!config) {
      return
    }

    const { debug, debugError } = config
    if (!debug && !debugError) {
      return config
    }

    // eslint-disable-next-line unicorn/consistent-destructuring
    config.headers[HEADER_REQUEST_START_TIME] = String(Date.now())

    return config
  })

  axios.onRequestError(error => {
    if (!error || !error.config) {
      return
    }

    const { debug, debugError, method, url } = error.config
    const { status, statusText } = error.request!

    if (!debug && !debugError) {
      return
    }

    console.log('Request error:', '[' + (status + ' ' + statusText) + ']', '[' + method?.toUpperCase() + ']', url)
    console.groupEnd()
  })

  axios.onResponseError(error => {
    if (!error || !error.config) {
      return
    }

    const { debug, debugError, method, url, headers } = error.config
    if (!error.response) {
      return
    }

    const { status, statusText, data } = error.response

    if (!debug && !debugError) {
      return
    }

    console.groupCollapsed(
      'Response error:',
      '[' + (status + ' ' + statusText) + ']',
      '[' + method?.toUpperCase() + ']',
      url,
      `+${getDuration(headers)}ms`,
    )
    console.log(transformedDataByEnv(data))
    console.groupEnd()
  })

  axios.onResponse(res => {
    const { debug, method, headers, url } = res.config
    const { status, statusText } = res

    if (!debug) {
      return
    }

    console.groupCollapsed(
      '[' + (status + ' ' + statusText) + ']',
      '[' + method?.toUpperCase() + ']',
      url,
      `+${getDuration(headers)}ms`,
    )
    console.groupEnd()

    return res
  })
}
