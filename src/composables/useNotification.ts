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
      title?: string
      subTitle: string
    },
    status: 'success' | 'error' | 'info' | 'warning' = 'success',
    placement: NotificationPlacement = 'top',
    callback: () => void = closeNotification,
    options: {
      hasIcon: boolean
      hasClose?: boolean
    } = {
      hasIcon: true,
      hasClose: true
    }
  ) => {
    notification.open({
      message: '',
      description: h(Result, {
        class: ['status-notification', !options.hasIcon ? 'no-icon' : ''],
        status: status,
        icon: options.hasIcon ? undefined : null,
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
      top: placement === 'top' ? '50%' : undefined,
      style: {
        transform: placement === 'top' ? 'translateY(-50%)' : undefined
      },
      closeIcon: options.hasClose ? undefined : null,
      duration: 300
    })
  }

  return {
    closeNotification,
    openNotification
  }
}
