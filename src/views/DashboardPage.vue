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
  RefreshClawDashboardType,
  RefreshCoinDashboardType,
  SelectedGroupAndGoodsType,
  SelectedGroupType,
  SelectedGroupAndGoodsRemoveType
} from '@/models/types/dashboard.types'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import SegmentedTab from '@/components/Base/SegmentedTab.vue'
import FilteredTag from '@/components/DashboardPage/FilteredTag.vue'
import UpdateRecord from '@/components/DashboardPage/UpdateRecord.vue'
import ClawTabList from '@/components/DashboardPage/ClawTabList.vue'
import FloatButton from '@/components/Base/FloatButton.vue'
import DashboardBarChart from '@/components/BarChart/DashboardBarChart.vue'
import AddNewMachineModal from '@/components/DashboardPage/Modal/AddNewMachineModal.vue'
import BatchModal from '@/components/DashboardPage/Modal/BatchModal.vue'
import ReplenishCoinsModal from '@/components/DashboardPage/Modal/ReplenishCoinsModal.vue'
import MoreOperationModal from '@/components/DashboardPage/Modal/MoreOperationModal.vue'
import EditMachineModal from '@/components/DashboardPage/Modal/EditMachineModal.vue'
import ChangeProductModal from '@/components/DashboardPage/Modal/ChangeProductModal.vue'
import RemoteUnlockModal from '@/components/DashboardPage/Modal/RemoteUnlockModal.vue'
import ErrorResetModal from '@/components/DashboardPage/Modal/ErrorResetModal.vue'
import SecurityStatusModal from '@/components/DashboardPage/Modal/SecurityStatusModal.vue'
import ClawStoreFilterModal from '@/components/DashboardPage/Modal/ClawStoreFilterModal.vue'
import CoinStoreFilterModal from '@/components/DashboardPage/Modal/CoinStoreFilterModal.vue'
import UpdateStoreModal from '@/components/DashboardPage/Modal/UpdateStoreModal.vue'
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
  addNewMachine: false,
  batch: false,
  replenishCoins: false,
  moreOperation: false,
  editMachine: false,
  changeProduct: false,
  remoteUnlock: false,
  errorReset: false,
  securityStatus: false,
  clawStoreFilter: false,
  updateStoreFilter: false,
  coinStoreFilter: false
})

const storeId = ref<string>(
  UtilCommon.getLocalStorage<StoreInfoStorageDataType>('store-info')?.storeId || ''
)
const batchCheckedList = ref<string[]>([])
const listData = ref<ClawOperationsInfoResType[] | CoinOperationsInfoResType[]>([])

const updateKey = ref(0)
const resetKey = ref(0)
const endDate = ref(initialEndDate)
const startDate = ref(initialStartDate)
const removeSelected = ref<SelectedGroupAndGoodsRemoveType>({
  groupName: 0,
  goodsName: 0,
  groupsDDLFilter: 0
})

const selectedMachineType = ref<0 | 1>(0)
const selectedMachineId = ref<string | string[] | null>(null)
const selectedGroupAndGoods = ref<SelectedGroupAndGoodsType>({
  groupName: '',
  goodsName: '',
  groupsDDLFilter: ''
})
const selectedGroup = ref<SelectedGroupType>({
  groupName: '',
  groupsDDLFilter: ''
})

