<script setup lang="ts">
import type { DashboardModalType } from '@/models/types/modal.types'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { useFetchPcbRegister } from '@/composables/useFetchPcbRegister'
import { useDebounce } from '@/composables/useDebounce'

const { t: $t } = useI18n()
const { fnUpdatePcbName } = useFetchPcbRegister()

const props = defineProps<{
  modalVisible: boolean
  selectedMachineId: string | string[] | null
}>()

const emit = defineEmits<{
  (e: 'openModal', type: DashboardModalType, machineType?: 0 | 1): void
  (e: 'close'): void
  (e: 'refresh'): void
}>()

const maxLength = 10
const isButtonLoading = ref<boolean>(false)
const machineName = ref<string>('')

const closeModal = () => {
  emit('close')
}

const updateName = useDebounce((pcbId: string, pcbName: string) => {
  if (!props.selectedMachineId || Array.isArray(props.selectedMachineId)) return
  isButtonLoading.value = true
  fnUpdatePcbName({ pcbId, pcbName })
    .then((resp) => {
      if (!resp) return
      emit('refresh')
      closeModal()
    })
    .finally(() => {
      isButtonLoading.value = false
    })
})
</script>

<template>
  <a-modal
    :open="props.modalVisible"
    class="edit-machine-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ $t('DashboardPage.Modal.EditMachine.Title') }}</span>
      </div>
    </template>

    <div class="edit-machine-modal-content">
      <a-input
        v-model:value="machineName"
        class="input-field"
        size="large"
        :maxlength="maxLength"
      ></a-input>
      <div class="count-nums">{{ machineName.length }}&nbsp;/&nbsp;{{ maxLength }}</div>
    </div>

    <template #footer>
      <div class="button-group">
        <a-button
          type="primary"
          size="large"
          :loading="isButtonLoading"
          :disabled="machineName.length === 0"
          @click="updateName(props.selectedMachineId, machineName)"
        >
          {{ $t('DashboardPage.Modal.EditMachine.Button.Confirm') }}
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.edit-machine-modal {
  .count-nums {
    text-align: right;
    color: $--color-gray-600;
  }

  .button-group {
    display: flex;

    & > button {
      flex: 1;
    }
  }
}
</style>
