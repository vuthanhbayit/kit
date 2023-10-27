import { isEqual } from '@vt7/utils'
import { type MapOldSources, type MapSources, watchWithFilter } from '@vueuse/core'
import type { WatchCallback, WatchOptions, WatchSource, WatchStopHandle } from 'vue'

export function watchShallow<T extends Readonly<WatchSource<unknown>[]>, Immediate extends Readonly<boolean> = false>(
  source: T,
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: WatchOptions,
): WatchStopHandle

export function watchShallow<T extends Readonly<WatchSource<unknown>[]>, Immediate extends Readonly<boolean> = false>(
  source: T,
  cb: WatchCallback<MapSources<T>, MapOldSources<T, Immediate>>,
  options?: WatchOptions,
): WatchStopHandle

export function watchShallow<T extends Record<any, any>, Immediate extends Readonly<boolean> = false>(
  source: T,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions,
): WatchStopHandle

export function watchShallow<T, Immediate extends Readonly<boolean> = false>(
  sources: WatchSource<T>,
  cb: WatchCallback<T, Immediate extends true ? T | undefined : T>,
  options?: WatchOptions,
): WatchStopHandle

export function watchShallow(source: any, callback: any, options?: WatchOptions): WatchStopHandle {
  return watchWithFilter(
    source,
    (newValue, oldValue) => {
      if (isEqual(newValue, oldValue)) {
        return
      }

      callback(newValue, oldValue)
    },
    options,
  )
}
