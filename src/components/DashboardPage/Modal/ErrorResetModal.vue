<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
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

const isButtonLoading = ref<boolean>(false)

const closeModal = () => {
  emit('close')
}

const handleErrorReset = async (id: string | string[] | null) => {
  if (!id) return
  isButtonLoading.value = true
  const countForErrorReset = 0
  fnUpdateMachineAction(id, 'errorReset', countForErrorReset)
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
    class="error-reset-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ $t('DashboardPage.Modal.ErrorReset.Title') }}</span>
      </div>
    </template>

    <div class="error-reset-modal-content">
      <div class="title">{{ $t('DashboardPage.Modal.ErrorReset.Content') }}</div>
    </div>

    <template #footer>
      <div class="button-group">
        <a-button
          class="confirm-btn"
          type="primary"
          :loading="isButtonLoading"
          @click="handleErrorReset(props.selectedMachineId)"
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
.error-reset-modal {
  .button-group {
    display: flex;

    & > button {
      flex: 1;
    }
  }
}

.error-reset-modal-content {
  padding-block: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .title {
    text-align: center;
    color: $--color-gray-600;
  }
}
</style>
