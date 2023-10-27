import { ref, type Ref } from 'vue'
import { eagerComputed } from '@vueuse/core'
import { cloneDeep, isArray, isEqual, isObject } from '@vt7/utils'

type Result<T> = {
  state: Ref<T>
  reset: () => void
  isChanged: Readonly<Ref<boolean>>
}

export const useResetRef = <T>(defaultValueFn: () => T): Result<T> => {
  const getDefaultValue = (): T => {
    const value = defaultValueFn()

    return isObject(value) || isArray(value) ? cloneDeep(value) : value
  }

  const state = ref(getDefaultValue()) as Ref<T>

  const reset = () => {
    state.value = getDefaultValue()
  }

  const isChanged = eagerComputed(() => !isEqual(state.value, getDefaultValue()))

  return {
    state,
    reset,
    isChanged,
  }
}
