<script setup lang="ts">
/* import */
import type { Tab } from '@/models/interfaces/tab.interface'
import type { DashboardTabType, AccountInquiryTabType } from '@/models/types/dashboard.types'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

/* props(defineProps) */
const segmentedTabProps = defineProps<{
  tabOptions: Tab<DashboardTabType | AccountInquiryTabType>[]
}>()

/* emits(defineEmits) */
const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

/* defineModel */
const selectedTab = defineModel<string>('selectedTab')

/* functions */
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
