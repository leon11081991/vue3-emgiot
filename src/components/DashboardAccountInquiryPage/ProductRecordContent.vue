<script setup lang="ts">
/* import */
import type { GetClawGoodsRecordResType } from '@/models/types/machine.types'
import { computed, ref } from 'vue'
import BaseLoading from '@/components/Base/BaseLoading.vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { useDate } from '@/composables/useDate'
import { RECENT_RECORDS_SELECT_OPTIONS } from '@/constants/common/select.const'

/* defineProps */
const props = withDefaults(
  defineProps<{
    data: GetClawGoodsRecordResType
    isLoading: boolean
  }>(),
  {
    data: () => [] as GetClawGoodsRecordResType,
    isLoading: true
  }
)

/* composables */
const { formatDate } = useDate()

/* refs */
const displayCount = ref<number>(3)

/* computed */
const records = computed(() => {
  const data = Array.isArray(props.data) ? props.data : [] // 確保是陣列
  return data.slice(0, displayCount.value)
})

/* functions */
const getDate = (date: string | null) => {
  if (!date) return ''
  return formatDate(date, 'YYYY-MM-DD')
}
</script>

<template>
  <div class="product-event-content">
    <div class="actions-container">
      <a-select
        class="record-select"
        v-model:value="displayCount"
        :options="RECENT_RECORDS_SELECT_OPTIONS"
      >
        <template #suffixIcon>
          <BaseSvgIcon iconName="dropdown" />
        </template>
      </a-select>

      <!-- 此階段暫時關閉此功能 -->
      <!-- <div class="switch-container">
        <a-switch v-model:checked="checked" />
        <span class="switch-label">過濾累保金額為0的記錄</span>
      </div> -->
    </div>
    <div class="records-container">
      <BaseLoading
        v-if="props.isLoading"
        position="absolute"
      />
      <a-empty v-if="!props.isLoading && !records?.length" />
      <ul
        v-if="!props.isLoading && records?.length > 0"
        class="record-list"
      >
        <li
          v-for="item in records"
          :key="`${item?.to}+${item?.from}`"
          class="record-item"
        >
          <div class="from">
            <div class="name">{{ item.from }}</div>
            <div class="date">{{ getDate(item.start) }}</div>
          </div>
          <BaseSvgIcon iconName="arrow-right" />
          <div class="to">
            <div class="name">{{ item.to }}</div>
            <div class="date">{{ getDate(item.end) }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.actions-container {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .ant-select {
    width: 50%;
  }
}

.record-select {
  :deep(.ant-select-selection-item) {
    color: $--color-primary;
  }
}

.switch-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: $--color-primary;
}

.records-container {
  position: relative;
  margin-top: 2rem;
  min-height: 200px;
}

.record-list {
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .record-item {
    padding: 0.5rem;
    display: flex;

    &:not(:last-child) {
      border-bottom: 1px solid $--color-gray-400;
    }

    .from,
    .to {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 0.5rem;
    }

    .name {
      color: $--color-primary;
    }

    .date {
      font-size: 0.75rem;
      color: $--color-gray-500;
    }
  }
}
</style>
