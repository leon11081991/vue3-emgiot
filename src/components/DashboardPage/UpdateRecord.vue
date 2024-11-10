<script setup lang="ts">
/* import */
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { useDate } from '@/composables/useDate'

/* defineEmit */
const updateRecordEmit = defineEmits<{
  (e: 'update'): void
}>()

/* i18n */
const { t: $t } = useI18n()

/* ref 變數 */
const updateTime = ref('')

// 初始化日期
const { getCurrentDateTime } = useDate()
updateTime.value = getCurrentDateTime()

/* function */
const updateClick = () => {
  updateTime.value = getCurrentDateTime()
  updateRecordEmit('update')
}
</script>

<template>
  <div class="update-record-container">
    <div class="record-detail">
      <div class="updated-time">
        <span>{{ $t('Common.UpdateRecord.Label') }} {{ updateTime }}</span>
      </div>
      <div
        class="update-button"
        @click="updateClick"
      >
        <BaseSvgIcon
          iconName="refresh"
          color="secondary"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.update-record-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-block: 1rem;
  font-size: 0.875rem;
  color: $--color-gray-600;

  .record-detail {
    display: flex;
    align-items: center;
  }

  .updated-time {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .update-button {
    cursor: pointer;
  }
}
</style>
