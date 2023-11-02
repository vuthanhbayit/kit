import { createSharedComposable } from '@vueuse/core'
import { isBrowser } from '@vt7/utils'
import { onMounted } from 'vue'

const SCROLL_BAR_STYLE_VARIABLE = '--scroll-bar-width'

const getScrollBarWidth = () => {
  return window.innerWidth - document.body.clientWidth
}

export const useLockScreen = createSharedComposable(() => {
  let subscribers = 0
  let isScroll = true

  onMounted(() => {
    document.body.style.setProperty(SCROLL_BAR_STYLE_VARIABLE, getScrollBarWidth() + 'px')
  })

  const onHiddenScrollBar = () => {
    if (!isBrowser) {
      return
    }

    subscribers++

    if (!isScroll) {
      return
    }

    document.body.style.paddingRight = `var(${SCROLL_BAR_STYLE_VARIABLE})`
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
