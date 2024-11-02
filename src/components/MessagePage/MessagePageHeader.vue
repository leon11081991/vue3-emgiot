<script setup lang="ts">
import { ref, watchEffect, defineModel } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { useMessagePage } from '@/composables/useMessagePage'

/* defineProps */
const props = defineProps<{
  color: string
}>()

/* 非響應式變數 */
enum NotificationEnumType {
  SYSTEM, // 0 系統訊息
  OPERATION // 1 營業訊息
}

const NotificationText_off = '關閉主動通知'
const { notificationSettingsInfo, getNotificationSettings, dispatchEnableNotification } =
  useMessagePage()

/* 響應式變數 */
const type = defineModel<number>('type')
const system_checked = ref(false)
const operation_checked = ref(false)

/* function */
const handleNotificationCheckboxChange = async (e: Event, type: NotificationEnumType) => {
  const target = e.target as HTMLInputElement
  const enable = target.checked
  const params = {
    messageType: type, //0=系統訊息 1=營業訊息
    enable: enable, //是否開啟通知
    subscription: enable ? '' : null // FCM的推播Token，如enable=false則給null
  }

  const res = await dispatchEnableNotification(params)
  if (res) {
    getNotificationSettings()
  }
}
getNotificationSettings()

watchEffect(() => {
  if (notificationSettingsInfo.value.data) {
    system_checked.value = notificationSettingsInfo.value.data?.systemNotificationEnable
    operation_checked.value = notificationSettingsInfo.value.data?.operationNotificationEnable
  }
})

// [WIP] FCM
</script>

<template>
  <div class="message-page">
    <div class="tabInfo-header">
      <div class="system-info tab-info">
        <div
          class="tab-item system"
          :class="{ active: type === NotificationEnumType.SYSTEM }"
          @click="type = NotificationEnumType.SYSTEM"
        >
          <BaseSvgIcon
            iconName="list"
            size="lg"
            :color="type === NotificationEnumType.SYSTEM ? 'white' : 'primary'"
          />
          系統訊息
        </div>
        <div class="info-checkbox-container">
          <a-config-provider
            :theme="{
              token: {
                colorPrimary: props.color
              }
            }"
          >
            <a-checkbox
              v-model:checked="system_checked"
              class="info-checkbox"
              @change="handleNotificationCheckboxChange($event, NotificationEnumType.SYSTEM)"
              >{{ NotificationText_off }}</a-checkbox
            >
          </a-config-provider>
        </div>
      </div>
      <div class="operation-info tab-info">
        <div
          class="tab-item operation"
          :class="{ active: type === NotificationEnumType.OPERATION }"
          @click="type = NotificationEnumType.OPERATION"
        >
          <BaseSvgIcon
            iconName="list"
            size="lg"
            :color="type === NotificationEnumType.OPERATION ? 'white' : 'primary'"
          />
          營業訊息
        </div>
        <div class="info-checkbox-container">
          <a-config-provider
            :theme="{
              token: {
                colorPrimary: props.color
              }
            }"
          >
            <a-checkbox
              v-model:checked="operation_checked"
              class="info-checkbox"
              @change="handleNotificationCheckboxChange($event, NotificationEnumType.OPERATION)"
              >{{ NotificationText_off }}</a-checkbox
            >
          </a-config-provider>
        </div>
      </div>
    </div>
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
      user-select: none;
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
