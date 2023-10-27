import { ref } from 'vue'
import type { Ref } from 'vue'
import { toFunction } from '@vt7/utils'

interface Result<T, P extends any[]> {
  isLoading: Ref<boolean>
  isFetching: Ref<boolean>
  isError: Ref<boolean>
  data: Ref<T>
  fetch: (...args: P) => Promise<void>
  reset: () => void
}

type Callback<R, P extends any[]> = (...args: P) => Promise<R>

type MayBeFn<T> = T | (() => T)

interface Options<R, T> {
  enabled: MayBeFn<boolean>
  autoResetData: boolean
  initialData: MayBeFn<T>
  transform: (response: R) => T
  onSuccess: (response: R) => void
  onError: (error: Error) => void
  onSettled: (data: T, error: Error | null) => void
}

const DEFAULT_OPTIONS: Options<any, any> = {
  enabled: true,
  autoResetData: true,
  initialData: undefined,
  transform: (response: any) => response,
  onSuccess: () => {},
  onError: () => {},
  onSettled: () => {},
}

export const useFetchData = <P extends any[], R, T = R>(
  callbackFn: Callback<R, P>,
  options?: Partial<Options<R, T>>,
): Result<T, P> => {
  const { autoResetData, initialData, enabled, transform, onSuccess, onError, onSettled }: Options<R, T> =
    Object.assign({}, DEFAULT_OPTIONS, options)
  const initialDataFn = toFunction(initialData)
  const enabledFn = toFunction(enabled)

  const error = ref<Error | null>(null)
  const data = ref(initialDataFn()) as Ref<T>
  const isLoading = ref(false)
  const isFetching = ref(false)
  const isError = ref(false)

  const reset = () => {
    data.value = initialDataFn()
  }

  const fetch = async (...args: P) => {
    try {
      if (!enabledFn()) {
        return
      }
      if (!data.value) {
        isLoading.value = true
      }
      if (autoResetData) {
        reset()
      }

      isFetching.value = true
      isError.value = false
      error.value = null

      const response = await callbackFn(...args)
      data.value = transform(response)
      onSuccess(response)
    } catch (error_) {
      error.value = error_ as Error
      isError.value = true
      onError(error.value)
    } finally {
      isLoading.value = false
      isFetching.value = false
      onSettled(data.value, error.value)
    }
  }

  return {
    isLoading,
    isFetching,
    isError,
    data,
    fetch,
    reset,
  }
}
