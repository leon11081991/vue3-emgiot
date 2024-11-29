<script setup lang="ts">
import type {
  ClawOperationsInfoResType,
  CoinOperationsInfoResType
} from '@/models/types/dashboard.types'
import type { DashboardModalType } from '@/models/types/modal.types'
import { useI18n } from 'vue-i18n'
import { ref, computed, onMounted } from 'vue'
import BaseLoading from '@/components/Base/BaseLoading.vue'
import SearchInput from '@/components/Base/SearchInput.vue'
import { useFetchDropdown } from '@/composables/useFetchDropdown'
import { useDashboardPage } from '@/composables/useDashboardPage'
import { useFetchPcbRegister } from '@/composables/useFetchPcbRegister'

const { t: $t } = useI18n()
const { goodsDDLList, fetchGoodsDDLList } = useFetchDropdown()
const { findItemData } = useDashboardPage()
const { fnUpdateGoods } = useFetchPcbRegister()

const props = defineProps<{
  modalVisible: boolean
  listData: ClawOperationsInfoResType[] | CoinOperationsInfoResType[]
  selectedMachineId: string | string[] | null
  selectedTab: 'claw' | 'coin'
}>()

const emit = defineEmits<{
  (e: 'openModal', type: DashboardModalType, machineType?: 0 | 1): void
  (e: 'close'): void
  (e: 'refresh'): void
}>()

const isButtonLoading = ref<boolean>(false)
const searchKeyword = ref<string>('')
const checked = ref<string>('')
const goodsList = computed(() => {
  return goodsDDLList.value.data.filter((item) => item.goodsName.includes(searchKeyword.value))
})
const itemData = computed(() => {
  if (props.selectedTab === 'claw' && Array.isArray(props.listData)) {
    const foundItem = findItemData(
      props.listData as ClawOperationsInfoResType[],
      props.selectedMachineId as string
    )
    return foundItem ?? ({} as ClawOperationsInfoResType)
  }

  return {} as ClawOperationsInfoResType
})

const initStatus = (): void => {
  checked.value = ''
  searchKeyword.value = ''
}

const updateSearchKeyword = (val: string) => {
  searchKeyword.value = val
}

const closeModal = () => {
  emit('close')
}

const handleSearch = (val: string) => {
  if (checked.value) {
    checked.value = ''
  }
  updateSearchKeyword(val)
}

const onConfirm = () => {
  isButtonLoading.value = true
  fnUpdateGoods({
    pcbId: props.selectedMachineId as string,
    goodsId: checked.value
  })
    .then((resp) => {
      if (!resp) return
      initStatus()
      emit('refresh')
      closeModal()
    })
    .finally(() => {
      isButtonLoading.value = false
    })
}

onMounted(() => {
  fetchGoodsDDLList()
})
</script>

<template>
  <a-modal
    :open="props.modalVisible"
    class="change-product-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ $t('DashboardPage.Modal.ChangeProduct.Title') }}</span>
      </div>
    </template>

    <div class="change-product-modal-content">
      <div class="goods-info-container">
        <div class="top">
          <span
            v-if="itemData?.pcbGroupName"
            class="group-name"
            >{{ itemData?.pcbGroupName }}</span
          >
          <span class="machine-name">{{ itemData?.pcbName }}</span>
        </div>
        <div class="bottom">
          <div
            v-if="(itemData as ClawOperationsInfoResType)?.goodsName"
            class="goods-name"
          >
            {{ (itemData as ClawOperationsInfoResType)?.goodsName }}
          </div>
        </div>
      </div>

      <SearchInput
        :search-value="searchKeyword"
        :placeholder="$t('DashboardPage.Modal.ChangeProduct.SearchPlaceholder')"
        @update:searchValue="handleSearch"
      />

      <div class="goods-list-container">
        <a-empty v-if="goodsList.length === 0" />
        <BaseLoading v-if="goodsList.length > 0 && goodsDDLList.isLoading" />
        <a-radio-group
          v-if="goodsList.length > 0 && !goodsDDLList.isLoading"
          v-model:value="checked"
          name="goodsList"
        >
          <a-radio
            v-for="item in goodsList"
            :key="item.goodsId"
            :value="item.goodsId"
          >
            {{ item.goodsName }}
          </a-radio>
        </a-radio-group>
      </div>
    </div>

    <template #footer>
      <div class="button-group">
        <a-button
          type="primary"
          size="large"
          :disabled="!checked"
          :loading="isButtonLoading"
          @click="onConfirm"
        >
          {{ $t('DashboardPage.Modal.ChangeProduct.Button.Confirm') }}
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.change-product-modal {
  .ant-radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .button-group {
    display: flex;

    & > button {
      flex: 1;
    }
  }
}

.change-product-modal-content {
  .goods-info-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    margin-block: 1rem;

    .top {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.5rem;
    }
  }
  .group-name {
    padding: 4px 0.5rem;
    background-color: $--color-primary;
    color: $--color-white;
    border-radius: $--border-radius-middle;
  }

  .machine-name {
    color: $--color-primary;
  }

  .goods-name {
    padding: 0.25rem 1rem;
    color: $--color-primary;
    background-color: $--color-white;
    border: 1px solid $--color-gray-500;
    border-radius: $--border-radius-middle;
  }
}

.goods-list-container {
  margin: 1rem 1.5rem;
}
</style>
