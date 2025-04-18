<script setup lang="ts">
import type { StoreInfoStorageDataType, BaseWifiInfoReqType } from '@/models/types/store.types'
import { ref, computed, onMounted } from 'vue'
import type { BaseCreateStoreReqType } from '@/models/types/store.types'
import { useHeader } from '@/composables/useHeader'
import { useFetchStore } from '@/composables/useFetchStore'
import { useMessage } from '@/composables/useMessage'
import { useI18n } from 'vue-i18n'
import { UtilCommon } from '@/utils/utilCommon'

const props = defineProps<{
  modalVisible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

// store 相關
const { t: $t } = useI18n()
const { updateHeaderTitle } = useHeader()
const { updateStore } = useFetchStore()
const { openMessage } = useMessage()

const storeNameMaxLen = 10
const storeName = ref<string>(
  UtilCommon.getLocalStorage<StoreInfoStorageDataType>('store-info')?.storeName || ''
)
const wifiInfo = ref<BaseWifiInfoReqType>({
  wifiSSID:
    UtilCommon.getLocalStorage<StoreInfoStorageDataType>('store-info')?.wifiInfo[0]?.wifiSSID || '',
  wifiPassword:
    UtilCommon.getLocalStorage<StoreInfoStorageDataType>('store-info')?.wifiInfo[0]?.wifiPassword ||
    ''
})

const storeModalDataRest = () => {
  isStoreNameExisted.value = false
}

const closeModal = () => {
  storeModalDataRest()
  emit('close')
}

const isStoreNameExisted = ref(false)
const isStoreNameLenOverRule = computed(() => +storeName.value.length > storeNameMaxLen)
const storeExistMessage = computed(() => (isStoreNameExisted.value ? '你已建立過相同名稱店家' : ''))

const updateStoreValue = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  storeName.value = value
}

const updateWifiSSID = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  wifiInfo.value.wifiSSID = value
}

const updateWifiPassword = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  wifiInfo.value.wifiPassword = value
}

const fnUpdateStoreInfo = async () => {
  if (storeName.value.trim() === '') {
    openMessage('error', $t('DashboardPage.Modal.UpdateStore.Message.StoreNameRequired'))
    return
  }

  if (wifiInfo.value.wifiSSID.trim() === '' || wifiInfo.value.wifiPassword.trim() === '') {
    openMessage('error', $t('DashboardPage.Modal.UpdateStore.Placeholder.Empty'))
    return
  }

  const params: BaseCreateStoreReqType = {
    storeName: storeName.value,
    wifiInfo: wifiInfo.value.wifiSSID && wifiInfo.value.wifiPassword ? [wifiInfo.value] : []
  }
  const res = await updateStore(params)

  if (res) {
    UtilCommon.setLocalStorage<StoreInfoStorageDataType>('store-info', {
      storeId: UtilCommon.getLocalStorage<StoreInfoStorageDataType>('store-info')?.storeId || '',
      storeName: storeName.value,
      wifiInfo: [wifiInfo.value]
    })
    updateHeaderTitle($t('DashboardPage.HeaderTitle') + storeName.value) // 設定動態 header title
    closeModal()
  } else {
    isStoreNameExisted.value = true
  }
}

onMounted(() => {
  const storeName =
    UtilCommon.getLocalStorage<StoreInfoStorageDataType>('store-info')?.storeName || ''
  updateHeaderTitle($t('DashboardPage.HeaderTitle') + storeName)
})
</script>

<template>
  <a-modal
    :open="props.modalVisible"
    class="addStore-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ $t('DashboardPage.Modal.UpdateStore.Title') }}</span>
      </div>
    </template>

    <div class="createStore-action-container">
      <a-input
        class="createStore-input"
        :value="storeName"
        :class="{ error: isStoreNameLenOverRule || isStoreNameExisted }"
        :placeholder="$t('DashboardPage.Modal.UpdateStore.Placeholder.StoreName')"
        @change="updateStoreValue"
      >
      </a-input>
      <div
        class="createStore-extraInfo"
        :class="{ error: isStoreNameLenOverRule || isStoreNameExisted }"
      >
        <span>{{ storeExistMessage }}</span>
        <span class="ml-auto">{{ storeName.length }} / {{ storeNameMaxLen }}</span>
      </div>
      <a-input
        class="createStore-input"
        :value="wifiInfo.wifiSSID"
        :placeholder="$t('DashboardPage.Modal.UpdateStore.Placeholder.WifiSSID')"
        @change="updateWifiSSID"
        @keyup.enter="fnUpdateStoreInfo"
      >
      </a-input>
      <a-input
        class="createStore-input"
        :value="wifiInfo.wifiPassword"
        :placeholder="$t('DashboardPage.Modal.UpdateStore.Placeholder.WifiPassword')"
        @change="updateWifiPassword"
        @keyup.enter="fnUpdateStoreInfo"
      >
      </a-input>
      <span class="wifiFormatHint">
        {{ $t('DashboardPage.Modal.UpdateStore.Placeholder.WifiFormatRemindText') }}
      </span>
    </div>

    <template #footer>
      <a-button
        class="confirm-btn"
        type="primary"
        @click="fnUpdateStoreInfo"
      >
        {{ $t('DashboardPage.Modal.UpdateStore.Button.Confirm') }}
      </a-button>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.createStore-action-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .createStore-input {
    padding: 0.75rem 0.5rem;
    font-size: 16px;
    background-color: var(--color-transparent);
  }

  .createStore-extraInfo {
    display: flex;
    color: $--color-gray-600;
  }

  .error {
    color: var(--color-error);
    border-color: var(--color-error);
  }

  .ml-auto {
    margin-left: auto;
  }
}

.action-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-block: 0.75rem;

  @include media-breakpoint-down(sm) {
    justify-content: space-between;
  }

  .action-text {
    color: $--color-gray-600;
  }
}

.addStore-modal {
  .confirm-btn {
    width: 100%;
  }
}

.wifiFormatHint {
  padding-left: 1rem;
}
</style>
