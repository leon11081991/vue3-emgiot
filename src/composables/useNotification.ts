import type { NotificationPlacement } from 'ant-design-vue'
import { notification, Result, Button } from 'ant-design-vue'
import { h } from 'vue'
import { getI18nTranslate } from '@/utils/i18nUtils'

export const useNotification = () => {
  /** 關閉通知 */
  const closeNotification = () => {
    notification.destroy()
  }

  /** 開啟通知 */
  const openNotification = (
    message: {
      title: string
      subTitle: string
    },
    status: 'success' | 'error' | 'info' | 'warning' = 'success',
    placement: NotificationPlacement = 'top',
    callback: () => void = closeNotification
  ) => {
    notification.open({
      message: '',
      description: h(Result, {
        class: 'status-notification',
        status: status,
        title: [
          h('h5', { class: 'title' }, message.title),
          h('p', { class: 'sub-title' }, message.subTitle)
        ],
        extra: h(
          Button,
          {
            type: 'primary',
            class: ['notification-button', `${status}`],
            onClick: callback
          },
          getI18nTranslate('Common.Notification.Button')
        )
      }),
      placement,
      duration: 300
    })
  }

  return {
    closeNotification,
    openNotification
  }
}
