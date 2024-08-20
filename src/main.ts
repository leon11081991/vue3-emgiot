import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createAppRouter } from '@/router/index'
import App from './App.vue'

import i18n from '@/plugins/i18n'
import versionPlugin from '@/plugins/version'

import '@/assets/normalize.css'

const { router } = createAppRouter()
const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(i18n)
app.use(versionPlugin)

app.mount('#app')
