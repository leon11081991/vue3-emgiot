<script setup lang="ts">
import type {
  ClawOperationsInfoResType,
  CoinOperationsInfoResType
} from '@/models/types/dashboard.types'
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import SearchInput from '@/components/Base/SearchInput.vue'
import ReplenishCoinsModalContent from '@/components/DashboardPage/Modal/ReplenishCoinsModalContent.vue'
import { useFetchDashboard } from '@/composables/useFetchDashboard'
import { useDashboard } from '@/composables/useDashboard'
import { UtilCommon } from '@/utils/utilCommon'
import { getI18nTranslate } from '@/utils/i18nUtils'

type AmountMapping = {
  claw: ClawOperationsInfoResType['cumulativeAmount']
  coin: CoinOperationsInfoResType['coinExchanged']
}

const { t: $t } = useI18n()
const { fnUpdateMachineAction } = useFetchDashboard()
const { findItemData } = useDashboard()

const props = defineProps<{
  modalVisible: boolean
  listData: ClawOperationsInfoResType[] | CoinOperationsInfoResType[]
  selectedTab: 'claw' | 'coin'
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'refresh'): void
}>()

const minCount = 0

const isButtonLoading = ref<boolean>(false)
const modalStep = ref<number>(1)
const searchKeyword = ref<string>('')
const checkedPcbIdList = ref<string[]>([])
const count = ref<number>(minCount)
const machineType = computed(() => {
  return props.selectedTab === 'claw' ? 0 : 1
})
const pcbsList = computed(() => {
  return (props.listData || []).filter((item) => {
    return item.pcbName?.includes(searchKeyword.value) || ''
  })
})
const confirmList = computed(() => {
  return (props.listData || []).filter((item) => {
    return checkedPcbIdList.value.includes(item.pcbId) || ''
  })
})

const initStatus = (): void => {
  count.value = minCount
  searchKeyword.value = ''
  initCheckedList()
}

const initCheckedList = (): void => {
  checkedPcbIdList.value = []
}

const onClickCheckAll = <T extends ClawOperationsInfoResType | CoinOperationsInfoResType>(
  options: T[],
  checkedList: string[]
): void => {
  options.forEach((item) => {
    checkedList.push(item.pcbId)
  })
}

const onClickUncheckAll = (): void => {
  initCheckedList()
}

const closeModal = () => {
  modalStep.value = 1
  initStatus()
  emit('close')
}

const updateSearchKeyword = (val: string) => {
  searchKeyword.value = val
}

const changeModalStep = (val: number) => {
  isButtonLoading.value = true
  modalStep.value = val
  isButtonLoading.value = false
}

const updateCount = (value: number) => {
  count.value = value
}

const getDynamicAmount = <T extends 'claw' | 'coin'>(
  selectedTab: T,
  listData: T extends 'claw' ? ClawOperationsInfoResType[] : CoinOperationsInfoResType[],
  id: string
): AmountMapping[T] | number => {
  const item = findItemData(listData, id)
  if (!item) return 0

  if (selectedTab === 'claw' && 'cumulativeAmount' in item) {
    return item.cumulativeAmount
  }
  if (selectedTab === 'coin' && 'coinExchanged' in item) {
    return item.coinExchanged
  }
  return 0
}

const handleModalTitle = (modalStep: number, selectedTab: 'claw' | 'coin') => {
  let title = getI18nTranslate('DashboardPage.Modal.BatchModal.Title.Default')
  if (modalStep === 2) {
    title = getI18nTranslate(
      `DashboardPage.Modal.BatchModal.Title.${UtilCommon.firstCapitalize(selectedTab)}`
    )
  }

  return title
}

const handleSearch = (val: string) => {
  if (checkedPcbIdList.value.length > 0) {
    initCheckedList()
  }
  updateSearchKeyword(val)
}

const handleConfirmButtonDisabled = (modalStep: number): boolean => {
  if (modalStep === 1) {
    return checkedPcbIdList.value.length === 0
  }
  if (modalStep === 2) {
    return count.value === minCount
  }
  return false
}

const handleConfirmButtonClick = (modalStep: number) => {
  if (modalStep < 3) {
    changeModalStep(modalStep + 1)
    return
  }

  handleBatchAction(checkedPcbIdList.value, count.value)
}

