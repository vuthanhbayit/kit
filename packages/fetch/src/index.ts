import Axios from 'axios'
import type { AxiosRequestConfig } from 'axios'

import { createAxiosExtra } from './extra'
import { createAxiosDebug } from './debug'
import { createAxiosCancel } from './cancel'

const createFetch = (config?: AxiosRequestConfig) => {
  const instance = Axios.create(config)

  createAxiosExtra(instance)
  createAxiosDebug(instance)
  createAxiosCancel(instance)

  return instance
}

export { createFetch }
export { createAxiosExtra } from './extra'
export { createAxiosDebug } from './debug'
export { createAxiosCancel } from './cancel'
