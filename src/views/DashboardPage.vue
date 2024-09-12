<script setup lang="ts">
import { type DefineComponent, ref, onMounted, defineAsyncComponent } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import TabFilter from '@/components/Base/TabFilter.vue'
import FilteredTag from '@/components/DashboardPage/FilteredTag.vue'
import UpdateRecord from '@/components/DashboardPage/UpdateRecord.vue'
import ClawTabList from '@/components/DashboardPage/ClawTabList.vue'
import { useHeader } from '@/composables/useHeader'
import { useI18n } from 'vue-i18n'
import { dashboardTabsList, createDashboardTabs } from '@/constants/dashboard.const'
import { UtilCommon } from '@/utils/utilCommon'

type DashboardTabType = 'claw' | 'coin'
type TabCompType = DefineComponent<{ activeKey: string[] }, {}, any>

const { t: $t } = useI18n()
const { updateHeaderTitle } = useHeader()

const tabComps: Record<DashboardTabType, TabCompType> = {
  claw: ClawTabList,
  coin: defineAsyncComponent({
    loader: () => import('@/components/DashboardPage/CoinTabList.vue'),
    // loadingComponent: LoadingComponent, // Define a loading component
    // errorComponent: ErrorComponent, // Define an error component
    delay: 200
  })
}

const storeName = ref('')
const dashboardTabs = createDashboardTabs($t)
const selectedTab = ref<DashboardTabType>('claw')
const transitionName = ref('slide-right')

const clawActiveKey = ref([])
const coinActiveKey = ref([])

const switchTab = async (tabValue: Event): Promise<void> => {
  if (!tabValue) return
  const tabName = (tabValue.target as HTMLSelectElement).value as DashboardTabType

  if (tabName === 'claw') {
    transitionName.value = `slide-${UtilCommon.determineTransitionDirection(dashboardTabsList, 'claw')}`
    selectedTab.value = 'claw'
    return
  }
  if (tabName === 'coin') {
    transitionName.value = `slide-${UtilCommon.determineTransitionDirection(dashboardTabsList, 'coin')}`
    selectedTab.value = 'coin'
    return
  }
}

onMounted(() => {
  storeName.value = '大寮光華店'
  updateHeaderTitle($t('DashboardPage.HeaderTitle') + storeName.value) // 設定動態 header title
})
</script>

<template>
  <div class="dashboard-page">
    <div class="bar-chart-container">Bar Chart Here</div>

    <UpdateRecord :date="'2021-11-11'" :time="'11:11:11'" />
    <TabFilter :tabs="dashboardTabs" v-model:modalValue="selectedTab" @change="switchTab" />

    <div class="actions-container">
      <div class="action-button">
        <a-button ghost type="secondary">批量退幣</a-button>
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
