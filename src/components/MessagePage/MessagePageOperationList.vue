<script setup lang="ts">
import { ref, watchEffect, onMounted, onBeforeUnmount } from 'vue'
import { useMessagePage } from '@/composables/useMessagePage'
import { useDate } from '@/composables/useDate'

/* 非響應式變數 */
const { notificationInfo, getNotificationInfo } = useMessagePage()
const { getTargetDateTime } = useDate()

/* 響應式變數 */
const type = defineModel<number>('type')
const pageIndex = ref(1)
const observer = ref(null)

/* function */
const createObserver = () => {
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      if (!notificationInfo.value.data.hasNextPage) {
        intersectionObserver.disconnect()
        return
      }
      if (entries[0].isIntersecting) {
        pageIndex.value += 1
      }
    },
    { threshold: 0 }
  )

  if (observer.value) {
    intersectionObserver.observe(observer.value)
  }

  onBeforeUnmount(() => {
    intersectionObserver.disconnect()
  })
}

watchEffect(() => {
  if (pageIndex.value) {
    getNotificationInfo({
      messageType: type.value || 1,
      pageIndex: pageIndex.value
    })
  }
})

onMounted(() => {
  createObserver()
})
</script>

<template>
  <div class="list message-list">
    <div class="list-header message-list-header">
      <div class="header-item machineName">{{ '機台' }}</div>
      <div class="header-item eventName">{{ 'event.content' }}</div>
      <div class="header-item date">{{ '時間' }}</div>
    </div>
    <div class="list-body">
      <div
        class="list-body-item"
        v-for="item in notificationInfo.data.items"
        :key="item.eventId"
      >
        <div class="item-section">
          <div class="machineInfo">
            <div class="storeName">
              {{ item.storeName }}
            </div>
            <div class="machineName">
              {{ item.machineName }}
            </div>
          </div>
        </div>
        <div class="item-section">
          {{ item.eventContent }}
        </div>
        <div class="item-section">
          {{ getTargetDateTime(item.date) }}
        </div>
      </div>
    </div>
    <div ref="observer"></div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  padding-top: 2rem;

  .list-header {
    display: grid;
    padding: 0.75rem 24px;
    background-color: $--color-secondary-light;
    border-top-left-radius: $--border-radius-middle;
    border-top-right-radius: $--border-radius-middle;

    .header-item {
      flex: 1;
      font-size: 0.875rem;
      color: $--color-white;
      text-align: center;
    }
  }

  .message-list-header {
    grid-template-columns: 1fr 1fr 1fr;
  }

  .flex-1 {
    flex: 1;
  }

  .flex-2 {
    flex: 2;
  }

  :deep(.ant-list-item-action) {
    flex: 1;
    margin-left: 0;
    text-align: center;
  }

  .list-item {
    text-align: center;
  }
  .list-body {
    &-item {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      padding: 0.75rem;
      border-bottom: 1px solid #c8c8c8;
    }
  }
  .list-body-item:last-of-type {
    border-bottom: none;
  }
}

.item-section {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: $--color-primary;
}

.machineInfo {
  .storeName {
    flex-shrink: 0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    color: #fff;
    background: $--color-Tab-bg;
  }
  .machineName {
    padding: 0.25rem;
    color: $--color-primary;
  }
}
</style>
