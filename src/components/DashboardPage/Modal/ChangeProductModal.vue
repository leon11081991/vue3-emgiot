<script setup lang="ts">
import type { DashboardModalType } from '@/models/types/modal.types'

const props = defineProps<{
  modalVisible: boolean
}>()

const emit = defineEmits<{
  (e: 'openModal', type: DashboardModalType, machineType?: 0 | 1): void
  (e: 'close'): void
}>()

const closeModal = () => {
  emit('close')
}
</script>

<template>
  <a-modal
    :open="props.modalVisible"
    class="change-product-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ '更換商品' }}</span>
      </div>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped></style>
