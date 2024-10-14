<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFetchStore } from '@/composables/useFetchStore'
import type { BaseCreateStoreReqType } from '@/models/types/store.types'

const props = defineProps<{
  modalVisible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:storeList'): void
}>()

// store 相關
const { createNewStore } = useFetchStore()

const storeNameMaxLen = 10
const storeName = ref('')

const storeModalDataRest = () => {
  storeName.value = ''
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

const fnCreateNewStore = async () => {
  if (storeName.value.trim() === '') {
    alert('輸入不得為空')
    return
  }

  const params: BaseCreateStoreReqType = {
    storeName: storeName.value,
    wifiInfo: [] // create could be empty array
  }
  const res = await createNewStore(params)

  if (res) {
    emit('update:storeList')
    closeModal()
  } else {
    isStoreNameExisted.value = true
  }
}
</script>

<template>
  <a-modal
    :open="props.modalVisible"
    class="addStore-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ '新增店家' }}</span>
      </div>
    </template>

    <div class="createStore-action-container">
      <a-input
        class="createStore-input"
        :value="storeName"
        :class="{ error: isStoreNameLenOverRule || isStoreNameExisted }"
        placeholder="請輸入名稱"
        @change="updateStoreValue"
        @keyup.enter="fnCreateNewStore"
      >
      </a-input>
      <div
        class="createStore-extraInfo"
        :class="{ error: isStoreNameLenOverRule || isStoreNameExisted }"
      >
        <span>{{ storeExistMessage }}</span>
        <span class="ml-auto">{{ storeName.length }} / {{ storeNameMaxLen }}</span>
      </div>
    </div>

    <template #footer>
      <a-button
        class="confirm-btn"
        type="primary"
        @click="fnCreateNewStore"
      >
        {{ '確認' }}
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
</style>
