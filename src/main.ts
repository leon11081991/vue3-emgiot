import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAppRouter } from '@/router/index'
import { storagePlugin } from '@/stores/storage-plugin'
import App from './App.vue'

import Antd from 'ant-design-vue'
import i18n from '@/plugins/i18n'
import versionPlugin from '@/plugins/version'
import 'virtual:svg-icons-register'
import { Quasar, QDate } from 'quasar'
import { useLocale } from '@/composables/useLocale'
import langTw from 'quasar/lang/zh-TW'
import langEn from 'quasar/lang/en-US' // 英文

import 'ant-design-vue/dist/reset.css'
import '@/assets/normalize.css'

const { router } = createAppRouter()
const pinia = createPinia()
pinia.use(storagePlugin)

const app = createApp(App)

app.use(Antd)
app.use(pinia)
app.use(router)
app.use(i18n)
app.use(versionPlugin)
app.use(Quasar, {
  components: { QDate },
  lang: useLocale() === 'tw' ? langTw : langEn
})

app.config.warnHandler = () => null
app.mount('#app')
