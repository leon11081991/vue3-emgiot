<script setup lang="ts">
/* import */
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { onMounted } from 'vue'
import { env } from '@/env'
import { useGoogleAuth } from '@/composables/useGoogleAuth'
import { useToken } from '@/composables/useToken'
import { useUserStore } from '@/stores/user.stores'
import { UtilCommon } from '@/utils/utilCommon'

/* props(defineProps) */
const props = defineProps<{
  text: string
}>()

/* emits(defineEmits) */
const emit = defineEmits<{
  (e: 'googleVerify', credential: string): void
}>()

// 解碼 JWT 的函數
const parseJwt = (token: string) => {
  var base64Url = token.split('.')[1]
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
  return JSON.parse(jsonPayload)
}

// 當收到 Google 返回的 credential 時的回調函數
const handleCredentialResponse = (response: any) => {
  if (response && response.credential) {
    const thirdPartyData = parseJwt(response.credential)

    UtilCommon.setLocalStorage('from-third-party-id', thirdPartyData.sub)
    UtilCommon.setLocalStorage('from-third-party-type', '1')

    emit('googleVerify', response.credential) // 將 credential 發送給父組件
  } else {
    console.error('No credential returned from Google')
  }
}

/* life cycle */
onMounted(() => {
  window.google.accounts.id.initialize({
    client_id: env.googleClientId, // Google API Client ID
    callback: handleCredentialResponse,
    context: 'signin'
  })

  const googleButton = document.getElementById('google-sign-in-button') as HTMLElement
  window.google.accounts.id.renderButton(googleButton, {
    size: 'large'
  })
})
</script>

<template>
  <a-button
    class="third-party-btn"
    type="third-party"
  >
    <template #icon>
      <BaseSvgIcon
        iconName="logo-google"
        size="lg"
      />
    </template>
    <span class="text">{{ props.text }}</span>
    <div id="google-sign-in-button"></div>
  </a-button>
</template>

<style lang="scss" scoped>
.third-party-btn {
  position: relative;
  width: 100%;
}

.third-party-btn {
  :deep(.text) {
    flex: 1;
  }
}

#google-sign-in-button {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
}
</style>
