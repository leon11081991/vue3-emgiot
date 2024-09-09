<script setup lang="ts">
import { ref } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

const props = defineProps<{
  activeKey: string[]
}>()

const emit = defineEmits<{
  (e: 'update:activeKey', value: string[]): void
}>()

const clawActiveKey = ref(props.activeKey)

const updateValue = (value: string[]) => {
  clawActiveKey.value = value
  emit('update:activeKey', value)
}
</script>

<template>
  <div class="list claw-list">
    <div class="list-header claw">
      <div class="header-item pcbName">機台</div>
      <div class="header-item averagePrizeWinCount">平均出貨金額</div>
      <div class="header-item revenue">營收</div>
      <div class="header-item prizeWinCount">出貨</div>
    </div>

    <div class="list-body">
      <a-collapse class="list-collapse" v-model:activeKey="clawActiveKey" :bordered="false">
        <a-collapse-panel class="list-collapse-panel" key="1" @change="updateValue">
          <template #header>
            <div class="item-main-content claw">
              <div class="item-section">
                <span class="item-category">南部食品機</span>
                <span class="item-id">W208_01</span>
              </div>
              <div class="item-section">
                <span>義美小泡芙(巧克力)</span>
                <span>$100</span>
              </div>
              <div class="item-section">$800</div>
              <div class="item-section">12</div>
            </div>
          </template>
          <div class="item-action-content claw">
            <div class="item-section">
              <span>$800</span>
              <span>錢箱累積</span>
            </div>
            <div class="item-section">
              <span>$110</span>
              <span>累保金額</span>
            </div>
            <div class="item-section action-button">
              <BaseSvgIcon iconName="accounts" size="lg" />
              <span>帳務查詢</span>
            </div>
            <div class="item-section action-button">
              <BaseSvgIcon iconName="replenish-coins" size="lg" />
              <span>遠端補幣</span>
            </div>
            <div class="item-section action-button">
              <BaseSvgIcon iconName="more-actions" size="lg" />
              <span>其他操作</span>
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

      .item-category {
        padding: 0.25rem 0.5rem;
        background-color: $--color-primary;
        color: $--color-white;
        border-radius: $--border-radius-middle;
      }

      .item-id {
        position: relative;
        &:before {
          position: absolute;
          content: '';
          width: 0.3rem;
          height: 0.3rem;
          border-radius: $--border-radius-circle;
          background-color: $--color-secondary;

          top: 50%;
          left: -0.5rem;
          transform: translateY(-50%);
        }
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

  .claw {
    grid-template-columns: 1fr 1fr 0.5fr 0.5fr;
  }
}
</style>
