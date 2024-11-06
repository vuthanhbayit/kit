import { ref, type Ref } from 'vue'

type Callback<T, V> = (variables?: V) => Promise<T>

interface Options<T, V> {
  onValidate: (variables?: V) => Promise<any> | any
  onSuccess: (data: T, variables?: V) => void
  onError: (error: any, variables?: V) => void
  onSettled: (data: T | null, error: Error | null, variables?: V) => void
}

const DEFAULT_OPTIONS = {
  onValidate: () => true,
  onSuccess: () => {},
  onError: () => {},
  onSettled: () => {},
}

export const useMutation = <T, V>(callback: Callback<T, V>, options?: Partial<Options<T, V>>) => {
  const { onValidate, onSuccess, onError, onSettled }: Options<T, V> = Object.assign({}, DEFAULT_OPTIONS, options)

  const data: Ref<T | null> = ref(null)
  const error: Ref<Error | null> = ref(null)
  const isLoading = ref(false)
  const isError = ref(false)
  const isSuccess = ref(false)

  const mutate = async (variables?: V, shouldThrow = false) => {
    try {
      await onValidate(variables)

      isLoading.value = true
      isError.value = false
      isSuccess.value = false
      data.value = null
      error.value = null

      const response = await callback(variables)

      data.value = response
      isSuccess.value = true

      onSuccess(response, variables)

      return response
    } catch (__error: any) {
      try {
        if (process.env.NODE_ENV !== 'production') {
          console.error(__error)
        }
      } catch {}

      error.value = __error
      isError.value = true

      onError(__error, variables)

      if (shouldThrow) {
        throw __error
      }
    } finally {
      isLoading.value = false

      onSettled(data.value, error.value, variables)
    }
  }

  const mutateWithException = (variables?: V) => mutate(variables, true)

  const reset = () => {
    isLoading.value = false
    isError.value = false
    isSuccess.value = false
    data.value = null
    error.value = null
  }

  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    mutate,
    mutateWithException,
    reset,
  }
}
