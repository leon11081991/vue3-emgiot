<script setup lang="ts">
import type { DashboardModalType } from '@/models/types/modal.types'
import { useI18n } from 'vue-i18n'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

const { t: $t } = useI18n()

const props = defineProps<{
  modalVisible: boolean
  selectedMachineId: string | string[] | null
  machineType: 0 | 1
}>()

const emit = defineEmits<{
  (e: 'openModal', type: DashboardModalType, machineType?: 0 | 1): void
  (e: 'sendMachineId', machineId: string | string[] | null): void
  (e: 'close'): void
}>()

const clawMachineType = 0
const coinMachineType = 1

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <a-modal
    :open="props.modalVisible"
    :footer="null"
    class="more-operation-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ $t('DashboardPage.Modal.OtherActions.Title') }}</span>
      </div>
    </template>

    <div class="more-operation-modal-container">
      <div class="id-number">
        {{ $t('DashboardPage.Modal.OtherActions.IdNumberLabel') }}：{{ props.selectedMachineId }}
      </div>

      <ul class="action-list">
        <li
          class="action-item"
          @click="
            emit('openModal', 'editMachine', props.machineType),
              emit('sendMachineId', props.selectedMachineId)
          "
        >
          <BaseSvgIcon iconName="edit" />
          <!-- 編輯機台名稱 -->
          {{ $t('DashboardPage.Modal.OtherActions.EditMachineLabel') }}
        </li>
        <template v-if="props.machineType === clawMachineType">
          <li
            class="action-item"
            @click="
              emit('openModal', 'changeProduct', props.machineType),
                emit('sendMachineId', props.selectedMachineId)
            "
          >
            <BaseSvgIcon iconName="product" />
            <!-- 更換商品 -->
            {{ $t('DashboardPage.Modal.OtherActions.ChangeProductLabel') }}
          </li>
        </template>

        <template v-if="props.machineType === coinMachineType">
          <li
            class="action-item"
            @click="
              emit('openModal', 'remoteUnlock', props.machineType),
                emit('sendMachineId', props.selectedMachineId)
            "
          >
            <BaseSvgIcon iconName="key" />
            <!-- 遠端開鎖 -->
            {{ $t('DashboardPage.Modal.OtherActions.RemoteUnlockLabel') }}
          </li>
          <li
            class="action-item"
            @click="
              emit('openModal', 'errorReset', props.machineType),
                emit('sendMachineId', props.selectedMachineId)
            "
          >
            <BaseSvgIcon iconName="tool" />
            <!-- 遠端故障消除 -->
            {{ $t('DashboardPage.Modal.OtherActions.ErrorResetLabel') }}
          </li>
        </template>
      </ul>
    </div>
  </a-modal>
</template>

<style lang="scss" scoped>
.more-operation-modal-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .id-number {
    color: $--color-gray-600;
  }

  .action-list {
    margin-inline: 1rem;
    display: flex;
    flex-direction: column;
  }

  .action-item {
    @include base-transition;
    padding: 0.5rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: $--color-gray-600;
    border-radius: $--border-radius-middle;
    cursor: pointer;

    &:hover {
      background-color: $--color-gray-400;
    }
  }
}
</style>
