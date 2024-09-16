<script setup lang="ts">
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

const updateRecordProps = defineProps<{
  date: string
  time: string
}>()

const updateRecordEmit = defineEmits<{
  (e: 'update'): void
}>()

const updateClick = () => {
  updateRecordEmit('update')
}
</script>

<template>
  <div class="update-record-container">
    <div class="record-detail">
      <div class="updated-time">
        <span>更新時間</span>
        <span class="date">{{ updateRecordProps.date }}</span>
        <span class="time">{{ updateRecordProps.time }}</span>
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
