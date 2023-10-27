import { ref, type Ref } from 'vue'

type Callback<T, V> = (variables: V) => Promise<T>

interface Options<T, V> {
  onValidate: (variables: V) => Promise<any> | any
  onSuccess: (data: T, variables: V) => void
  onError: (error: Error, variables: V) => void
  onSettled: (data: T | null, error: Error | null, variables: V) => void
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

  const mutate = async (variables: V) => {
    try {
      isLoading.value = true
      isError.value = false
      isSuccess.value = false
      data.value = null
      error.value = null

      const isValid = await onValidate(variables)

      if (!isValid) {
        return
      }

      const response = await callback(variables)

      data.value = response
      isSuccess.value = true

      onSuccess(response, variables)
    } catch (error_: any) {
      try {
        if (process.env.NODE_ENV !== 'production') {
          console.error(error)
        }
      } catch {}

      error.value = error_
      isError.value = true

      onError(error_, variables)
    } finally {
      isLoading.value = false

      onSettled(data.value, error.value, variables)
    }
  }

  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    mutate,
  }
}
