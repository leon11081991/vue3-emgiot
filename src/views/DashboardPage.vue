<script setup lang="ts">
/* import */
import { type DefineComponent, ref, onMounted, defineAsyncComponent } from 'vue'
import type { Tab } from '@/models/interfaces/tab.interface'
import type {
  DashboardTabType,
  ClawOperationsInfoResType,
  CoinOperationsInfoResType
} from '@/models/types/dashboard.types'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import SegmentedTab from '@/components/Base/SegmentedTab.vue'
import FilteredTag from '@/components/DashboardPage/FilteredTag.vue'
import UpdateRecord from '@/components/DashboardPage/UpdateRecord.vue'
import ClawTabList from '@/components/DashboardPage/ClawTabList.vue'
import FloatButton from '@/components/Base/FloatButton.vue'
import DashboardBarChart from '@/components/BarChart/DashboardBarChart.vue'
import BatchModal from '@/components/DashboardPage/Modal/BatchModal.vue'
import StoreFilterModal from '@/components/DashboardPage/Modal/StoreFilterModal.vue'
import { useI18n } from 'vue-i18n'
import { useHeader } from '@/composables/useHeader'
import { useDate } from '@/composables/useDate'
import { useFetchDashboard } from '@/composables/useFetchDashboard'
import { useModal } from '@/composables/useModal'
import { createDashboardTabs } from '@/constants/dashboard.const'

/* type */
type ClawTabCompType = DefineComponent<
  { activeKey: string[]; data: ClawOperationsInfoResType[] },
  {},
  any
>
type CoinTabCompType = DefineComponent<
  { activeKey: string[]; data: CoinOperationsInfoResType[] },
  {},
  any
>
type RefreshDashboardType = {
  startDate: string
  endDate: string
  groupsDDLFilter: string
  groupName: string
  goodsName: string
}

/* 非響應式變數 */
const { t: $t } = useI18n()
const { updateHeaderTitle } = useHeader()
const { today, calculateDate } = useDate()
const { clawOperationsInfo, coinOperationsInfo, fetchClawOperationsInfo, fetchCoinOperationsInfo } =
  useFetchDashboard()
const { modalVisible, openModal, closeModal } = useModal()

/* 子組件 ref */
const tabComps: Record<DashboardTabType, ClawTabCompType | CoinTabCompType> = {
  claw: ClawTabList,
  coin: defineAsyncComponent({
    loader: () => import('@/components/DashboardPage/CoinTabList.vue'),
    // loadingComponent: LoadingComponent, // Define a loading component
    // errorComponent: ErrorComponent, // Define an error component
    delay: 200
  })
}

/* ref 變數 */
const initialEndDate = today()
const initialStartDate = calculateDate(initialEndDate, 'backward', 7)

const storeName = ref('')

const tabOptions = ref<Tab<DashboardTabType>[]>(createDashboardTabs($t))
const selectedTab = ref<DashboardTabType>(tabOptions.value[0].value)
const transitionName = ref('slide-right')

const clawActiveKey = ref([])
const coinActiveKey = ref([])

const batchSearchParam = ref<string>('')
const listData = ref<ClawOperationsInfoResType[] | CoinOperationsInfoResType[]>([])

const updateKey = ref(0)
const resetKey = ref(0)
const endDate = ref(initialEndDate)
const startDate = ref(initialStartDate)

/* function */
const handleToggleTab = async (
  tab: DashboardTabType,
  groupsDDLFilter?: string,
  groupName?: string,
  goodsName?: string
): Promise<void> => {
  if (tab === 'claw') {
    await fetchClawOperationsInfo({
      startDate: startDate.value,
      endDate: endDate.value
    })

    listData.value = clawOperationsInfo.value.data

    if (groupsDDLFilter) {
      listData.value = listData.value.filter((item) => item.pcbName.includes(groupsDDLFilter))
    }

    if (groupName) {
      listData.value = listData.value.filter((item) => item.pcbGroupName.includes(groupName))
    }

    if (goodsName) {
      listData.value = listData.value.filter((item) => item.goodsName.includes(goodsName))
    }

    return
  }

  if (tab === 'coin') {
    await fetchCoinOperationsInfo({
      startDate: startDate.value,
      endDate: endDate.value
    })

    listData.value = coinOperationsInfo.value.data

    if (groupsDDLFilter) {
      listData.value = listData.value.filter((item) => item.pcbName.includes(groupsDDLFilter))
    }

    if (groupName) {
      listData.value = listData.value.filter((item) => item.pcbGroupName.includes(groupName))
    }

    return
  }
}

const fnRefreshData = (data?: RefreshDashboardType) => {
  startDate.value = data?.startDate || initialStartDate
  endDate.value = data?.endDate || initialEndDate

  if (!data) {
    resetKey.value += 1
    handleToggleTab(selectedTab.value)
  }

  updateKey.value += 1
}

const fnRefreshDashboard = (data: RefreshDashboardType) => {
  fnRefreshData(data)
  handleToggleTab(selectedTab.value, data.groupsDDLFilter, data.groupName, data.goodsName)
}

/* 生命週期 (Lifecycle hooks) */
onMounted(async () => {
  storeName.value = '大寮光華店'
  updateHeaderTitle($t('DashboardPage.HeaderTitle') + storeName.value) // 設定動態 header title

  await fetchClawOperationsInfo({
    startDate: startDate.value,
    endDate: endDate.value
  })

  listData.value = clawOperationsInfo.value.data
})
</script>

<template>
  <div class="dashboard-page">
    <!-- BarChart -->
    <DashboardBarChart
      :key="updateKey"
      :type="selectedTab"
      :startDate="startDate"
      :endDate="endDate"
    />

    <UpdateRecord @update="fnRefreshData" />

    <SegmentedTab
      v-model:value="selectedTab"
      :tabOptions="tabOptions"
      @change="handleToggleTab(selectedTab)"
    />

    <div class="actions-container">
      <div class="action-button">
        <a-button
          v-if="selectedTab === 'claw'"
          ghost
          type="secondary"
          @click="openModal()"
          >批量補幣</a-button
        >
        <a-button
          v-if="selectedTab === 'coin'"
          ghost
          type="secondary"
          >批量退幣</a-button
        >
      </div>

      <div class="filtered-tags-container">
        <FilteredTag
          v-for="i in 3"
          :key="i"
          text="大寮光華店"
          @close="() => console.log('test close')"
        />
      </div>

      <div
        class="filter-button"
        @click="openModal()"
      >
        <BaseSvgIcon iconName="filter-menu" />
      </div>
    </div>

    <div class="list-container">
      <transition
        :name="transitionName"
        mode="out-in"
      >
        <KeepAlive>
          <component
            :is="tabComps[selectedTab]"
            :active-key="selectedTab === 'claw' ? clawActiveKey : coinActiveKey"
            :data="listData"
          />
        </KeepAlive>
      </transition>
    </div>

    <FloatButton />
  </div>

  <BatchModal
    :modal-visible="modalVisible"
    :search-value="batchSearchParam"
    @close="closeModal()"
  />

  <StoreFilterModal
    :modal-visible="modalVisible"
    :reset="resetKey"
    @close="closeModal()"
    @refresh="fnRefreshDashboard"
  />
</template>

<style lang="scss" scoped>
.actions-container {
  margin-block: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .filtered-tags-container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: end;
    flex-wrap: wrap;
  }

  .filter-button {
    cursor: pointer;
  }
}

.list-container {
  overflow: hidden;
}
</style>
