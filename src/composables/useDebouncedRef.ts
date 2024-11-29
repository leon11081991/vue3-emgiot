import { customRef } from 'vue'

/** 自定義ref防抖  */
export const useDebouncedRef = <T>(value: T, delay: number = 200) => {
  return customRef<T>((track, trigger) => {
    let timeout: ReturnType<typeof setTimeout>
    return {
      get() {
        track()
        return value
      },
      set(newValue: T) {
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          value = newValue
          trigger()
        }, delay)
      }
    }
  })
}
