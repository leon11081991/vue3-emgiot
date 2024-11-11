<script setup lang="ts">
import type { MachineType } from '@/models/types/machine.types'
import type { CoinOperationsInfoResType } from '@/models/types/dashboard.types'
import type { DashboardModalType } from '@/models/types/modal.types'
import { ref } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { UtilCommon } from '@/utils/utilCommon'

const props = withDefaults(
  defineProps<{
    activeKey: string[]
    data: CoinOperationsInfoResType[]
  }>(),
  {
    activeKey: () => [],
    data: () => []
  }
)

const emit = defineEmits<{
  (e: 'update:activeKey', value: string[]): void
  (e: 'openModal', type: DashboardModalType, machineType?: 0 | 1): void
  (e: 'machineIdClicked', id: string): void
  (e: 'goToAccountInquiry', machineType: MachineType, id: string): void
}>()

const coinMachineType = 1
const coinActiveKey = ref(props.activeKey)

const updateValue = (value: string[]) => {
  coinActiveKey.value = value
  emit('update:activeKey', value)
}
</script>

<template>
  <div class="list coin-list">
    <div class="list-header coin">
      <div class="header-item pcbName">{{ $t('DashboardPage.CoinTabList.Header.PcbName') }}</div>
      <div class="header-item exchangedCount">
        {{ $t('DashboardPage.CoinTabList.Header.ExchangedCount') }}
      </div>
      <div class="header-item exchangedRemaining">
        {{ $t('DashboardPage.CoinTabList.Header.ExchangedRemaining') }}
      </div>
    </div>

    <div class="list-body">
      <a-empty v-if="!data || data?.length === 0" />
      <a-collapse
        v-if="data && data.length > 0"
        class="list-collapse"
        v-model:activeKey="coinActiveKey"
        :accordion="true"
        :bordered="false"
      >
        <a-collapse-panel
          class="list-collapse-panel"
          v-for="item in data"
          :key="item?.pcbId"
          @change="updateValue"
        >
          <template #header>
            <div class="item-main-content coin">
              <div class="item-section machine-name">
                <span class="item-category">{{ item?.pcbGroupName }}</span>
                <span class="item-id">
                  <BaseSvgIcon :iconName="`wifi-status-${item?.connectionStatus}`" />
                  {{ UtilCommon.ellipsisText(item?.pcbName, 10) }}
                </span>
              </div>
              <div class="item-section">
                <span>{{ item?.exchangedCount }}</span>
              </div>
              <div class="item-section chart-detail">
                <span class="chart-container">
                  <a-progress
                    class="doughnut-chart"
                    type="circle"
                    strokeColor="var(--color-secondary)"
                    :percent="UtilCommon.getPercentage(item?.coinExchanged, item?.coinRemaining)"
                    :size="40"
                  />
                </span>
                <span>{{ item?.coinExchanged }}/{{ item?.coinRemaining }}</span>
              </div>
            </div>
          </template>
          <div class="item-action-content coin">
            <div
              class="item-section action-button"
              @click="emit('goToAccountInquiry', 'coin', item?.pcbId)"
            >
              <BaseSvgIcon
                iconName="accounts"
                size="lg"
              />
              <span>{{ $t('DashboardPage.CoinTabList.Item.AccountInquiry') }}</span>
            </div>
            <div
              class="item-section action-button"
              @click="
                emit('openModal', 'securityStatus', coinMachineType),
                  emit('machineIdClicked', item?.pcbId)
              "
            >
              <BaseSvgIcon
                iconName="lock"
                size="lg"
              />
              <span>{{ $t('DashboardPage.CoinTabList.Item.SecurityStatus') }}</span>
            </div>
            <div
              class="item-section action-button"
              @click="
                emit('openModal', 'replenishCoins', coinMachineType),
                  emit('machineIdClicked', item?.pcbId)
              "
            >
              <BaseSvgIcon
                iconName="replenish-coins"
                size="lg"
              />
              <span>{{ $t('DashboardPage.CoinTabList.Item.ReplenishCoins') }}</span>
            </div>
            <div
              class="item-section action-button"
              @click="
                emit('openModal', 'moreOperation', coinMachineType),
                  emit('machineIdClicked', item?.pcbId)
              "
            >
              <BaseSvgIcon
                iconName="more-actions"
                size="lg"
              />
              <span>{{ $t('DashboardPage.CoinTabList.Item.MoreOperation') }}</span>
            </div>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  .list-header {
    display: grid;
    padding: 0.5rem;
    background-color: $--color-primary;
    border-top-left-radius: $--border-radius-middle;
    border-top-right-radius: $--border-radius-middle;

    .header-item {
      flex: 1;
      font-size: 0.875rem;
      color: $--color-white;
      text-align: center;
    }
  }

  .list-collapse {
    background-color: $--background-color-base;
  }

  .list-collapse-panel {
    :deep(.ant-collapse-expand-icon) {
      display: none;
    }

    :deep(.ant-collapse-header) {
      padding: 0.5rem;
    }

    :deep(.ant-collapse-content),
    :deep(.ant-collapse-content-box) {
      padding: 0;
    }

    .item-main-content {
      display: grid;

      & > .item-section {
        color: $--color-primary;
      }

      .machine-name {
        align-items: flex-start;
      }

      .item-category {
        padding: 0.25rem 0.5rem;
        background-color: $--color-primary;
        color: $--color-white;
        border-radius: $--border-radius-middle;
      }

      .item-id {
        display: flex;
        align-items: center;
        min-height: 1.25rem;
      }
    }

    .item-action-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 0.5rem;

      & > .item-section {
        flex: 1;
        color: $--color-gray-600;
      }

      .action-button {
        @include base-transition;
        border-radius: $--border-radius-middle;

        &:hover {
          cursor: pointer;
          background-color: rgba(#000000, 0.1);
        }
      }
    }

    .item-section {
      display: flex;
      flex-direction: column;
      align-items: center;

      &.chart-detail {
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }

  .coin {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
