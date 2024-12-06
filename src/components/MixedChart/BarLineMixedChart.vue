<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import type { ChartOptions, ChartData, ChartDataset } from 'chart.js'
import { Chart } from 'vue-chartjs'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import { useDate } from '@/composables/useDate'
import type {
  BaseClawRecordType,
  BaseCoinRecordType,
  AggregateRecordType
} from '@/models/types/machine.types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)
type ChartRecordType =
  | BaseClawRecordType
  | BaseCoinRecordType
  | AggregateRecordType
  | Partial<Record<'date', number>>

const props = defineProps<{
  type: 'claw' | 'coin'
  list: ChartRecordType[]
  selectedType: 'day' | 'week' | 'month'
}>()

const { t: $t } = useI18n()
const { formatDate } = useDate()

const chartDataConfig = computed<ChartDataset<'bar' | 'line', number[]>[]>(() => {
  if (props.type === 'claw') {
    return [
      {
        type: 'bar',
        label: $t('AccountInquiryPage.BarLineChart.Claw.Label.Revenue'),
        data: props.list?.map((item) => ('revenue' in item ? (item.revenue ?? 0) : 0)),
        backgroundColor: 'rgb(117,183,184,0.8)',
        borderRadius: 5,
        yAxisID: 'y'
      },
      {
        type: 'line',
        label: $t('AccountInquiryPage.BarLineChart.Claw.Label.PrizeWinCount'),
        data: props.list?.map((item) => ('prizeWinCount' in item ? (item.prizeWinCount ?? 0) : 0)),
        borderColor: 'rgb(236,205,75,0.8)',
        borderWidth: 2,
        pointBackgroundColor: 'rgb(236,205,75,0.8)',
        yAxisID: 'y1'
      }
    ]
  } else {
    return [
      {
        type: 'bar',
        label: $t('AccountInquiryPage.BarLineChart.Coin.Label.ExchangeCount'),
        data: props.list?.map((item) => ('exchangeCount' in item ? (item.exchangeCount ?? 0) : 0)),
        backgroundColor: 'rgb(117,183,184,0.8)',
        borderRadius: 5,
        yAxisID: 'y'
      }
    ]
  }
})

const labels = computed(() => {
  return props.list?.map((item) => {
    if (props.selectedType === 'week' && typeof item.date === 'number') {
      return `${$t('AccountInquiryPage.BarLineChart.Week', { week: item.date })}`
    }

    if (typeof item.date === 'string') {
      if (props.selectedType === 'month') {
        return formatDate(item.date, 'MM')
      }
      if (props.selectedType === 'day') {
        return formatDate(item.date, 'MM/DD')
      }
    }

    return ''
  })
})

const chartData = computed<ChartData<'bar' | 'line'>>(() => ({
  labels: labels.value,
  datasets: chartDataConfig.value
}))

const chartOptions = computed<ChartOptions<'bar' | 'line'>>(() => ({
  responsive: true,
  scales: {
    x: {
      display: true,
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: true,
      position: 'left'
    },
    y1: {
      display: false
    }
  },
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: false
    }
  }
}))
</script>

<template>
  <Chart
    :type="'bar'"
    :data="chartData"
    :options="chartOptions"
  />
</template>
