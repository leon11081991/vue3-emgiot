<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import ReplenishCoinsModalContent from '@/components/DashboardPage/Modal/ReplenishCoinsModalContent.vue'
import { useFetchDashboard } from '@/composables/useFetchDashboard'

const { t: $t } = useI18n()
const { fnUpdateMachineAction } = useFetchDashboard()

const props = defineProps<{
  modalVisible: boolean
  selectedMachineId: string | string[] | null
  machineType: 0 | 1
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const minCount = 0

const isButtonLoading = ref<boolean>(false)
const count = ref<number>(minCount)
const modalTitle = computed(() =>
  props.machineType === 0
    ? $t('DashboardPage.Modal.ReplenishCoins.Title.Claw')
    : $t('DashboardPage.Modal.ReplenishCoins.Title.Coin')
)

const closeModal = () => {
  count.value = 0
  emit('close')
}

const updateCount = (value: number) => {
  count.value = value
}

const handleReplenishCoins = async (
  id: string | string[] | null,
  count: number,
  machineType: 0 | 1
) => {
  if (!id) return
  isButtonLoading.value = true

  const action = machineType === 0 ? 'restock' : 'withdraw'

  fnUpdateMachineAction(id, action, count)
    .then((resp) => {
      if (!resp) return
      closeModal()
    })
    .finally(() => {
      isButtonLoading.value = false
    })
}
</script>

<template>
  <a-modal
    :open="props.modalVisible"
    class="replenish-coins-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ modalTitle }}</span>
      </div>
    </template>

    <ReplenishCoinsModalContent
      :count="count"
      @update:count="updateCount"
    />

    <!-- <div class="replenish-coins-modal-content">
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
            v-model:value="count"
            :controls="false"
            :defaultValue="minCount"
            :min="minCount"
            :max="maxCount"
          />
        </div>
        <div
          class="add-button"
          @click="addCount"
        >
          <BaseSvgIcon iconName="add" />
        </div>
      </div>
    </div> -->

    <template #footer>
      <div class="button-group">
        <a-button
          class="confirm-btn"
          type="primary"
          :loading="isButtonLoading"
          :disabled="count === 0"
          @click="handleReplenishCoins(props.selectedMachineId, count, machineType)"
        >
          {{ $t('DashboardPage.Modal.ReplenishCoins.Button.Confirm') }}
        </a-button>

        <a-button
          class="confirm-btn"
          type="primary"
          ghost
          @click="closeModal"
        >
          {{ $t('DashboardPage.Modal.ReplenishCoins.Button.Cancel') }}
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.replenish-coins-modal {
  .button-group {
    display: flex;

    & > button {
      flex: 1;
    }
  }
}

// .replenish-coins-modal-content {
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;

//   .title {
//     text-align: center;
//     color: $--color-gray-600;
//   }

//   .input-container {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;

//     .minus-button,
//     .add-button {
//       @include base-transition;
//       padding: 0.25rem;
//       cursor: pointer;
//       border-radius: $--border-radius-base;

//       &:hover {
//         background-color: $--color-gray-400;
//       }
//     }

//     .count {
//       :deep(.ant-input-number) {
//         font-size: 1.5rem;
//       }

//       :deep(.ant-input-number-input) {
//         color: $--color-primary;
//         text-align: center;
//         font-weight: 700;
//         height: auto;
//       }
//     }
//   }
// }
</style>
