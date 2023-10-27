import { isBrowser } from './is'

const root = (isBrowser ? window : global) as unknown as Window

export const FRAME_TIME = 16

let previousTimestamp = Date.now()

const rafPolyfill = (callback: FrameRequestCallback): number => {
  const currentTimestamp = Date.now()
  const delay = Math.max(0, FRAME_TIME - (currentTimestamp - previousTimestamp))
  const id = setTimeout(callback, delay)

  previousTimestamp = currentTimestamp + delay

  return id
}

const requestAnimationFrame = root.requestAnimationFrame || rafPolyfill
const cancelAnimationFrame = root.cancelAnimationFrame || root.clearTimeout

export const raf = requestAnimationFrame

export const cancelRaf = (id: number) => {
  cancelAnimationFrame(id)
}
