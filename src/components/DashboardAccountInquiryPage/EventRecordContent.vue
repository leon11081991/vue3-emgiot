<script setup lang="ts">
import type { MachineEventRecordsResType } from '@/models/types/machine.types'
import { computed, ref } from 'vue'
import BaseLoading from '@/components/Base/BaseLoading.vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { useDate } from '@/composables/useDate'
import { CLAW_EVENT_OPTIONS, COIN_EVENT_OPTIONS } from '@/constants/common/option.const'

const props = withDefaults(
  defineProps<{
    data: MachineEventRecordsResType
    isLoading: boolean
    machineType: 'claw' | 'coin'
  }>(),
  {
    data: () => [],
    isLoading: true
  }
)

const { getTargetDateTime } = useDate()

// 非響應式變數
const options = props.machineType === 'claw' ? CLAW_EVENT_OPTIONS : COIN_EVENT_OPTIONS

// ref 變數
const selectedEvent = ref<number[]>([])
const records = computed(() => {
  return props.data
  // return props.data?.filter((item) => selectedEvent.value.includes(item.eventCode))
})
</script>

<template>
  <div class="event-record-content">
    <div class="actions-container">
      <label
        class="action-label"
        v-for="option in options"
        :key="option.value"
      >
        <input
          type="checkbox"
          name="event type"
          :value="option.value"
          v-model="selectedEvent"
        />
        <span>{{ option.label }}</span>
      </label>
    </div>

    <!-- {{ records }} -->
    <div class="event-container">
      <BaseLoading
        v-if="props.isLoading"
        position="absolute"
      />
      <ul
        v-if="!props.isLoading && records?.length > 0"
        class="event-list"
      >
        <li
          v-for="record in records"
          :key="`${record?.event}+${record?.eventLog}`"
          class="event-item"
        >
          <BaseSvgIcon
            iconName="coin"
            size="lg"
          />
          <div class="event-detail">
            <div class="event-type-label">{{ record?.event }}</div>
            <div class="event-count">{{ record?.eventLog }}</div>
            <div class="event-time">{{ getTargetDateTime(record?.date) }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <!-- {{ selectedEvent }} -->
</template>

<style lang="scss" scoped>
.actions-container {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.action-label {
  flex: 1;

  span {
    @include base-transition;
    display: block;
    padding-block: 0.5rem;
    background-color: $--color-white;
    border: 3px solid $--color-primary;
    border-radius: $--border-radius-large;
    color: $--color-primary;
    text-align: center;
    cursor: pointer;

    @include media-breakpoint-down(sm) {
      font-size: 0.875rem;
    }

    &:hover {
      background-color: rgba($--color-primary--hover, 0.8);
      color: $--color-white;
    }
  }

  input[type='checkbox'] {
    display: none;
  }

  input[type='checkbox']:checked + span {
    background-color: $--color-primary;
    color: $--color-white;

    &:hover {
      background-color: rgba($--color-primary--hover, 0.8);
    }
  }
}

.event-container {
  position: relative;
  margin-top: 1.5rem;
  min-height: 200px;

  .event-list {
    padding-inline: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .event-item {
      display: flex;
      align-items: center;

      .svg-icon {
        flex: 0 1 15%;
      }

      .event-detail {
        flex: 1;
        display: grid;
        grid-template-areas:
          'label time'
          'count time';
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;

        @include media-breakpoint-down(sm) {
          font-size: 0.875rem;
        }
      }

      .event-type-label {
        grid-area: label;
        color: $--color-primary;
      }

      .event-count {
        grid-area: count;
        color: $--color-primary;
        min-height: 1rem;
      }

      .event-time {
        grid-area: time;
        display: flex;
        align-items: center;
        color: $--color-gray-600;
      }
    }
  }
}
</style>
