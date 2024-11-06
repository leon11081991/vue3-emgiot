<script setup lang="ts">
import type { BaseClawRecordType, BaseCoinRecordType } from '@/models/types/machine.types'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData
} from 'chart.js'
import { Chart } from 'vue-chartjs'
import { useDate } from '@/composables/useDate'

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

const props = defineProps<
  | {
      type: 'claw'
      list: BaseClawRecordType[]
    }
  | {
      type: 'coin'
      list: BaseCoinRecordType[]
    }
>()

const { formatDate } = useDate()

const chartDataConfig =
  props.type === 'claw'
    ? [
        {
          type: 'bar' as const,
          label: '營收',
          data: (props.list as BaseClawRecordType[]).map((item) => item.revenue),
          backgroundColor: 'rgba(132, 191, 255, 0.5)',
          borderRadius: 5,
          yAxisID: 'y'
        },
        {
          type: 'line' as const,
          label: '出貨',
          data: (props.list as BaseClawRecordType[]).map((item) => item.prizeWinCount),
          borderColor: 'rgba(53, 188, 103,0.5)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(53, 188, 103,0.5)',
          yAxisID: 'y1'
        }
      ]
    : [
        {
          type: 'bar' as const,
          label: '兌幣量',
          data: (props.list as BaseCoinRecordType[]).map((item) => item.exchangeCount),
          backgroundColor: 'rgba(132, 191, 255, 0.5)',
          borderRadius: 5,
          yAxisID: 'y'
        }
      ]

const chartData: ChartData<'bar' | 'line'> = {
  labels: props.list.map((item) => formatDate(item.date, 'MM/DD')),
  datasets: chartDataConfig
}

const chartOptions: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  scales: {
    x: {
      display: true,
      grid: {
        display: false // 隱藏 y 軸的網格線
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
    }
  }
}
</script>

<template>
  <Chart
    type="bar"
    :data="chartData"
    :options="chartOptions"
  />
</template>
