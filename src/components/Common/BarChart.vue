<script lang="ts" setup>
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
import type { OperationChartResType } from '@/models/types/dashboard.types'
import { useDate } from '@/composables/useDate'

// Props (defineProps)
const props = defineProps<{
  isLoading: Boolean
  data: OperationChartResType
}>()

// 非響應式變數
const rootStyles = getComputedStyle(document.documentElement)
const barDefaultColor = rootStyles.getPropertyValue('--bar-default-color').trim()
const barTargetColor = rootStyles.getPropertyValue('--bar-target-color').trim()
const revenueBgColor = rootStyles.getPropertyValue('--bg-revenue-color').trim()

// 子組件 ref
// Chart.js 的組件需要先註冊
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// ref 變數
const chartOptions = ref<ChartOptions<'bar'>>({
  responsive: true,
  plugins: {
    legend: {
      display: false // 隱藏圖例（包括數據集標籤）
    },
    tooltip: {
      backgroundColor: '#fff',
      titleColor: '#646464',
      bodyColor: '#323232',
      padding: 10,
      cornerRadius: 8,
      callbacks: {
        labelColor: (context) => {
          // 檢查 context.dataset 是否有定義
          const backgroundColorArray = context.dataset?.backgroundColor as string[] | undefined
          const backgroundColor = backgroundColorArray?.[context.dataIndex] || '#000' // 如果未定義則使用預設顏色
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
      display: false // 隱藏 x 軸上的 labels
    },
    y: {
      beginAtZero: true, // 確保 y 軸從 0 開始
      ticks: {
        display: false // 隱藏 y 軸上的 labels
      },
      grid: {
        display: true, // 顯示網格線
        drawOnChartArea: true, // 繪製在圖表區域內
        drawTicks: false, // 繪製 y 軸的刻度線
        color: (context) => (context.tick.value === 0 ? revenueBgColor : revenueBgColor), // 設定 0 線的顏色和其他線的顏色
        lineWidth: (context) => (context.tick.value === 0 ? 2 : 1) // 設定 0 線的寬度和其他線的寬度
      },
      border: {
        display: false // 不顯示 y 軸的邊框
      }
    }
  }
})

// computed
const { formatDate } = useDate()
const chartData = computed<ChartData<'bar'>>(() => ({
  labels: props.data.clawMachine.map((item) => formatDate(item.date, 'YYYY-MM-DD')),
  datasets: [
    {
      data: props.data.clawMachine.map((item) => item.revenue), // 替換為新數據
      backgroundColor: props.data.clawMachine.map((item) => {
        const nowDate = formatDate(item.date, 'YYYY-MM-DD')
        // 日期比較之後會吃變數
        if (nowDate === '2024-09-07') {
          return barTargetColor
        }
        return barDefaultColor
      }),
      borderRadius: 6 // 設定圓角半徑
    }
  ]
}))
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
