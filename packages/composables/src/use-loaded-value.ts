import type { WritableComputedRef, Ref } from 'vue'
import { ref, watch } from 'vue'

export const useLoadedValue = (modelValue: Ref<boolean> | WritableComputedRef<boolean>): Ref<boolean> => {
  const isLoaded = ref(modelValue.value)

  const stop = watch(
    () => modelValue.value,
    value => {
      if (value) {
        isLoaded.value = value

        stop()
      }
    },
  )

  return isLoaded
}
