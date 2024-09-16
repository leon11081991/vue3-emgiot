<script setup lang="ts">
import { type DefineComponent, ref, onMounted, defineAsyncComponent } from 'vue'
import type { Tab } from '@/models/interfaces/tab.interface'
import type {
  DashboardTabType,
  ClawOperationsInfoResType,
  CoinOperationsInfoResType
} from '@/models/types/dashboard.types'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import FilteredTag from '@/components/DashboardPage/FilteredTag.vue'
import UpdateRecord from '@/components/DashboardPage/UpdateRecord.vue'
import BaseSegmentedButton from '@/components/Base/SegmentedTab.vue'
import ClawTabList from '@/components/DashboardPage/ClawTabList.vue'
import { useI18n } from 'vue-i18n'
import { useHeader } from '@/composables/useHeader'
import { useDate } from '@/composables/useDate'
import { useFetchDashboard } from '@/composables/useFetchDashboard'
import { createDashboardTabs } from '@/constants/dashboard.const'

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

const { t: $t } = useI18n()
const { updateHeaderTitle } = useHeader()
const { today } = useDate()
const { clawOperationsInfo, fetchClawOperationsInfo } = useFetchDashboard()

const tabComps: Record<DashboardTabType, ClawTabCompType | CoinTabCompType> = {
  claw: ClawTabList,
  coin: defineAsyncComponent({
    loader: () => import('@/components/DashboardPage/CoinTabList.vue'),
    // loadingComponent: LoadingComponent, // Define a loading component
    // errorComponent: ErrorComponent, // Define an error component
    delay: 200
  })
}

const storeName = ref('')

const tabOptions = ref<Tab<DashboardTabType>[]>(createDashboardTabs($t))
const selectedTab = ref<DashboardTabType>(tabOptions.value[0].value)
const transitionName = ref('slide-right')

const clawActiveKey = ref([])
const coinActiveKey = ref([])

onMounted(() => {
  storeName.value = '大寮光華店'
  updateHeaderTitle($t('DashboardPage.HeaderTitle') + storeName.value) // 設定動態 header title

  fetchClawOperationsInfo({
    startDate: today(),
    endDate: today()
  })
})
</script>

<template>
  <div class="dashboard-page">
    <div class="bar-chart-container">Bar Chart Here</div>

    <UpdateRecord :date="'2021-11-11'" :time="'11:11:11'" />

    <!-- <BaseSegmentedButton v-model:value="selectedTab" :tabOptions="tabOptions" /> -->
    <a-segmented class="tab-filter" v-model:value="selectedTab" block :options="tabOptions">
      <template #label="{ title, payload }">
        <template v-if="payload.icon">
          <BaseSvgIcon :iconName="payload.icon" />
          <div class="tab-label">{{ title }}</div>
        </template>
      </template>
    </a-segmented>

    <div class="actions-container">
      <div class="action-button">
        <a-button v-if="selectedTab === 'claw'" ghost type="secondary">批量補幣</a-button>
        <a-button v-if="selectedTab === 'coin'" ghost type="secondary">批量退幣</a-button>
      </div>

      <div class="filtered-tags-container">
        <FilteredTag v-for="i in 3" text="大寮光華店" @close="() => console.log('test close')" />
      </div>

      <div class="filter-button">
        <BaseSvgIcon iconName="filter-menu" />
      </div>
    </div>

    <div class="list-container">
      <transition :name="transitionName" mode="out-in">
        <KeepAlive>
          <component
            :is="tabComps[selectedTab]"
            :active-key="selectedTab === 'claw' ? clawActiveKey : coinActiveKey"
            :data="clawOperationsInfo.data"
          />
        </KeepAlive>
      </transition>
    </div>
  </div>
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
