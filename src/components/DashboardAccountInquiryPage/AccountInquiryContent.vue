<script setup lang="ts">
import type { MachineType } from '@/models/types/machine.types'
import type {
  BaseClawRecordType,
  BaseCoinRecordType,
  ClawOperationsDetailResType,
  CoinOperationsDetailResType
} from '@/models/types/machine.types'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { ref, computed } from 'vue'
import { useDate } from '@/composables/useDate'
import { LIST_TYPE } from '@/constants/common/option.const'

type ListType = 'day' | 'week' | 'month'

const props = withDefaults(
  defineProps<{
    data: ClawOperationsDetailResType | CoinOperationsDetailResType
  }>(),
  {
    data() {
      return {} as ClawOperationsDetailResType | CoinOperationsDetailResType
    }
  }
)

const { t: $t } = useI18n()
const route = useRoute()
const { formatDate } = useDate()

// 非響應式變數
const machineType = route.params.machineType as MachineType

// ref 變數
const selectedType = ref<ListType>('day')
const accountList = computed(() => {
  return props.data?.records
})

// function
const getDate = (date: string | null) => {
  if (!date) return ''
  return formatDate(date, 'YYYY-MM-DD')
}
</script>

<template>
  <div class="account-inquiry-content">
    <div class="list-container">
      <div class="list-action">
        <label
          class="action-label"
          v-for="type in LIST_TYPE"
          :for="type.value"
          :key="type.value"
        >
          <input
            type="radio"
            :id="type.value"
            :name="type.value"
            :value="type.value"
            v-model="selectedType"
          />
          <span>{{ type.label }}</span>
        </label>
      </div>
      <div class="list-content">
        <div
          class="content-header"
          :class="machineType"
        >
          <div class="date-header">{{ $t('AccountInquiryPage.ContentHeader.Date') }}</div>
          <template v-if="machineType === 'claw'">
            <div class="count-header">
              {{ $t('AccountInquiryPage.ContentHeader.PrizeWinCount') }}
            </div>
            <div class="count-header">{{ $t('AccountInquiryPage.ContentHeader.Revenue') }}</div>
          </template>
          <template v-if="machineType === 'coin'">
            <div class="count-header">
              {{ $t('AccountInquiryPage.ContentHeader.ExchangeCount') }}
            </div>
          </template>
        </div>
        <ul class="content-list">
          <li
            v-for="item in accountList"
            :key="item.date"
            :class="machineType"
            class="content-item"
          >
            <div class="date">{{ getDate(item?.date) }}</div>
            <template v-if="machineType === 'claw'">
              <div class="count prizeWinCount">
                {{ (item as BaseClawRecordType)?.prizeWinCount }}
              </div>
              <div class="count revenue">{{ (item as BaseClawRecordType)?.revenue }}</div>
            </template>
            <template v-if="machineType === 'coin'">
              <div class="count exchangeCount">
                {{ (item as BaseCoinRecordType)?.exchangeCount }}
              </div>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list-action {
  display: flex;

  .action-label {
    margin-right: 1rem;

    &:first-of-type {
      margin-left: 1rem;
    }

    span {
      @include base-transition;
      display: block;
      padding-block: 2px;
      padding-inline: 0.5rem;
      background-color: $--color-white;
      border: 3px solid $--color-primary;
      border-bottom: none;
      border-radius: $--border-radius-middle $--border-radius-middle 0 0;
      color: $--color-primary;
      text-align: center;
      cursor: pointer;

      &:hover {
        background-color: rgba($--color-primary--hover, 0.8);
        color: $--color-white;
      }
    }

    input[type='radio'] {
      display: none;
    }

    input[type='radio']:checked + span {
      background-color: $--color-primary;
      color: $--color-white;

      &:hover {
        background-color: rgba($--color-primary--hover, 0.8);
      }
    }
  }
}

.list-content {
  padding: 1rem;
  border: 3px solid $--color-primary;
  border-radius: $--border-radius-middle;

  .content-header {
    display: grid;
    text-align: center;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid $--color-gray-500;
    color: $--color-gray-600;

    &.claw {
      grid-template-columns: 1fr 1fr 1fr;
    }

    &.coin {
      grid-template-columns: 1fr 1fr;
    }
  }

  .content-list {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 1rem;
  }

  .content-item {
    display: grid;
    text-align: center;
    color: $--color-gray-700;

    &.claw {
      grid-template-columns: 1fr 1fr 1fr;
    }

    &.coin {
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
