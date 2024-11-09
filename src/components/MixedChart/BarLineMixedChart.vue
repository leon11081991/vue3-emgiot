<script setup lang="ts">
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import type { ChartOptions, ChartData, ChartDataset } from 'chart.js'
import { Chart } from 'vue-chartjs'
import { ref, computed, watch } from 'vue'
import { useDate } from '@/composables/useDate'
import type {
  BaseClawRecordType,
  BaseCoinRecordType,
  AggregateRecordType
} from '@/models/types/machine.types'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
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

const { formatDate } = useDate()

const chartDataConfig = computed<ChartDataset<'bar' | 'line', number[]>[]>(() => {
  if (props.type === 'claw') {
    return [
      {
        type: 'bar',
        label: '營收',
        data: props.list?.map((item) => ('revenue' in item ? (item.revenue ?? 0) : 0)),
        backgroundColor: 'rgba(132, 191, 255, 0.5)',
        borderRadius: 5,
        yAxisID: 'y'
      },
      {
        type: 'line',
        label: '出貨',
        data: props.list?.map((item) => ('prizeWinCount' in item ? (item.prizeWinCount ?? 0) : 0)),
        borderColor: 'rgba(53, 188, 103, 0.5)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(53, 188, 103, 0.5)',
        yAxisID: 'y1'
      }
    ]
  } else {
    return [
      {
        type: 'bar',
        label: '兌幣量',
        data: props.list?.map((item) => ('exchangeCount' in item ? (item.exchangeCount ?? 0) : 0)),
        backgroundColor: 'rgba(132, 191, 255, 0.5)',
        borderRadius: 5,
        yAxisID: 'y'
      }
    ]
  }
})

const labels = computed(() => {
  return props.list?.map((item) => {
    if (props.selectedType === 'week' && typeof item.date === 'number') {
      return `第${item.date}週`
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
