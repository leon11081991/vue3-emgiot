<script setup lang="ts">
import type { Tab } from '@/models/interfaces/tab.interface'
import type { DashboardTabType, AccountInquiryTabType } from '@/models/types/dashboard.types'
import type { BaseRecordType, GetClawGoodsRecordResType } from '@/models/types/machine.types'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { type DefineComponent, ref, onMounted, defineAsyncComponent } from 'vue'
import UpdateRecord from '@/components/DashboardPage/UpdateRecord.vue'
import SegmentedTab from '@/components/Base/SegmentedTab.vue'
import AccountInquiryContent from '@/components/DashboardAccountInquiryPage/AccountInquiryContent.vue'
import { useHeader } from '@/composables/useHeader'
import { useDashboard } from '@/composables/useDashboard'
import { useFetchDashboard } from '@/composables/useFetchDashboard'
import { createAccountInquiryTabs } from '@/constants/dashboard.const'

/* type */
type AccountInquiryTabCompType = DefineComponent<
  { data: BaseRecordType[]; isLoading: boolean },
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
  // { activeKey: string[]; data: CoinOperationsInfoResType[] },
  {},
  {},
  any
>

const { t: $t } = useI18n()
const route = useRoute()
const { updateHeaderTitle } = useHeader()
const { storeName } = useDashboard()
const {
  // clawOperationsDetailRecords,
  clawGoodsRecords,
  fnGetClawOperationsDetail,
  fnGetClawGoodsRecord
} = useFetchDashboard()

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

const machineType: DashboardTabType = route.params.machineType as DashboardTabType
const pcbId = route.params.pcbId as string
const startDate = ref(route.params.startDate as string)
const endDate = ref(route.params.endDate as string)

const tabOptions = ref<Tab<AccountInquiryTabType>[]>(createAccountInquiryTabs($t, machineType))
const selectedTab = ref<AccountInquiryTabType>(tabOptions.value[1].value) //TODO:要改為0

const isLoading = ref<boolean>(false)
const listData = ref()

const fnResetData = () => {
  // TODO
}

const handleToggleTab = async (tab: AccountInquiryTabType) => {
  console.log('handleToggleTab', tab)
  isLoading.value = true
  if (tab === 'accountInquiry') {
    // TODO
    console.log('handleToggleTab accountInquiry')
  }

  if (tab === 'productRecord') {
    await fnGetClawGoodsRecord({
      pcbId,
      startDate: startDate.value,
      endDate: endDate.value
    })
    listData.value = clawGoodsRecords.value.data
    isLoading.value = clawGoodsRecords.value.isLoading
  }

  if (tab === 'eventRecord') {
    // TODO
    console.log('handleToggleTab eventRecord')
  }

  isLoading.value = false
}

/* 生命週期 (Lifecycle hooks) */
onMounted(() => {
  updateHeaderTitle($t('DashboardPage.HeaderTitle') + storeName.value) // 設定動態 header title

  fnGetClawOperationsDetail({
    pcbId,
    startDate: startDate.value,
    endDate: endDate.value
  }).then(() => {})
})
</script>

<template>
  <div class="account-inquiry-page">
    <!-- Chart -->

    <UpdateRecord @update="fnResetData" />

    <SegmentedTab
      v-model:value="selectedTab"
      :tabOptions="tabOptions"
      @change="handleToggleTab(selectedTab)"
    />
    {{ startDate }}
    {{ endDate }}
    <div class="content-container">
      <KeepAlive>
        <component
          :is="tabComps[selectedTab]"
          :data="listData"
          :is-loading="isLoading"
        />
      </KeepAlive>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-container {
  margin-top: 1.5rem;
}
</style>
