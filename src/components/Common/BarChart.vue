<script lang="ts" setup>
import { ref } from 'vue'
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
import type { ChartOptions, ChartData } from 'chart.js' // 正確的型別引入方式

// 註冊 Chart.js 的組件
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// 非響應式變數
const colorPrimary = '#21cc9e'
const colorWarning = '#FC8902'

// ref 變數
const chartData = ref<ChartData<'bar'>>({
  labels: ['January', 'February', 'March'],
  datasets: [
    {
      data: [40, 20, 12],
      backgroundColor: [colorPrimary, colorPrimary, colorWarning]
    }
  ]
})

const chartOptions = ref<ChartOptions<'bar'>>({
  responsive: true,
  plugins: {
    legend: {
      display: false // 隱藏圖例（包括數據集標籤）
    }
  },
  scales: {
    x: {
      display: false // 隱藏 x 軸上的 labels
    },
    y: {
      beginAtZero: true // 確保 y 軸從 0 開始
    }
  }
})
</script>

<template>
  <div class="chartPage">
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>

<style lang="scss" scoped>
.chartPage {
  width: 800px;
}
</style>
