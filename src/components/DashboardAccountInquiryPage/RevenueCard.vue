<script setup lang="ts">
import { computed } from 'vue'
import type { clawMachineCardType, coinMachineCardType } from '@/models/types/machine.types'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

/* defineProps */
const props = defineProps<
  | {
      type: 'claw'
      data: clawMachineCardType
    }
  | {
      type: 'coin'
      data: coinMachineCardType
    }
>()

/* defineEmit */
const emit = defineEmits<{
  (e: 'open:date-modal'): void
}>()

/* function */
const handleOpenModal = () => {
  emit('open:date-modal')
}

/* computed */
const isClaw = computed(() => props.type === 'claw')
const isCoin = computed(() => props.type === 'coin')

const clawData = computed(() => {
  if (props.type === 'claw') {
    return props.data
  }
  return null
})

const coinData = computed(() => {
  if (props.type === 'coin') {
    return props.data
  }
  return null
})
</script>

<template>
  <div class="account-inquiry-card-container">
    <!-- claw type -->
    <div v-if="isClaw && clawData">
      <div class="pcbName">{{ clawData.pcbName }}</div>
      <div class="content">
        <div class="content-header">
          <div class="revenue-summary">
            {{ '期間總營收' }}&nbsp;&nbsp;<span class="price">$ {{ clawData.totalRevenue }}</span>
          </div>
          <div
            class="filter-button"
            @click="handleOpenModal"
          >
            <BaseSvgIcon
              iconName="filter-menu-sm"
              size="lg"
            />
          </div>
        </div>
        <div class="content-body">
          <div class="data-title">
            <div class="title">
              出貨
              <BaseSvgIcon
                iconName="dropdown"
                color="white"
              />
            </div>
            <div class="data count">{{ clawData.prizeWinCount }}</div>
          </div>
          <div class="data-title">
            <div class="title">
              平均出貨金額
              <BaseSvgIcon
                iconName="dropdown"
                color="white"
              />
            </div>
            <div class="data price">${{ clawData.averagePrizeWinCount }}</div>
          </div>
          <div class="data-title">
            <div class="title">
              盈餘
              <BaseSvgIcon
                iconName="dropdown"
                color="white"
              />
            </div>
            <div class="data price">${{ clawData.profit }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- coin type -->
    <div v-else-if="isCoin && coinData">
      <div class="pcbName">{{ '兌幣機' }}</div>
      <div class="content">
        <div class="content-header">
          <div class="revenue-summary">
            {{ '期間兌幣量' }}&nbsp;&nbsp;<span class="count"
              >$ {{ coinData.totalExchangeCoinCount }}</span
            >
          </div>
          <div
            class="filter-button"
            @click="handleOpenModal"
          >
            <BaseSvgIcon
              iconName="filter-menu-sm"
              size="lg"
            />
          </div>
        </div>
        <div class="content-body">
          <div class="data-title">
            <div class="title">
              {{ '已兌換量' }}
              <BaseSvgIcon
                iconName="dropdown"
                color="white"
              />
            </div>
            <div class="data count">{{ coinData.coinExchanged }}</div>
          </div>
          <div class="data-title">
            <div class="title">
              {{ '剩餘幣量' }}
              <BaseSvgIcon
                iconName="dropdown"
                color="white"
              />
            </div>
            <div class="data count">${{ coinData.coinRemaining }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.account-inquiry-card-container {
  .pcbName {
    position: relative;
    width: 50%;
    padding: 0.3rem;
    margin-left: auto;
    border-radius: 6px;
    bottom: 2px;
    text-align: center;
    color: $--color-white;
    background-color: $--color-targetTab-bg;
  }
  .content {
    padding: 0.5rem 0.5rem 1rem 3rem;
    border-radius: 8px;
    font-size: 16px;
    color: $--color-white;
    background-color: $--color-targetTab-bg;
    &-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &-body {
      display: flex;
    }
    .data-title {
      flex: 1;
      > .title {
        display: flex;
        align-items: center;
      }
    }
  }
  .price,
  .count {
    font-size: 20px;
    font-weight: bold;
  }
  .filter-button {
    cursor: pointer;
  }
}
</style>
