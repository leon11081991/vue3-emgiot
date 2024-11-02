<script setup lang="ts">
import { ref, shallowRef, watchEffect } from 'vue'
import MessagePageHeader from '@/components/MessagePage/MessagePageHeader.vue'
import MessagePageSystemList from '@/components/MessagePage/MessagePageSystemList.vue'
import MessagePageOperationList from '@/components/MessagePage/MessagePageOperationList.vue'
// import { useI18n } from 'vue-i18n'

/* 非響應式變數 */
enum NotificationEnumType {
  SYSTEM, // 0 系統訊息
  OPERATION // 1 營業訊息
}
// const { t: $t } = useI18n()
const colorPrimary = '#1FA29A'

/* 響應式變數 */
const messageType = ref(NotificationEnumType.SYSTEM) //0=系統訊息 1=營業訊息
const tabListComponent = shallowRef()

watchEffect(() => {
  if (messageType.value === 0) {
    tabListComponent.value = MessagePageSystemList
  } else if (messageType.value === 1) {
    tabListComponent.value = MessagePageOperationList
  }
})
</script>

<template>
  <div class="message-page">
    <MessagePageHeader
      :color="colorPrimary"
      v-model:type="messageType"
    />
    <keep-alive>
      <component
        :is="tabListComponent"
        v-model:type="messageType"
      ></component>
    </keep-alive>
  </div>
</template>

<style lang="scss" scoped>
.tabInfo-header {
  display: flex;
  .tab-info {
    flex: 1;
  }
  .tab-item {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $--color-primary;
    border: 3px solid $--color-primary;
    border-radius: 6px;
    user-select: none;
    cursor: pointer;
    &.system {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    &.operation {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }
    &.active {
      color: $--color-white;
      background-color: $--color-primary;
    }
  }

  .info-checkbox {
    color: $--color-primary;
    font-size: 16px;
    &-container {
      padding: 0.75rem 1rem;
    }
    :deep(.ant-checkbox-inner) {
      width: 1.25rem;
      height: 1.25rem;
    }
    :deep(:where(.css-dev-only-do-not-override-8kgiqy).ant-checkbox .ant-checkbox-inner:after) {
      inset-inline-start: 22.5%;
    }
  }
}
</style>
