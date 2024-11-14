<script setup lang="ts">
/* import */
import { useI18n } from 'vue-i18n'
import { ref, h, computed, watchEffect } from 'vue'
import { CaretDownOutlined } from '@ant-design/icons-vue'
import type { BaseGoodsResType } from '@/models/types/dropdown.type'
import type { SelectProps } from 'ant-design-vue'
import { useFetchStore } from '@/composables/useFetchStore'
import { useGoods } from '@/composables/useGoods'
import { useMessage } from '@/composables/useMessage'

/* type */
type GoodsProps = {
  modalVisible: boolean
  type: string
  goodsInfo: BaseGoodsResType
}

/* defineProps */
const props = defineProps<GoodsProps>()

/* defineEmits */
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'goods:refresh'): void
}>()

const { t: $t } = useI18n()

/* store 相關 */
const { storesListInfo, fetchStoresListInfo } = useFetchStore()
const { dispatchEditGoods, dispatchAddGoods } = useGoods()
const { openMessage } = useMessage()

/* 非響應式變數 */
const goodsNameInputMaxLen = 50
const showArrow = true

/* ref 變數 */
const size = ref<SelectProps['size']>('large')
const merchantAllowList = ref<string[]>([])
const isDropdownOpen = ref(false)
const goodsNameInput = ref('')
const goodsCost = ref<number | null>(null)
const isSpecial = ref<boolean>(false)

/* computed */
const modalTitle = computed(() =>
  props.type === 'edit'
    ? $t('ProductPage.Modal.AddEditGoods.Title.Edit')
    : props.type === 'add'
      ? $t('ProductPage.Modal.AddEditGoods.Title.Add')
      : ''
)

const customIcon = computed(() => {
  return h(CaretDownOutlined, {
    class: isDropdownOpen.value ? 'rotate-up' : ''
  })
})

const isGoodsNameLenOverRule = computed(() => goodsNameInput.value.length > goodsNameInputMaxLen)

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
const updateGoodsName = (e: Event) => {
  goodsNameInput.value = (e.target as HTMLInputElement).value
}

const updateGoodsCost = (e: Event) => {
  goodsCost.value = +(e.target as HTMLInputElement).value
}

const closeModal = () => {
  emit('close')
}

const handleDropdownVisibleChange = (open: boolean) => {
  isDropdownOpen.value = open
}

const fnHandleGoods = async (type: string) => {
  if (goodsNameInput.value.trim() === '') {
    openMessage('error', $t('ProductPage.Modal.AddEditGoods.Message.Empty'))
    return
  }

  if (isGoodsNameLenOverRule.value) {
    openMessage('error', $t('ProductPage.Modal.AddEditGoods.Message.LenOverRule'))
    return
  }

  const data = {
    goodsName: goodsNameInput.value,
    cost: goodsCost.value ?? 0,
    forbiddenStores: merchantNotAllowList.value,
    isSpecial: isSpecial.value
  }
  const res =
    type === 'edit'
      ? await dispatchEditGoods({ ...data, goodsId: props.goodsInfo.goodsId })
      : await dispatchAddGoods(data)

  if (res) {
    emit('goods:refresh')
  }
  closeModal()
}

const resetGoodsFields = () => {
  goodsNameInput.value = ''
  goodsCost.value = null
  isSpecial.value = false
  merchantAllowList.value = []
}

/* watchEffect */
watchEffect(() => {
  if (!props.modalVisible) return
  if (props.type === 'edit') {
    goodsNameInput.value = props.goodsInfo.goodsName
    goodsCost.value = props.goodsInfo.cost
    isSpecial.value = props.goodsInfo.isSpecial
    merchantAllowList.value = props.goodsInfo.forbiddenStores
  } else if (props.type === 'add') {
    resetGoodsFields()
  }
})

/* store 呼叫 */
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
        :class="{ error: isGoodsNameLenOverRule }"
        :value="goodsNameInput"
        :size="size"
        :placeholder="$t('ProductPage.Modal.AddEditGoods.Placeholder.GoodsName')"
        @change="updateGoodsName"
      />
    </div>
    <div
      class="name-input_count"
      :class="{ error: isGoodsNameLenOverRule }"
    >
      {{ goodsNameInput.length }} / {{ goodsNameInputMaxLen }}
    </div>
    <div class="action-container">
      <a-input
        class="cost-input"
        :value="goodsCost"
        :size="size"
        :placeholder="$t('ProductPage.Modal.AddEditGoods.Placeholder.GoodsCost')"
        @change="updateGoodsCost"
      />
    </div>
    <div class="action-container">
      <a-select
        class="merchant-selector"
        v-model:value="merchantAllowList"
        mode="multiple"
        :showArrow="showArrow"
        :placeholder="$t('ProductPage.Modal.AddEditGoods.Placeholder.MerchantAllowList')"
        style="width: 100%"
        :options="merchantOptions"
        :size="size"
        :suffixIcon="customIcon"
        @dropdownVisibleChange="handleDropdownVisibleChange"
      />
    </div>
    <div class="action-container">
      <div class="goodsType-title">{{ $t('ProductPage.Modal.AddEditGoods.Content.Title') }}</div>
      <a-radio-group
        v-model:value="isSpecial"
        class="goodsType"
      >
        <a-radio :value="false">{{
          $t('ProductPage.Modal.AddEditGoods.Content.IsNormal')
        }}</a-radio>
        <a-radio :value="true">{{
          $t('ProductPage.Modal.AddEditGoods.Content.IsSpecial')
        }}</a-radio>
      </a-radio-group>
    </div>
    <template #footer>
      <div class="action-container">
        <a-button
          type="primary confirm-btn btn"
          @click="fnHandleGoods(props.type)"
        >
          {{ $t(`ProductPage.Modal.AddEditGoods.Button.Confirm`) }}
        </a-button>
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
    font-size: 1rem;
    color: $--color-primary;
  }
}

.confirm-btn {
  width: 100%;
}
</style>
