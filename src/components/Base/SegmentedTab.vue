<script setup lang="ts">
import type { Tab } from '@/models/interfaces/tab.interface'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

const segmentedTabProps = defineProps<{
  selectedTab: string
  tabOptions: Tab<any>[]
}>()

const emit = defineEmits<{
  (e: 'update:selectedTab', value: string): void
}>()

const updateSelectedTab = (value: string) => {
  emit('update:selectedTab', value)
}
</script>

<template>
  <a-segmented
    class="segmented-button"
    block
    :model-value="segmentedTabProps.selectedTab"
    :options="segmentedTabProps.tabOptions"
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
