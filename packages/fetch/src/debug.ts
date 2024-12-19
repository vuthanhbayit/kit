import type { AxiosInstance } from 'axios'

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
    if (!error || !error.config || !error.request) {
      return
    }

    const { debug, debugError } = error.config
    const { status, statusText, path, method } = error.request

    if (!debug && !debugError) {
      return
    }

    console.log('Request error:', '[' + (status + ' ' + statusText) + ']', '[' + method?.toUpperCase() + ']', path)
    console.groupEnd()
  })

  axios.onResponseError(error => {
    if (!error || !error.response || !error.config) {
      return
    }

    const { debug, debugError, headers } = error.config

    if (!debug && !debugError) {
      return
    }

    const { status, statusText, data } = error.response
    const { method, path } = error.request
    console.groupCollapsed(
      'Response error:',
      '[' + (status + ' ' + statusText) + ']',
      '[' + method?.toUpperCase() + ']',
      path,
      `+${getDuration(headers)}ms`,
    )
    console.table(data)
    console.groupEnd()
  })

  axios.onResponse(res => {
    if (!res || !res.config) {
      return
    }

    const { debug, headers, method, url, params } = res.config
    const { status, statusText } = res
    const searchParams = new URLSearchParams(params)
    const path = searchParams.toString() ? url + '/?' + searchParams.toString() : url

    if (!debug) {
      return
    }

    console.log(
      '[' + (status + ' ' + statusText) + ']',
      '[' + method?.toUpperCase() + ']',
      path,
      `+${getDuration(headers)}ms`,
    )

    return res
  })
}
