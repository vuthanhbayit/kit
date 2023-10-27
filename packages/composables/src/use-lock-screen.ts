import { createSharedComposable } from '@vueuse/core'
import { isBrowser } from '@vt7/utils'

const getScrollBarWidth = () => {
  return window.innerWidth - document.body.clientWidth
}

export const useLockScreen = createSharedComposable(() => {
  let subscribers = 0
  let isScroll = true

  const onHiddenScrollBar = () => {
    if (!isBrowser) {
      return
    }

    subscribers++

    if (!isScroll) {
      return
    }

    document.body.style.paddingRight = getScrollBarWidth() + 'px'
    document.body.style.overflowY = 'hidden'
    document.body.style.touchAction = 'none'
    isScroll = false
  }

  const onShowScrollBar = () => {
    if (!isBrowser || isScroll) {
      return
    }

    subscribers--

    if (subscribers > 0) {
      return
    }

    document.body.style.paddingRight = ''
    document.body.style.overflowY = ''
    document.body.style.touchAction = ''
    isScroll = true
  }

  return {
    onHiddenScrollBar,
    onShowScrollBar,
  }
})
