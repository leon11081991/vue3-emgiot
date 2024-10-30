<script setup lang="ts">
// import
import { ref, computed } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import IndexBaseBarChart from './IndexBaseBarChart.vue'
import { useDate } from '@/composables/useDate'
import { useFetchStore } from '@/composables/useFetchStore'

// type
type OperationDataKey = 'revenue' | 'prizeWinCount' | 'profit' | 'coinExchanged'

// 非響應式變數
const TABS = {
  REVENUE: 'revenue',
  PROFIT: 'profit'
}

// ref 變數
const nowTopic = ref(TABS.REVENUE)
const updateTime = ref('')

// 初始化日期
const { today, getCurrentDateTime } = useDate()
updateTime.value = getCurrentDateTime()

// 獲取數據
const { operationTotalChart, fetchTotalOperationChart } = useFetchStore()

// computed
const calculateTotalForToday = (key: OperationDataKey) => {
  return computed(() => {
    const totalData = operationTotalChart.value.data || []
    const todayDate = today()
    const todayData = totalData.filter((entry) => {
      const entryDate = new Date(entry.date)
      return entryDate.toDateString() === new Date(todayDate).toDateString()
    })
    return todayData.reduce((total, entry) => total + (entry[key] || 0), 0)
  })
}

const revenueData = computed(() => `${calculateTotalForToday('revenue').value}`)
const prizeWinCount = calculateTotalForToday('prizeWinCount')
const profit = computed(() => `${calculateTotalForToday('profit').value}`)
const coinExchanged = computed(() => `${calculateTotalForToday('coinExchanged').value}`)

// function
function fnChangeTab(topic: string) {
  nowTopic.value = topic
}

fetchTotalOperationChart()
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
        <IndexBaseBarChart
          class="chart"
          :isLoading="operationTotalChart.isLoading"
          :data="operationTotalChart.data"
        />
        <div class="chartData-container">
          <div class="data-title">
            <div class="title">
              出貨成本
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