const filteredGroupAndGoods = computed(() => {
  return Object.keys(selectedGroupAndGoods.value).filter(
    (key) => selectedGroupAndGoods.value[key as keyof SelectedGroupAndGoodsType]
  )
})
const filteredGroup = computed(() => {
  return Object.keys(selectedGroup.value).filter(
    (key) => selectedGroup.value[key as keyof SelectedGroupType]
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
const initSelectedMachineId = (): void => {
  selectedMachineId.value = null
}

const handleMachineIdClicked = (machineId: string | string[] | null): void => {
  if (!machineId) return
  selectedMachineId.value = machineId
}

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
  initSelectedMachineId()

  if (machineType !== undefined) {
    selectedMachineType.value = machineType
  }

  if (type === 'batch') {
    fetchPcbsList(storeId.value, machineType || 0)
  }
  openModal(() => {
    isModalVisible.value[type] = true
  })
}

const fnChoiceCoinClawModal = () => {
  if (selectedTab.value === 'claw') {
    handleOpenModal('clawStoreFilter')
  } else if (selectedTab.value === 'coin') {
    handleOpenModal('coinStoreFilter')
  }
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

const fnResetClawData = (data?: RefreshClawDashboardType) => {
  startDate.value = data?.startDate || initialStartDate
  endDate.value = data?.endDate || initialEndDate

  if (!data) {
    isInitialChart.value = true
    const groupAndGoodsObj = {
      groupName: '',
      goodsName: '',
      groupsDDLFilter: ''
    }
    resetKey.value += 1
    handleToggleTab(selectedTab.value)
    fnGetSelectedGroupAndGoods(groupAndGoodsObj)
  }

  updateKey.value += 1
}

const fnResetCoinData = (data?: RefreshCoinDashboardType) => {
  startDate.value = data?.startDate || initialStartDate
  endDate.value = data?.endDate || initialEndDate

  if (!data) {
    isInitialChart.value = true
    const groupObj = {
      groupName: '',
      groupsDDLFilter: ''
    }
    resetKey.value += 1
    handleToggleTab(selectedTab.value)
    fnGetSelectedGroup(groupObj)
  }

  updateKey.value += 1
}

const fnResetData = () => {
  fnResetClawData()
}

const fnGetSelectedGroupAndGoods = (groupAndGoodsObj: SelectedGroupAndGoodsType) => {
  Object.keys(selectedGroupAndGoods.value).forEach((key) => {
    const typedKey = key as keyof SelectedGroupAndGoodsType
    selectedGroupAndGoods.value[typedKey] = groupAndGoodsObj[typedKey]
  })
}

const fnGetSelectedGroup = (groupObj: SelectedGroupType) => {
  Object.keys(selectedGroupAndGoods.value).forEach((key) => {
    const typedKey = key as keyof SelectedGroupType
    selectedGroup.value[typedKey] = groupObj[typedKey]
  })
}

const fnRefreshClawDashboard = (data: RefreshClawDashboardType) => {
  const groupAndGoodsObj = {
    groupName: data.groupName,
    goodsName: data.goodsName,
    groupsDDLFilter: data.groupsDDLFilter
  }

  isInitialChart.value = false
  fnResetClawData(data)
  handleToggleTab(selectedTab.value, data.groupsDDLFilter, data.groupName, data.goodsName)
  fnGetSelectedGroupAndGoods(groupAndGoodsObj)
}

const fnRefreshCoinDashboard = (data: RefreshCoinDashboardType) => {
  const groupObj = {
    groupName: data.groupName,
    groupsDDLFilter: data.groupsDDLFilter
  }

  isInitialChart.value = false
  fnResetCoinData(data)
  handleToggleTab(selectedTab.value, data.groupsDDLFilter, data.groupName)
  fnGetSelectedGroup(groupObj)
}

const fnRemoveClawFilteredTag = (key: string) => {
  const typedKey = key as keyof SelectedGroupAndGoodsType
  selectedGroupAndGoods.value[typedKey] = ''
  removeSelected.value[typedKey] += 1

  fnRefreshClawDashboard({
    startDate: startDate.value,
    endDate: endDate.value,
    groupsDDLFilter: selectedGroupAndGoods.value.groupsDDLFilter,
    groupName: selectedGroupAndGoods.value.groupName,
    goodsName: selectedGroupAndGoods.value.goodsName
  })
}

const fnRemoveCoinFilteredTag = (key: string) => {
  const typedKey = key as keyof SelectedGroupType
  selectedGroup.value[typedKey] = ''
  removeSelected.value[typedKey] += 1

  fnRefreshCoinDashboard({
    startDate: startDate.value,
    endDate: endDate.value,
    groupsDDLFilter: selectedGroup.value.groupsDDLFilter,
    groupName: selectedGroup.value.groupName
  })
}

const fnUpdateStoreInfo = () => {
  handleOpenModal('updateStoreFilter')
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
      @update:storeInfo="fnUpdateStoreInfo"
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
        >
          {{ $t('DashboardPage.Button.BatchForClawMachine') }}
        </a-button>
        <a-button
          v-if="selectedTab === 'coin'"
          ghost
          type="secondary"
          @click="handleOpenModal('batch', 1)"
        >
          {{ $t('DashboardPage.Button.BatchForCoinMachine') }}
        </a-button>
      </div>

      <div class="filtered-tags-container">
        <div
          v-if="selectedTab === 'claw'"
          class="claw-tags"
        >
          <FilteredTag
            v-for="(key, idx) in filteredGroupAndGoods"
            :key="key + idx"
            :text="selectedGroupAndGoods[key as keyof SelectedGroupAndGoodsType]"
            @close="fnRemoveClawFilteredTag(key)"
          />
        </div>
        <div
          v-else-if="selectedTab === 'coin'"
          class="coin-tags"
        >
          <FilteredTag
            v-for="(key, idx) in filteredGroup"
            :key="key + idx"
            :text="selectedGroup[key as keyof SelectedGroupType]"
            @close="fnRemoveCoinFilteredTag(key)"
          />
        </div>
      </div>
      <div
        class="filter-button"
        @click="fnChoiceCoinClawModal"
      >
        <BaseSvgIcon iconName="filter-menu" />
      </div>
    </div>

    <div class="list-container">
      {{ selectedMachineId }}
      <transition
        :name="transitionName"
        mode="out-in"
      >
        <KeepAlive>
          <component
            :is="tabComps[selectedTab]"
            :active-key="selectedTab === 'claw' ? clawActiveKey : coinActiveKey"
            :data="listData"
            @open-modal="handleOpenModal"
            @machine-id-clicked="handleMachineIdClicked"
          />
        </KeepAlive>
      </transition>
    </div>

    <FloatButton
      size="xl"
      @click="handleOpenModal('addNewMachine')"
    />
  </div>

  <AddNewMachineModal
    v-if="isModalVisible.addNewMachine"
    :modal-visible="modalVisible"
    @close="closeModal"
  />

  <BatchModal
    v-if="isModalVisible.batch"
    :modal-visible="modalVisible"
    :checked-list="batchCheckedList"
    :pcb-list="pcbsList"
    :list-data="listData"
    :selected-tab="selectedTab"
    @close="closeModal"
    @refresh="handleToggleTab(selectedTab)"
  />

  <ReplenishCoinsModal
    v-if="isModalVisible.replenishCoins"
    :modal-visible="modalVisible"
    :selected-machine-id="selectedMachineId"
    :machine-type="selectedMachineType"
    @close="closeModal(initSelectedMachineId)"
  />

  <MoreOperationModal
    v-if="isModalVisible.moreOperation"
    :modal-visible="modalVisible"
    :selected-machine-id="selectedMachineId"
    :machine-type="selectedMachineType"
    @close="closeModal(initSelectedMachineId)"
    @open-modal="handleOpenModal"
    @send-machine-id="handleMachineIdClicked"
  />

  <EditMachineModal
    v-if="isModalVisible.editMachine"
    :modal-visible="modalVisible"
    :selected-machine-id="selectedMachineId"
    @close="closeModal(initSelectedMachineId)"
    @refresh="handleToggleTab(selectedTab)"
  />

  <ChangeProductModal
    v-if="isModalVisible.changeProduct"
    :modal-visible="modalVisible"
    :list-data="listData"
    :selected-machine-id="selectedMachineId"
    :selected-tab="selectedTab"
    @close="closeModal(initSelectedMachineId)"
    @refresh="handleToggleTab(selectedTab)"
  />

  <RemoteUnlockModal
    v-if="isModalVisible.remoteUnlock"
    :modal-visible="modalVisible"
    :selected-machine-id="selectedMachineId"
    @close="closeModal(initSelectedMachineId)"
  />

  <ErrorResetModal
    v-if="isModalVisible.errorReset"
    :modal-visible="modalVisible"
    :selected-machine-id="selectedMachineId"
    @close="closeModal(initSelectedMachineId)"
  />

  <SecurityStatusModal
    v-if="isModalVisible.securityStatus"
    :modal-visible="modalVisible"
    :selected-machine-id="selectedMachineId"
    @close="closeModal(initSelectedMachineId)"
  />

  <ClawStoreFilterModal
    v-if="isModalVisible.clawStoreFilter"
    :modal-visible="modalVisible"
    :resetAll="resetKey"
    :removeSelected="removeSelected"
    @close="closeModal()"
    @refresh:claw-store-dashboard="fnRefreshClawDashboard"
  />

  <CoinStoreFilterModal
    v-if="isModalVisible.coinStoreFilter"
    :modal-visible="modalVisible"
    :resetAll="resetKey"
    :removeSelected="removeSelected"
    @close="closeModal()"
    @refresh:coin-store-dashboard="fnRefreshCoinDashboard"
  />

  <UpdateStoreModal
    v-if="isModalVisible.updateStoreFilter"
    :modal-visible="modalVisible"
    @close="closeModal"
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
    .claw-tags,
    .coin-tags {
      display: flex;
    }
  }

  .filter-button {
    cursor: pointer;
  }
}

.list-container {
  overflow: hidden;
}
</style>
