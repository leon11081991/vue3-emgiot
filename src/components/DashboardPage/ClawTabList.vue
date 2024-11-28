<script setup lang="ts">
import type { MachineType } from '@/models/types/machine.types'
import type { ClawOperationsInfoDataType } from '@/models/types/dashboard.types'
import type { DashboardModalType } from '@/models/types/modal.types'
import { useI18n } from 'vue-i18n'
import { ref, withDefaults } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { UtilCommon } from '@/utils/utilCommon'

const props = withDefaults(
  defineProps<{
    activeKey: string[]
    data: ClawOperationsInfoDataType[]
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

const { t: $t } = useI18n()

const clawMachineType = 0
const clawActiveKey = ref(props.activeKey)

const updateValue = (value: string[]) => {
  clawActiveKey.value = value
  emit('update:activeKey', value)
}
</script>

<template>
  <div class="list claw-list">
    <div class="list-header claw">
      <div class="header-item pcbName">{{ $t('DashboardPage.ClawTabList.Header.PcbName') }}</div>
      <div class="header-item averagePrizeWinCount">
        {{ $t('DashboardPage.ClawTabList.Header.AveragePrizeWinCount') }}
      </div>
      <div class="header-item revenue">{{ $t('DashboardPage.ClawTabList.Header.Revenue') }}</div>
      <div class="header-item prizeWinCount">
        {{ $t('DashboardPage.ClawTabList.Header.PrizeWinCount') }}
      </div>
    </div>

    <div class="list-body">
      <a-empty v-if="!data || data?.length === 0" />
      <a-collapse
        v-if="data && data.length > 0"
        class="list-collapse"
        v-model:activeKey="clawActiveKey"
        :accordion="true"
        :bordered="false"
      >
        <a-collapse-panel
          class="list-collapse-panel"
          v-for="item in data"
          :key="item?.uuid"
          @change="updateValue"
        >
          <template #header>
            <div class="item-main-content claw">
              <div class="item-section machine-name">
                <span class="item-category group-tag">{{ item?.pcbGroupName }}</span>
                <div class="item-id">
                  <BaseSvgIcon :iconName="`wifi-status-${item?.connectionStatus}`" />
                  {{ UtilCommon.ellipsisText(item?.pcbName, 10) }}
                </div>
              </div>
              <div class="item-section">
                <span>{{ item?.goodsName }}</span>
                <span>${{ UtilCommon.getAveragePrice(item?.revenue, item?.prizeWinCount) }}</span>
              </div>
              <div class="item-section">${{ item?.revenue }}</div>
              <div class="item-section">{{ item?.prizeWinCount }}</div>
            </div>
          </template>
          <div class="item-action-content claw">
            <div class="item-section">
              <span class="amount">${{ item?.cashboxAmount }}</span>
              <span>{{ $t('DashboardPage.ClawTabList.Item.CashboxAmount') }}</span>
            </div>
            <div class="item-section">
              <span class="amount">${{ item?.cumulativeAmount }}</span>
              <span>{{ $t('DashboardPage.ClawTabList.Item.CumulativeAmount') }}</span>
            </div>
            <div
              class="item-section action-button"
              @click="emit('goToAccountInquiry', 'claw', item?.pcbId)"
            >
              <BaseSvgIcon
                iconName="accounts"
                size="lg"
              />
              <span>{{ $t('DashboardPage.ClawTabList.Item.AccountInquiry') }}</span>
            </div>
            <div
              class="item-section action-button"
              @click="
                emit('openModal', 'replenishCoins', clawMachineType),
                  emit('machineIdClicked', item?.pcbId)
              "
            >
              <BaseSvgIcon
                iconName="replenish-coins"
                size="lg"
              />
              <span>{{ $t('DashboardPage.ClawTabList.Item.ReplenishCoins') }}</span>
            </div>
            <div
              class="item-section action-button"
              @click="
                emit('openModal', 'moreOperation', clawMachineType),
                  emit('machineIdClicked', item?.pcbId)
              "
            >
              <BaseSvgIcon
                iconName="more-actions"
                size="lg"
              />
              <span>{{ $t('DashboardPage.ClawTabList.Item.MoreOperation') }}</span>
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

      .item-section {
        .amount {
          color: $--color-primary;
          font-weight: 700;
        }
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

  .claw {
    grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
  }
}
</style>
