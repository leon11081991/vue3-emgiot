<script setup lang="ts">
import { type DefineComponent, ref, onMounted, defineAsyncComponent } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import TabFilter from '@/components/Base/TabFilter.vue'
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

    <div class="update-container">
      <div class="update-detail">
        <div class="update-time">
          <span>更新時間</span>
          <span class="date">2021-11-11</span>
          <span class="time">11:11:11</span>
        </div>
        <div class="update-button">
          <BaseSvgIcon iconName="refresh" color="secondary" />
        </div>
      </div>
    </div>

    <TabFilter :tabs="dashboardTabs" v-model:modalValue="selectedTab" @change="switchTab" />

    <div class="actions-container">
      <a-button type="primary" ghost>批量退幣</a-button>
      <a-button type="secondary" size="large" class="action-button">批量退幣</a-button>
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
.update-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-block: 1rem;
  font-size: 0.875rem;
  color: $--color-gray-600;

  .update-detail {
    display: flex;
    align-items: center;
  }

  .update-time {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
}

.list-container {
  margin-top: 3rem;
  overflow: hidden;
}
</style>
