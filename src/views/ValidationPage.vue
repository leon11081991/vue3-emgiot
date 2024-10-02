<script setup lang="ts">
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuth } from '@/composables/useAuth'
import { useNotification } from '@/composables/useNotification'
import { UtilCommon } from '@/utils/utilCommon'

// composables
const { t: $t } = useI18n()
const { fnSignUpValidate } = useAuth()
const { openNotification } = useNotification()

const query = UtilCommon.getQueryParam('input')

// lifecycle hooks
onMounted(() => {
  if (!query) {
    openNotification(
      {
        title: $t('Common.Response.Error'),
        subTitle: $t('ErrorMessage.ValidateFail')
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
  <div class="validate-page">Validate Page</div>
</template>

<style lang="scss" scoped>
.validate-page {
  opacity: 0;
}
</style>
