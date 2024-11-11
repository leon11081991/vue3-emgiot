<script lang="ts" setup>
/* import */
import { ref, computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import type { ChartOptions, ChartData } from 'chart.js'
import type {
  OperationChartResType,
  PropsBarChartType,
  CoinMachineResType,
  ClawMachineResType
} from '@/models/types/dashboard.types'
import { useDate } from '@/composables/useDate'

/* Props (defineProps) */
const props = defineProps<{
  isLoading: Boolean
  data: OperationChartResType
  type: PropsBarChartType
}>()

/* 非響應式變數 */
const rootStyles = getComputedStyle(document.documentElement)
const barDefaultColor = rootStyles.getPropertyValue('--bar-default-color').trim()
const barTargetColor = rootStyles.getPropertyValue('--bar-target-color').trim()
const revenueBgColor = rootStyles.getPropertyValue('--bg-revenue-color').trim()
const chartKey: Record<PropsBarChartType, keyof OperationChartResType> = {
  coin: 'coinMachine',
  claw: 'clawMachine'
}

/* 子組件 ref */
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

/* ref 變數 */
const chartOptions = ref<ChartOptions<'bar'>>({
  responsive: true,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#646464',
      bodyColor: '#323232',
      padding: 10,
      cornerRadius: 8,
      callbacks: {
        labelColor: (context) => {
          const backgroundColorArray = context.dataset?.backgroundColor as string[] | undefined
          const backgroundColor = backgroundColorArray?.[context.dataIndex] || '#000'
          return {
            borderColor: 'rgba(255, 255, 255, 0)',
            backgroundColor: backgroundColor,
            borderWidth: 0,
            borderRadius: 5
          }
        }
      }
    }
  },
  scales: {
    x: {
      display: false
    },
    y: {
      beginAtZero: true,
      ticks: {
        display: false
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: false,
        color: (context) => (context.tick.value === 0 ? revenueBgColor : revenueBgColor),
        lineWidth: (context) => (context.tick.value === 0 ? 2 : 1)
      },
      border: {
        display: false
      }
    }
  }
})

/* computed */
const { formatDate, today } = useDate()
const chartData = computed<ChartData<'bar'>>(() => {
  const data = props.data[chartKey[props.type]]
  return {
    labels: data.map((item) => formatDate(item.date, 'YYYY-MM-DD')),
    datasets: [
      {
        data: data.map((item) => {
          if (props.type === 'coin') {
            return (item as CoinMachineResType).coinExchanged
          } else if (props.type === 'claw') {
            return (item as ClawMachineResType).revenue
          }
          return (item as ClawMachineResType).revenue
        }),
        backgroundColor: data.map((item) => {
          const nowDate = formatDate(item.date, 'YYYY-MM-DD')
          return nowDate === today() ? barTargetColor : barDefaultColor
        }),
        borderRadius: 6
      }
    ]
  }
})
</script>

<template>
  <div class="chartSection">
    <Bar
      v-if="!props.isLoading"
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<style lang="scss" scoped>
.chartSection {
  width: 100%;
  position: relative;
}
</style>
