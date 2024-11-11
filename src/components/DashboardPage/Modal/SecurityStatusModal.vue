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

const handleSecurityStatus = (id: string | string[] | null) => {
  if (!id) return
  isButtonLoading.value = true

  fnUpdateMachineAction(id, 'lock', 0)
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
    class="security-status-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ $t('DashboardPage.Modal.SecurityStatus.Title') }}</span>
      </div>
    </template>

    <div class="security-status-modal-content">
      <div class="title">{{ $t('DashboardPage.Modal.SecurityStatus.Content') }}</div>
    </div>

    <template #footer>
      <div class="button-group">
        <a-button
          class="confirm-btn"
          type="primary"
          :loading="isButtonLoading"
          @click="handleSecurityStatus(props.selectedMachineId)"
        >
          {{ $t('DashboardPage.Modal.SecurityStatus.Button.Confirm') }}
        </a-button>

        <a-button
          class="confirm-btn"
          type="primary"
          ghost
          @click="closeModal"
        >
          {{ $t('DashboardPage.Modal.SecurityStatus.Button.Cancel') }}
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.security-status-modal {
  .button-group {
    display: flex;

    & > button {
      flex: 1;
    }
  }
}

.security-status-modal-content {
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
