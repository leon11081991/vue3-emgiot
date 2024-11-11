<script setup lang="ts">
/* import */
import { useI18n } from 'vue-i18n'
import { ref, computed } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import ProductInfoBaseBarChart from './ProductInfoBaseBarChart.vue'
import { useDate } from '@/composables/useDate'
import { useGoods } from '@/composables/useGoods'

/* type */
type OperationDataKey = 'revenue' | 'prizeWinCount' | 'profit'

/* defineProps */
const props = defineProps<{
  title: string
  goodsId: string
}>()

/* i18n */
const { t: $t } = useI18n()

/* 非響應式變數 */
const TABS = {
  REVENUE: 'revenue',
  PROFIT: 'profit'
}
const { productListInfoChart, fnGetProductOperationInfoChart } = useGoods()

/* ref 變數 */
const nowTopic = ref(TABS.REVENUE)
const updateTime = ref('')

// 初始化日期
const { today, getCurrentDateTime } = useDate()
updateTime.value = getCurrentDateTime()

/* computed */
const calculateTotalForToday = (key: OperationDataKey) => {
  return computed(() => {
    const totalData = productListInfoChart.value.data || []
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

/* function */
function fnChangeTab(topic: string) {
  nowTopic.value = topic
}

fnGetProductOperationInfoChart(props.goodsId)
</script>

<template>
  <div class="bar-chart-tab">
    <div
      class="tab-item revenue"
      :class="{ active: nowTopic === TABS.REVENUE }"
      @click="fnChangeTab(TABS.REVENUE)"
    >
      {{ $t('ProductInfoChartPage.Chart.Tab.Revenue') }}
    </div>
    <div
      class="tab-item profit"
      :class="{ active: nowTopic === TABS.PROFIT }"
      @click="fnChangeTab(TABS.PROFIT)"
    >
      {{ $t('ProductInfoChartPage.Chart.Tab.Profit') }}
    </div>
    <div class="goodsName">
      {{ props.title }}
    </div>
  </div>
  <div class="bar-chart-container">
    <div class="chart-section">
      <div class="revenue">
        {{ $t('ProductInfoChartPage.Chart.Today')
        }}{{
          nowTopic === TABS.REVENUE
            ? $t('ProductInfoChartPage.Chart.Tab.Revenue')
            : $t('ProductInfoChartPage.Chart.Tab.Profit')
        }}
        <p class="revenue-data">
          {{ nowTopic === TABS.REVENUE ? revenueData : profit }}
        </p>
      </div>
      <div class="chartData-section">
        <ProductInfoBaseBarChart
          class="chart"
          :isLoading="productListInfoChart.isLoading"
          :data="productListInfoChart.data"
        />
        <div class="chartData-container">
          <div class="data-title">
            <div class="title">
              {{ $t('ProductInfoChartPage.Chart.PrizeWinCount') }}
              <BaseSvgIcon
                iconName="dropdown"
                color="white"
              />
            </div>
            <div class="data">{{ prizeWinCount }}</div>
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
    text-align: center;
    cursor: pointer;
    color: $--color-white;
    background-color: $--color-Tab-bg;
    &.active {
      background-color: $--color-targetTab-bg;
    }
    @media screen and (max-width: 430px) {
      flex: 1;
      padding: 8px 0;
    }
  }
  .goodsName {
    display: flex;
    align-items: center;
    max-height: 32px;
    padding: 0 8px;
    margin: 0 16px 0 auto;
    border-radius: 8px;
    user-select: none;
    cursor: pointer;
    color: $--color-white;
    background-color: $--color-primary;
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
    .chart {
      width: 100%;
      aspect-ratio: 2 / 1;
      flex: 8;
    }
    .chartData-container {
      position: relative;
      flex: 2;
      font-weight: 700;
      color: $--color-white;
      @include media-breakpoint-down(xs) {
        font-size: 0.75rem;
      }
    }

    .data-title {
      position: absolute;
      bottom: 0;
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
