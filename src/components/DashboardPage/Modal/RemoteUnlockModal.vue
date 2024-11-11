<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { useFetchDashboard } from '@/composables/useFetchDashboard'

const { t: $t } = useI18n()
const { fnUpdateMachineAction } = useFetchDashboard()

const props = defineProps<{
  modalVisible: boolean
  selectedMachineId: string | string[] | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const minCount = 0
const maxCount = 100

const isButtonLoading = ref<boolean>(false)
const count = ref<number>(minCount)

const closeModal = () => {
  count.value = 0
  emit('close')
}

const addCount = () => {
  count.value++
}

const minusCount = () => {
  if (count.value > 0) {
    count.value--
  }
}

const handleUnlock = async (id: string | string[] | null, count: number) => {
  if (!id) return
  isButtonLoading.value = true
  fnUpdateMachineAction(id, 'unlock', count)
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
    class="remote-unlock-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ $t('DashboardPage.Modal.RemoteUnlock.Title') }}</span>
      </div>
    </template>

    <div class="remote-unlock-modal-content">
      <div class="title">{{ $t('DashboardPage.Modal.RemoteUnlock.Content') }}</div>
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
    </div>

    <template #footer>
      <div class="button-group">
        <a-button
          class="confirm-btn"
          type="primary"
          :loading="isButtonLoading"
          :disabled="count === 0"
          @click="handleUnlock(props.selectedMachineId, count)"
        >
          {{ $t('DashboardPage.Modal.RemoteUnlock.Button.Confirm') }}
        </a-button>

        <a-button
          class="confirm-btn"
          type="primary"
          ghost
          @click="closeModal"
        >
          {{ $t('DashboardPage.Modal.RemoteUnlock.Button.Cancel') }}
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.remote-unlock-modal {
  .button-group {
    display: flex;

    & > button {
      flex: 1;
    }
  }
}

.remote-unlock-modal-content {
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
