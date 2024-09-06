<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import TabFilter from '@/components/Base/TabFilter.vue'
import { useHeader } from '@/composables/useHeader'
import { useI18n } from 'vue-i18n'
import { createDashboardTabs } from '@/constants/dashboard.const'

type DashboardTabType = 'claw' | 'coin'

const { t: $t } = useI18n()
const { updateHeaderTitle } = useHeader()

const dashboardTabs = createDashboardTabs($t)
const storeName = ref('')
const selectedTab = ref<DashboardTabType>('claw')
const clawActiveKey = ref([])
const coinActiveKey = ref([])

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

    <TabFilter :tabs="dashboardTabs" v-model:modalValue="selectedTab" />

    <div class="list-container">
      <div class="list-header claw">
        <div class="header-item pcbName">機台</div>
        <div class="header-item averagePrizeWinCount">平均出貨金額</div>
        <div class="header-item revenue">營收</div>
        <div class="header-item prizeWinCount">出貨</div>
      </div>

      <div class="list-body">
        <a-collapse class="list-collapse" v-model:activeKey="clawActiveKey" :bordered="false">
          <a-collapse-panel class="list-collapse-panel" key="1">
            <template #header>
              <div class="item-main-content claw">
                <div class="item-section">
                  <span>南部食品機</span>
                  <span>W208_01</span>
                </div>
                <div class="item-section">
                  <span>義美小泡芙(巧克力)</span>
                  <span>$100</span>
                </div>
                <div class="item-section">$800</div>
                <div class="item-section">12</div>
              </div>
            </template>
            <div class="item-action-content claw">
              <div class="item-section">
                <span>$800</span>
                <span>錢箱累積</span>
              </div>
              <div class="item-section">
                <span>$110</span>
                <span>累保金額</span>
              </div>
              <div class="item-section">
                <BaseSvgIcon iconName="accounts" size="lg" />
                <span>帳務查詢</span>
              </div>
              <div class="item-section">
                <BaseSvgIcon iconName="replenish-coins" size="lg" />
                <span>遠端補幣</span>
              </div>
              <div class="item-section">
                <BaseSvgIcon iconName="more-actions" size="lg" />
                <span>其他操作</span>
              </div>
            </div>
          </a-collapse-panel>

          <a-collapse-panel class="list-collapse-panel" key="2">
            <template #header>
              <div class="item-main-content claw">
                <div class="item-section">
                  <span>南部食品機</span>
                  <span>W208_01</span>
                </div>
                <div class="item-section">
                  <span>義美小泡芙(巧克力)</span>
                  <span>$100</span>
                </div>
                <div class="item-section">$800</div>
                <div class="item-section">12</div>
              </div>
            </template>
            <div class="item-action-content claw">
              <div class="item-section">
                <span>$800</span>
                <span>錢箱累積</span>
              </div>
              <div class="item-section">
                <span>$110</span>
                <span>累保金額</span>
              </div>
              <div class="item-section">
                <SvgIcon iconName="cross" size="lg" />
                <span>帳務查詢</span>
              </div>
              <div class="item-section">
                <SvgIcon iconName="cross" size="lg" />
                <span>遠端補幣</span>
              </div>
              <div class="item-section">
                <SvgIcon iconName="cross" size="lg" />
                <span>其他操作</span>
              </div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </div>
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
  .list-header {
    display: grid;
    padding: 0.5rem;
    background-color: $--color-primary;
    border-top-left-radius: $--border-radius-middle;
    border-top-right-radius: $--border-radius-middle;

    .header-item {
      flex: 1;
      font-size: 0.875rem;
      color: $--color-white;
      text-align: center;
    }
  }

  .list-collapse {
    background-color: $--background-color-base;
  }

  .list-collapse-panel {
    :deep(.ant-collapse-expand-icon) {
      display: none;
    }

    :deep(.ant-collapse-header) {
      padding: 0.5rem;
    }

    :deep(.ant-collapse-content),
    :deep(.ant-collapse-content-box) {
      padding: 0;
    }

    .item-main-content {
      display: grid;

      & > .item-section {
        color: $--color-primary;
      }
    }

    .item-action-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0.5rem;

      & > .item-section {
        flex: 1;
        color: $--color-gray-600;
      }
    }

    .item-section {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

  .claw {
    grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
  }

  .coin {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
