<script setup lang="ts">
// import
import { ref, computed } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import BarChart from '@/components/Common/BarChart.vue'
import { useDate } from '@/composables/useDate'
import { useFetchDashboard } from '@/composables/useFetchDashboard'

// type
type OperationDataKey = 'revenue' | 'prizeWinCount' | 'profit'

// 非響應式變數
const TABS = {
  REVENUE: 'revenue',
  PROFIT: 'profit'
}

// ref 變數
const nowTopic = ref(TABS.REVENUE)
const updateTime = ref('')

// 初始化日期
const { today, calculateDate, getCurrentDateTime } = useDate()
const startDate = today()
const endDate = calculateDate(startDate, 'backward', 7)
updateTime.value = getCurrentDateTime()

// 獲取數據
const { operationChart, fetchOperationClawChart, fetchOperationCoinChart } = useFetchDashboard()

// computed
const calculateTotal = (key: OperationDataKey) => {
  return computed(() => {
    const clawMachineData = operationChart.value.data.clawMachine || []
    return clawMachineData.reduce((total, entry) => total + (entry[key] || 0), 0)
  })
}

const revenueData = computed(() => `$${calculateTotal('revenue').value}`)
const prizeWinCount = calculateTotal('prizeWinCount')
const profit = computed(() => `$${calculateTotal('profit').value}`)
const coinExchanged = computed(() => {
  const coinMachineData = operationChart.value.data.coinMachine || []
  return coinMachineData.reduce((total, entry) => total + (entry.coinExchanged || 0), 0)
})

// function
function fnChangeTab(topic: string) {
  nowTopic.value = topic
}

function fnRefreshChart() {
  updateTime.value = getCurrentDateTime()

  fetchOperationClawChart({
    startDate: '2024-09-01',
    endDate: '2024-09-07',
    // pcbName: 'TESTING_Coin1',
    pcbGroupId: '3bbca0e6-9166-266c-3a00-e67b123456d3',
    goodsId: '6d754fe5-e230-4b94-a553-e2cc66dd1fc1'
  })

  fetchOperationCoinChart({
    startDate: '2024-09-01',
    endDate: '2024-09-07',
    // pcbName: 'TESTING_Claw',
    pcbGroupId: '3bbca0e6-9166-266c-3a00-e67b123456d3',
    goodsId: '6d884fe5-e230-4b94-a553-e2cc66dd1fc1'
  })
}

fetchOperationClawChart({
  startDate: '2024-09-01',
  endDate: '2024-09-07',
  // pcbName: 'TESTING_Coin1',
  pcbGroupId: '3bbca0e6-9166-266c-3a00-e67b123456d3',
  goodsId: '6d754fe5-e230-4b94-a553-e2cc66dd1fc1'
})
fetchOperationCoinChart({
  startDate: '2024-09-01',
  endDate: '2024-09-07',
  // pcbName: 'TESTING_Claw',
  pcbGroupId: '3bbca0e6-9166-266c-3a00-e67b123456d3',
  goodsId: '6d884fe5-e230-4b94-a553-e2cc66dd1fc1'
})
</script>

<template>
  <div class="bar-chart-tab">
    <div
      class="tab-item revenue"
      :class="{ active: nowTopic === TABS.REVENUE }"
      @click="fnChangeTab(TABS.REVENUE)"
    >
      營收
    </div>
    <div
      class="tab-item profit"
      :class="{ active: nowTopic === TABS.PROFIT }"
      @click="fnChangeTab(TABS.PROFIT)"
    >
      盈餘
    </div>
  </div>
  <div class="bar-chart-container">
    <div class="chart-section">
      <div class="revenue">
        今日{{ nowTopic === TABS.REVENUE ? '營收' : '盈餘' }}
        <p class="revenue-data">
          {{ nowTopic === TABS.REVENUE ? revenueData : profit }}
        </p>
      </div>
      <div class="chartData-section">
        <BarChart
          class="chart"
          :isLoading="operationChart.isLoading.clawMachine || operationChart.isLoading.coinMachine"
          :data="operationChart.data"
        />
        <div class="chartData-container">
          <div class="data-title">
            <div class="title">
              出貨
              <BaseSvgIcon
                iconName="dropdown"
                color="white"
              />
            </div>
            <div class="data">{{ prizeWinCount }}</div>
          </div>
          <div class="data-title">
            <div class="title">
              盈餘
              <BaseSvgIcon
                iconName="dropdown"
                color="white"
              />
            </div>
            <div class="data">
              {{ profit }}
            </div>
          </div>
          <div class="data-title">
            <div class="title">
              兌幣量
              <BaseSvgIcon
                iconName="dropdown"
                color="white"
              />
            </div>
            <div class="data">{{ coinExchanged }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bar-chart-tab {
  display: flex;
  column-gap: 8px;
  padding-left: 1rem;
  .tab-item {
    padding: 8px 40px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    letter-spacing: 3px;
    user-select: none;
    cursor: pointer;
    color: $--color-white;
    background-color: $--color-Tab-bg;
    &.active {
      background-color: $--color-targetTab-bg;
    }
  }
}
.bar-chart-container {
  background-color: $--color-targetTab-bg;
  border-radius: $--border-radius-extraLarge;
  padding: 1rem;
  display: flex;
  column-gap: 2rem;
  .revenue {
    font-size: 1rem;
    font-weight: 400;
    color: $--color-white;
    line-height: 1.4;
    margin-bottom: 1rem;
    &-data {
      font-size: 2rem;
      font-weight: 700;
    }
  }
  .chart-section {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .chartData-section {
    display: flex;
    column-gap: 1.5rem;
    @include media-breakpoint-down(sm) {
      align-items: center;
    }
    .chart {
      width: 100%;
      aspect-ratio: 2 / 1;
      flex: 8;
    }
    .chartData-container {
      flex: 2;
      font-weight: 700;
      color: $--color-white;
      @include media-breakpoint-down(xs) {
        font-size: 0.75rem;
      }
    }

    .data-title {
      margin-bottom: 0.5rem;
      .title {
        display: flex;
        white-space: nowrap;
        align-items: center;
        justify-content: space-between;
        > * {
          flex-shrink: 0;
        }
      }
      .data {
        width: 100%;
      }
    }
  }
}
</style>
