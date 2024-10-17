<script setup lang="ts">
/* import */
import { type DefineComponent, ref, onMounted, defineAsyncComponent, computed } from 'vue'
import type { Tab } from '@/models/interfaces/tab.interface'
import type { StoreInfoStorageDataType } from '@/models/types/store.types'
import type { DashboardModalType } from '@/models/types/modal.types'
import type {
  DashboardTabType,
  ClawOperationsInfoResType,
  CoinOperationsInfoResType,
  RefreshDashboardType,
  SelectedGroupAndGoodsType,
  SelectedGroupAndGoodsRemoveType
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
import { useDropdown } from '@/composables/useDropdown'
import { createDashboardTabs } from '@/constants/dashboard.const'
import { UtilCommon } from '@/utils/utilCommon'

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

/* 非響應式變數 */
const { t: $t } = useI18n()
const { updateHeaderTitle } = useHeader()
const { today, calculateDate } = useDate()
const { clawOperationsInfo, coinOperationsInfo, fetchClawOperationsInfo, fetchCoinOperationsInfo } =
  useFetchDashboard()
const { modalVisible, openModal, closeModal } = useModal()
const { pcbsList, fetchPcbsList } = useDropdown()

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
const isInitialChart = ref(true)

const tabOptions = ref<Tab<DashboardTabType>[]>(createDashboardTabs($t))
const selectedTab = ref<DashboardTabType>(tabOptions.value[0].value)
const transitionName = ref('slide-right')

const clawActiveKey = ref([])
const coinActiveKey = ref([])

const isModalVisible = ref<Record<DashboardModalType, boolean>>({
  batch: false,
  storeFilter: false
})

const storeId = ref<string>(
  UtilCommon.getLocalStorage<StoreInfoStorageDataType>('store-info')?.storeId || ''
)
const batchSearchParam = ref<string>('')
const batchCheckedList = ref<string[]>([])
const listData = ref<ClawOperationsInfoResType[] | CoinOperationsInfoResType[]>([])

const updateKey = ref(0)
const resetKey = ref(0)
const endDate = ref(initialEndDate)
const startDate = ref(initialStartDate)
const removeSelected = ref<SelectedGroupAndGoodsRemoveType>({
  groupName: 0,
  goodsName: 0
})
const selectedGroupAndGoods = ref<SelectedGroupAndGoodsType>({
  groupName: '',
  goodsName: ''
})

const filteredGroupAndGoods = computed(() => {
  return Object.keys(selectedGroupAndGoods.value).filter(
    (key) => selectedGroupAndGoods.value[key as keyof SelectedGroupAndGoodsType]
  )
})

const storeName = computed(() => {
  const keyword = '店'
  const name = localStorage.getItem('storeName')

  if (!name) {
    return ''
  }

  const lastChar = name[name.length - 1]
  const isStoreKeywordExist = lastChar.includes(keyword)

  return isStoreKeywordExist ? name : name + keyword
})

/* function */
const resetModalVisible = (
  modalVisibility: Record<DashboardModalType, boolean>
): Record<DashboardModalType, boolean> => {
  Object.keys(modalVisibility).forEach((key) => {
    modalVisibility[key as DashboardModalType] = false
  })
  return modalVisibility
}

const handleOpenModal = (type: DashboardModalType, machineType?: 0 | 1): void => {
  isModalVisible.value = resetModalVisible(isModalVisible.value)

  if (type === 'batch') {
    fetchPcbsList(storeId.value, machineType || 0)
  }
  openModal(() => {
    isModalVisible.value[type] = true
  })
}

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

const updateCheckedList = (val: string[]) => {
  console.log('updateCheckedList!!!!', val)
  batchCheckedList.value = val
}

const clearCheckedList = (checkedList: string[]) => {
  checkedList = []
}

const fnResetData = (data?: RefreshDashboardType) => {
  startDate.value = data?.startDate || initialStartDate
  endDate.value = data?.endDate || initialEndDate

  if (!data) {
    isInitialChart.value = true
    const groupAndGoodsObj = {
      groupName: '',
      goodsName: ''
    }
    resetKey.value += 1
    handleToggleTab(selectedTab.value)
    fnGetSelectedGroupAndGoods(groupAndGoodsObj)
  }

  updateKey.value += 1
}

const fnGetSelectedGroupAndGoods = (groupAndGoodsObj: SelectedGroupAndGoodsType) => {
  Object.keys(selectedGroupAndGoods.value).forEach((key) => {
    const typedKey = key as keyof SelectedGroupAndGoodsType
    selectedGroupAndGoods.value[typedKey] = groupAndGoodsObj[typedKey]
  })
}

const fnRefreshDashboard = (data: RefreshDashboardType) => {
  const groupAndGoodsObj = {
    groupName: data.groupName,
    goodsName: data.goodsName
  }

  isInitialChart.value = false
  fnResetData(data)
  handleToggleTab(selectedTab.value, data.groupsDDLFilter, data.groupName, data.goodsName)
  fnGetSelectedGroupAndGoods(groupAndGoodsObj)
}

const fnRemoveFilteredTag = (key: string) => {
  const typedKey = key as keyof SelectedGroupAndGoodsType
  selectedGroupAndGoods.value[typedKey] = ''
  removeSelected.value[typedKey] += 1

  // 需要同步清除對應的input資料
  fnRefreshDashboard({
    startDate: startDate.value,
    endDate: endDate.value,
    groupsDDLFilter: selectedGroupAndGoods.value.groupName,
    groupName: selectedGroupAndGoods.value.groupName,
    goodsName: selectedGroupAndGoods.value.goodsName
  })
}

/* 生命週期 (Lifecycle hooks) */
onMounted(async () => {
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
      :isInitialChart="isInitialChart"
    />

    <UpdateRecord @update="fnResetData" />

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
          @click="handleOpenModal('batch', 0)"
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
          v-for="key in filteredGroupAndGoods"
          :key="key"
          :text="selectedGroupAndGoods[key as keyof SelectedGroupAndGoodsType]"
          @close="fnRemoveFilteredTag(key)"
        />
      </div>

      <div
        class="filter-button"
        @click="handleOpenModal('storeFilter')"
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
    v-if="isModalVisible.batch"
    :modal-visible="modalVisible"
    :search-value="batchSearchParam"
    :checked-list="batchCheckedList"
    :list-data="pcbsList.data"
    @close="closeModal()"
    @update:checked-list="updateCheckedList"
    @clear-checked-list="clearCheckedList(batchCheckedList)"
  />

  <StoreFilterModal
    v-if="isModalVisible.storeFilter"
    :modal-visible="modalVisible"
    :resetAll="resetKey"
    :removeSelected="removeSelected"
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
