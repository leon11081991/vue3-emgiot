<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@/composables/useAuth'
import { useMessage } from '@/composables/useMessage'
import { useNotification } from '@/composables/useNotification'
import { UtilCommon } from '@/utils/utilCommon'

const { t: $t } = useI18n()
const { fnSignUpValidate } = useAuth()
const { openMessage } = useMessage()
const { openNotification } = useNotification()

const query = UtilCommon.getQueryParam('input')
console.log('query', query)
onMounted(() => {
  if (!query) {
    openNotification(
      {
        title: $t('Common.Response.Error'),
        subTitle: `驗證失敗，請確認網址是否正確`
      },
      'error',
      'top',
      () => {
        UtilCommon.goPage('/login')
      }
    )
    return
  }

  fnSignUpValidate(query)
})
</script>

<template>
  <div>Validate Page</div>
</template>

<style lang="scss" scoped></style>
