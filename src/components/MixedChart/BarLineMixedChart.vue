<script setup lang="ts">
import { Chart } from 'vue-chartjs'
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

// 註冊 Chart.js 所需的組件
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

// 定義 chartData 的類型
const chartData: ChartData<'bar' | 'line'> = {
  labels: ['08/02', '08/04', '08/06', '08/08'],
  datasets: [
    {
      type: 'bar' as const,
      label: 'Bar Dataset',
      data: [200, 300, 400, 200],
      backgroundColor: 'rgba(54, 162, 235, 0.5)',
      yAxisID: 'y'
    },
    {
      type: 'line' as const,
      label: 'Line Dataset',
      data: [150, 250, 600, 250],
      borderColor: 'green',
      borderWidth: 2,
      pointBackgroundColor: 'green',
      yAxisID: 'y1'
    }
  ]
}

// 定義 chartOptions 的類型
const chartOptions: ChartOptions<'bar' | 'line'> = {
  responsive: true,
  scales: {
    x: {
      display: false
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
<style lang="scss" scoped></style>
