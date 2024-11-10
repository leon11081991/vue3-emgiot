<script setup lang="ts">
import type { Tab } from '@/models/interfaces/tab.interface'
import type { MachineType } from '@/models/types/machine.types'
import type { AccountInquiryTabType } from '@/models/types/dashboard.types'
import type {
  ClawOperationsDetailResType,
  CoinOperationsDetailResType,
  GetClawGoodsRecordResType,
  MachineEventRecordsResType
} from '@/models/types/machine.types'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { type DefineComponent, ref, onMounted, defineAsyncComponent, computed } from 'vue'
import RevenueCard from '@/components/DashboardAccountInquiryPage/RevenueCard.vue'
import UpdateRecord from '@/components/DashboardPage/UpdateRecord.vue'
import SegmentedTab from '@/components/Base/SegmentedTab.vue'
import AccountInquiryContent from '@/components/DashboardAccountInquiryPage/AccountInquiryContent.vue'
import AccountInquiryFilterModal from '@/components/DashboardAccountInquiryPage/Modal/AccountInquiryFilterModal.vue'
import { useModal } from '@/composables/useModal'
import { useHeader } from '@/composables/useHeader'
import { useDashboard } from '@/composables/useDashboard'
import { useFetchDashboard } from '@/composables/useFetchDashboard'
import { useDate } from '@/composables/useDate'
import { createAccountInquiryTabs } from '@/constants/dashboard.const'

/* type */
type AccountInquiryTabCompType = DefineComponent<
  {
    data: ClawOperationsDetailResType | CoinOperationsDetailResType
    isLoading: boolean
    machineType: MachineType
  },
  {},
  {},
  any
>
type ProductRecordTabCompType = DefineComponent<
  { data: GetClawGoodsRecordResType; isLoading: boolean },
  {},
  {},
  any
>
type EventRecordTabCompType = DefineComponent<
  { data: MachineEventRecordsResType; isLoading: boolean },
  {},
  any
>

/* 非響應式變數 */
const { t: $t } = useI18n()
const route = useRoute()
const { updateHeaderTitle } = useHeader()
const { storeName } = useDashboard()
const {
  clawOperationsDetailRecords,
  coinOperationsDetailRecords,
  clawGoodsRecords,
  machineEventRecords,
  fnGetClawOperationsDetail,
  fnGetCoinOperationsDetail,
  fnGetClawGoodsRecord,
  fnGetMachineEventRecord
} = useFetchDashboard()
const { modalVisible, openModal, closeModal } = useModal()
const { today, calculateDate } = useDate()
const initialEndDate = today()
const initialStartDate = calculateDate(initialEndDate, 'backward', 7)
const endDate = ref(initialEndDate)
const startDate = ref(initialStartDate)
const machineType: MachineType = route.params.machineType as MachineType
const pcbId = route.params.pcbId as string

/* 子組件 ref */
const tabComps: Record<
  AccountInquiryTabType,
  AccountInquiryTabCompType | ProductRecordTabCompType | EventRecordTabCompType
> = {
  accountInquiry: AccountInquiryContent as AccountInquiryTabCompType,
  productRecord: defineAsyncComponent({
    loader: () => import('@/components/DashboardAccountInquiryPage/ProductRecordContent.vue'),
    // loadingComponent: LoadingComponent, // Define a loading component
    // errorComponent: ErrorComponent, // Define an error component
    delay: 200
  }) as ProductRecordTabCompType,
  eventRecord: defineAsyncComponent({
    loader: () => import('@/components/DashboardAccountInquiryPage/EventRecordContent.vue'),
    // loadingComponent: LoadingComponent, // Define a loading component
    // errorComponent: ErrorComponent, // Define an error component
    delay: 200
  }) as EventRecordTabCompType
}

/* ref 變數 */
const tabOptions = ref<Tab<AccountInquiryTabType>[]>(createAccountInquiryTabs($t, machineType))
const selectedTab = ref<AccountInquiryTabType>(tabOptions.value[0].value)

const isLoading = ref<boolean>(false)
const listData = ref()
const cardData = ref<ClawOperationsDetailResType | CoinOperationsDetailResType>()

const isModalVisible = ref(false)
const resetKey = ref(0)