const handleBatchAction = (pcbList: string[], count: number) => {
  isButtonLoading.value = true
  const action = machineType.value === 0 ? 'restock' : 'withdraw'
  fnUpdateMachineAction(pcbList, action, count)
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
</script>

<template>
  <a-modal
    :open="props.modalVisible"
    class="batch-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ handleModalTitle(modalStep, selectedTab) }}</span>
      </div>
    </template>

    <div class="batch-modal-content">
      <template v-if="modalStep === 1">
        <div class="search-action-container">
          <p class="search-action-title">
            {{ $t('DashboardPage.Modal.BatchModal.Step1.Content') }}
          </p>

          <SearchInput
            :search-value="searchKeyword"
            :placeholder="$t('DashboardPage.Modal.BatchModal.Step1.SearchPlaceholder')"
            @update:searchValue="handleSearch"
          />
        </div>

        <div class="action-container">
          <p class="action-text">
            {{ $t('DashboardPage.Modal.BatchModal.Selected', { count: checkedPcbIdList.length }) }}
          </p>

          <a-button
            ghost
            type="secondary"
            @click="onClickCheckAll(pcbsList, checkedPcbIdList)"
          >
            {{ $t('DashboardPage.Modal.BatchModal.Step1.Button.CheckAll') }}
          </a-button>
          <a-button
            ghost
            type="secondary"
            @click="onClickUncheckAll"
          >
            {{ $t('DashboardPage.Modal.BatchModal.Step1.Button.UncheckAll') }}
          </a-button>
        </div>

        <div class="batch-list">
          <a-checkbox-group
            v-if="pcbsList.length > 0"
            v-model:value="checkedPcbIdList"
          >
            <template
              v-for="option in pcbsList"
              :key="option.pcbId"
            >
              <a-checkbox :value="option.pcbId">
                <div class="checkbox-item">
                  <span
                    v-if="option.pcbGroupName"
                    class="group-tag"
                    >{{ option.pcbGroupName }}</span
                  >
                  <span class="name-text">{{ option.pcbName }}</span>
                </div>
              </a-checkbox>
            </template>
          </a-checkbox-group>
          <a-empty v-if="pcbsList.length === 0" />
        </div>
      </template>

      <template v-if="modalStep === 2">
        <ReplenishCoinsModalContent
          :count="count"
          @update:count="updateCount"
        />
      </template>

      <template v-if="modalStep === 3">
        <p class="confirmation-text">
          {{
            $t(
              `DashboardPage.Modal.BatchModal.Step3.Content.${UtilCommon.firstCapitalize(selectedTab)}`
            )
          }}
        </p>
        <ul class="confirmation-list">
          <li
            v-for="item in confirmList"
            :key="item.pcbId"
            class="confirmation-item"
          >
            <div class="name">
              <span
                v-if="item.pcbGroupName"
                class="group-name"
                >{{ item.pcbGroupName }}</span
              >
              <span class="machine-name">{{ item.pcbName }}</span>
            </div>

            <div class="count">
              <span class="count-label">{{
                $t(
                  `DashboardPage.Modal.BatchModal.Step3.CountLabel.${UtilCommon.firstCapitalize(selectedTab)}`
                ) + '：'
              }}</span>
              <div class="count-value-container">
                <span class="cumulativeAmount-num">
                  {{ getDynamicAmount(selectedTab, props.listData, item.pcbId) }}
                </span>
                <span>⭢</span>
                <span class="updated-num">
                  {{ getDynamicAmount(selectedTab, props.listData, item.pcbId) + count * 10 }}
                </span>
              </div>
            </div>
          </li>
        </ul>
      </template>
    </div>

    <template #footer>
      <div class="button-group">
        <a-button
          type="primary"
          size="large"
          :loading="isButtonLoading"
          :disabled="handleConfirmButtonDisabled(modalStep)"
          @click="handleConfirmButtonClick(modalStep)"
        >
          {{ $t('DashboardPage.Modal.BatchModal.Button.Confirm') }}
        </a-button>
        <a-button
          v-if="modalStep === 2"
          type="primary"
          size="large"
          ghost
          @click="closeModal"
        >
          {{ $t('DashboardPage.Modal.BatchModal.Button.Cancel') }}
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.search-action-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .search-action-title {
    color: $--color-gray-700;
  }
}

.action-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-block: 0.75rem;

  @include media-breakpoint-down(sm) {
    justify-content: space-between;
  }

  .action-text {
    color: $--color-gray-600;
  }
}

.batch-modal {
  .button-group {
    display: flex;

    & > button {
      flex: 1;
    }
  }
}

.batch-list {
  position: relative;
  min-height: 100px;
  padding-inline: 1.25rem;
  padding-top: 0.75rem;
  border-top: 1px solid $--color-gray-400;
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .checkbox-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .name-text {
        color: $--color-primary;
      }
    }
  }
}

.confirmation-text {
  color: $--color-gray-700;
}

.confirmation-list {
  margin-block: 1rem;

  .confirmation-item {
    padding: 0.5rem 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    &:not(:last-child) {
      border-bottom: 1px solid $--color-gray-500;
    }
  }

  .name {
    display: flex;
    align-items: center;
    gap: 0.5rem;
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

  .count {
    display: flex;
    color: $--color-primary;

    .count-value-container {
      display: flex;
      gap: 0.5rem;
    }
  }
}
</style>
