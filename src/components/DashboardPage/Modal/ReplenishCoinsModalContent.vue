<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

const { t: $t } = useI18n()

const props = defineProps<{
  count: number
}>()

const emit = defineEmits<{
  (e: 'update:count', value: number): void
}>()

const minusCount = () => {
  if (props.count > minCount) {
    emit('update:count', props.count - 1)
  }
}

const addCount = () => {
  if (props.count < maxCount) {
    emit('update:count', props.count + 1)
  }
}

const minCount = 0
const maxCount = 100
</script>

<template>
  <div class="replenish-coins-modal-content">
    <div class="title">{{ $t('DashboardPage.Modal.ReplenishCoins.Content') }}</div>
    <div class="input-container">
      <div
        class="minus-button"
        @click="minusCount"
      >
        <BaseSvgIcon iconName="minus" />
      </div>

      <div class="count">
        <a-input-number
          :value="props.count"
          :controls="false"
          :defaultValue="minCount"
          :min="minCount"
          :max="maxCount"
          @update:value="emit('update:count', $event)"
        />
      </div>
      <div
        class="add-button"
        @click="addCount"
      >
        <BaseSvgIcon iconName="add" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.replenish-coins-modal-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .title {
    text-align: center;
    color: $--color-gray-600;
  }

  .input-container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .minus-button,
    .add-button {
      @include base-transition;
      padding: 0.25rem;
      cursor: pointer;
      border-radius: $--border-radius-base;

      &:hover {
        background-color: $--color-gray-400;
      }
    }

    .count {
      :deep(.ant-input-number) {
        font-size: 1.5rem;
      }

      :deep(.ant-input-number-input) {
        color: $--color-primary;
        text-align: center;
        font-weight: 700;
        height: auto;
      }
    }
  }
}
</style>
