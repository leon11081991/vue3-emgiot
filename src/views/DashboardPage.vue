<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useHeader } from '@/composables/useHeader'

import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()
const { updateHeaderTitle } = useHeader()

const storeName = ref('')

onMounted(() => {
  storeName.value = '大寮光華店'

  updateHeaderTitle($t('DashboardPage.HeaderTitle') + storeName.value) // 設定動態 header title
})
</script>

<template>
  <div class="dashboard-page">
    <h1>Dashboard</h1>
  </div>
</template>

<style lang="scss" scoped></style>
