<script setup lang="ts">
import type { Tab } from '@/models/interfaces/tab.interface'
import type { DashboardTabType } from '@/models/types/dashboard.types'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

const segmentedTabProps = defineProps<{
  tabOptions: Tab<DashboardTabType>[]
}>()

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const selectedTab = defineModel<string>('selectedTab')

const handleChange = (value: string) => {
  emit('change', value)
}
</script>

<template>
  <a-segmented
    class="segmented-button"
    block
    :model-value="selectedTab"
    :options="segmentedTabProps.tabOptions"
    @change="handleChange"
  >
    <template #label="{ title, payload }">
      <template v-if="payload.icon">
        <BaseSvgIcon :iconName="payload.icon" />
        <div class="tab-label">{{ title }}</div>
      </template>
    </template>
  </a-segmented>
</template>

<style lang="scss" scoped></style>
