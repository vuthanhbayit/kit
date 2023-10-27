import { ref, type Ref, type MaybeRef } from 'vue'

export const useVisible = (
  defaultVisible: MaybeRef<boolean> = false,
): {
  visible: Ref<boolean>
  open: () => boolean
  close: () => boolean
  toggle: () => boolean
} => {
  const visible = ref(defaultVisible)

  const open = () => (visible.value = true)
  const close = () => (visible.value = false)
  const toggle = () => (visible.value = !visible.value)

  return {
    visible,
    open,
    close,
    toggle,
  }
}