/* computed */
const revenueCardData = computed(() => {
  if (!cardData.value) return null
  if (machineType === 'claw') {
    const data = cardData.value as ClawOperationsDetailResType

    const totalRevenue = data.records?.reduce((acc, curr) => acc + curr.revenue, 0)
    const prizeWinCount = data.records?.reduce((acc, curr) => acc + curr.prizeWinCount, 0)
    const averagePrizeWinCount = prizeWinCount > 0 ? totalRevenue / prizeWinCount : 0
    const profit = data.records?.reduce((acc, curr) => acc + curr.profit, 0)

    return {
      pcbName: data.pcbName,
      totalRevenue,
      prizeWinCount,
      averagePrizeWinCount,
      profit
    }
  } else if (machineType === 'coin') {
    const data = cardData.value as CoinOperationsDetailResType

    const coinExchanged = data.coinExchanged
    const coinRemaining = data.coinRemaining
    const totalExchangeCoinCount = data.records?.reduce((acc, curr) => acc + curr.exchangeCount, 0)

    return {
      pcbName: data.pcbName,
      coinExchanged: coinExchanged,
      coinRemaining: coinRemaining,
      totalExchangeCoinCount: totalExchangeCoinCount
    }
  }
  return null
})

const fnResetData = (data?: { startDate: string; endDate: string }) => {
  startDate.value = data?.startDate || initialStartDate
  endDate.value = data?.endDate || initialEndDate

  if (!data) {
    resetKey.value += 1
  }
  getMachineOperationsDetail(machineType)
}

const getMachineOperationsDetail = async (machineType: MachineType) => {
  if (machineType === 'claw') {
    await fnGetClawOperationsDetail({
      pcbId,
      startDate: startDate.value,
      endDate: endDate.value
    })
    listData.value = clawOperationsDetailRecords.value.data
    isLoading.value = clawOperationsDetailRecords.value.isLoading
    cardData.value = clawOperationsDetailRecords.value.data
    return
  }

  if (machineType === 'coin') {
    await fnGetCoinOperationsDetail({
      pcbId,
      startDate: startDate.value,
      endDate: endDate.value
    })
    listData.value = coinOperationsDetailRecords.value.data
    isLoading.value = coinOperationsDetailRecords.value.isLoading
    cardData.value = coinOperationsDetailRecords.value.data
    return
  }
}

const handleToggleTab = async (tab: AccountInquiryTabType, machineType: MachineType) => {
  console.log('handleToggleTab', tab)
  isLoading.value = true
  if (tab === 'accountInquiry') {
    console.log('handleToggleTab accountInquiry')
    getMachineOperationsDetail(machineType)

    return
  }

  if (tab === 'productRecord') {
    await fnGetClawGoodsRecord({
      pcbId,
      startDate: startDate.value,
      endDate: endDate.value
    })
    console.log('clawGoodsRecords.value.data', clawGoodsRecords.value.data)
    listData.value = clawGoodsRecords.value.data
    isLoading.value = clawGoodsRecords.value.isLoading

    return
  }

  if (tab === 'eventRecord') {
    await fnGetMachineEventRecord(
      {
        pcbId,
        startDate: startDate.value,
        endDate: endDate.value
      },
      machineType
    )
    listData.value = machineEventRecords.value.data
    isLoading.value = machineEventRecords.value.isLoading

    return
  }
}

const resetModalVisible = (modalVisibility: boolean): boolean => {
  return modalVisibility
}

const handleOpenModal = (): void => {
  isModalVisible.value = resetModalVisible(isModalVisible.value)

  openModal(() => {
    isModalVisible.value = true
  })
}

const fnRefreshDashboard = (data: { startDate: string; endDate: string }) => {
  fnResetData(data)
}

/* 生命週期 (Lifecycle hooks) */
onMounted(() => {
  isLoading.value = true
  updateHeaderTitle($t('DashboardPage.HeaderTitle') + storeName.value) // 設定動態 header title

  getMachineOperationsDetail(machineType)
})
</script>

<template>
  <div class="account-inquiry-page">
    <RevenueCard
      v-if="revenueCardData"
      @open:date-modal="handleOpenModal"
      :type="machineType"
      :data="revenueCardData"
    />
    <a-skeleton-button
      v-else
      class="customSkeleton"
      :active="true"
      size="large"
      shape="default"
      :block="true"
    />

    <UpdateRecord @update="fnResetData" />

    <SegmentedTab
      v-model:value="selectedTab"
      :tabOptions="tabOptions"
      @change="handleToggleTab(selectedTab, machineType)"
    />

    <div class="content-container">
      <!-- <KeepAlive> -->
      <component
        v-if="listData"
        :is="tabComps[selectedTab]"
        :data="listData"
        :is-loading="isLoading"
        :machine-type="machineType"
      />
      <!-- </KeepAlive> -->
    </div>
    <AccountInquiryFilterModal
      v-if="isModalVisible"
      :modal-visible="modalVisible"
      :resetAll="resetKey"
      @close="closeModal()"
      @refresh:account-inquiry-dashboard="fnRefreshDashboard"
    />
  </div>
</template>

<style lang="scss" scoped>
.content-container {
  margin-top: 1.5rem;
}
:deep(.customSkeleton) {
  height: 150px;
  > span {
    height: 100% !important;
  }
}
</style>
