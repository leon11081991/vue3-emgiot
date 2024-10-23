<script setup lang="ts">
import type { SelectProps } from 'ant-design-vue'
import { ref, h, computed } from 'vue'
import { CaretDownOutlined } from '@ant-design/icons-vue'
// import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { useFetchStore } from '@/composables/useFetchStore'

const props = defineProps<{
  modalVisible: boolean
  type: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  // (e: 'update:checkedList', value: string[]): void
}>()

const { storesListInfo, fetchStoresListInfo } = useFetchStore()

/* 非響應式變數 */
const merchantNameInputMaxLen = 50
const showArrow = true

/* ref */
const size = ref<SelectProps['size']>('large')
const merchantAllowList = ref<string[]>([])
const isDropdownOpen = ref(false)
const merchantNameInput = ref('')
const isSpecial = ref<boolean>(false)

/* computed */
const modalTitle = computed(() =>
  props.type === 'edit' ? '編輯商品' : props.type === 'create' ? '新增商品' : ''
)

const customIcon = computed(() => {
  return h(CaretDownOutlined, {
    class: isDropdownOpen.value ? 'rotate-up' : ''
  })
})

const isMerchantNameLenOverRule = computed(
  () => +merchantNameInput.value.length > merchantNameInputMaxLen
)

const merchantOptions = computed(() => {
  return (
    storesListInfo.value.data?.stores?.map((store) => ({
      label: store.storeName,
      value: store.storeId
    })) ?? []
  )
})

const merchantNotAllowList = computed(() => {
  const allStoreIds = storesListInfo.value.data?.stores?.map((store) => store.storeId) ?? []
  return allStoreIds.filter((storeId) => !merchantAllowList.value.includes(storeId))
})

/* function */
const updateMerchantName = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  merchantNameInput.value = value
}

const closeModal = () => {
  emit('close')
}

const handleDropdownVisibleChange = (open: boolean) => {
  isDropdownOpen.value = open
}

fetchStoresListInfo()
</script>

<template>
  <a-modal
    :open="props.modalVisible"
    class="batch-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ modalTitle }}</span>
      </div>
    </template>
    <div class="action-container">
      <a-input
        class="name-input"
        :class="{ error: isMerchantNameLenOverRule }"
        :size="size"
        placeholder="請輸入名稱"
        @change="updateMerchantName"
      >
      </a-input>
    </div>
    <div
      class="name-input_count"
      :class="{ error: isMerchantNameLenOverRule }"
    >
      {{ merchantNameInput.length }} / {{ merchantNameInputMaxLen }}
    </div>
    <div class="action-container">
      <a-input
        class="cost-input"
        :size="size"
        placeholder="請輸入商品成本"
      >
      </a-input>
    </div>
    <div class="action-container">
      <a-select
        class="merchant-selector"
        v-model:value="merchantAllowList"
        mode="multiple"
        :showArrow="showArrow"
        placeholder="商家勾選"
        style="width: 100%"
        :options="merchantOptions"
        :size="size"
        :suffixIcon="customIcon"
        @dropdownVisibleChange="handleDropdownVisibleChange"
      >
      </a-select>
    </div>
    <div class="action-container">
      <div class="goodsType-title">{{ '商品種類' }}</div>
      <a-radio-group
        v-model:value="isSpecial"
        class="goodsType"
      >
        <a-radio :value="false">{{ '一般商品' }}</a-radio>
        <a-radio :value="true">{{ '特殊商品' }}</a-radio>
      </a-radio-group>
    </div>
    <template #footer>
      <div class="action-container">
        <a-button
          type="primary confirm-btn btn"
          @click="closeModal"
          >確定</a-button
        >
      </div>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.modal-title {
  font-size: 16px;
}

.action-container {
  padding: 0.5rem 1rem;
  .action-item {
    display: flex;
    align-items: center;
    column-gap: 16px;
    font-size: 16px;
    user-select: none;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    background-color: rgba(0, 0, 0, 0);
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }

  .name-input {
    background-color: rgba(0, 0, 0, 0);
  }

  .cost-input {
    background-color: rgba(0, 0, 0, 0);
  }

  :deep(.ant-select-selection-placeholder),
  :deep(.ant-select-arrow) {
    color: $--color-primary;
  }
}

.name-input_count {
  padding: 0 1rem;
  color: $--color-update-time;
  text-align: right;
}

.rotate-up {
  transition: transform 0.3s ease;
  transform: rotate(180deg); /* 旋轉 180 度 */
}

.error {
  color: var(--color-error);
  border-color: var(--color-error);
}

.goodsType {
  &-title {
    font-size: 16px;
    font-weight: 400;
    color: $--color-border;
  }
  :deep(.ant-radio-wrapper) {
    font-size: 16px;
    color: $--color-primary;
  }
}

.confirm-btn {
  width: 100%;
}
</style>
