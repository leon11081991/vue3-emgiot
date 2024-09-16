import { message } from 'ant-design-vue';

export const useMessage = () => {

  const openMessage = (
    type: 'success' | 'error' | 'warning' | 'info' | 'loading',
    content: string,
    options: {
      customClass?: string,
      duration?: number,
      key?: string
    } = {},
    callback?: () => void
  ) => {

    const { customClass = '', duration = 3, key } = options

    const config = {
      content,
      class: customClass,
      duration,
      key,
    }

    message[type](config)

    // 過了 duration 秒後自動執行 callback
    if (duration) {
      setTimeout(() => {
        callback && callback()
      }, duration * 1000)
    }
  }

  return {
    openMessage
  }
}