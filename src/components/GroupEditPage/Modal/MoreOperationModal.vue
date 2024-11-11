<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

type actionTypes = 'edit' | 'delete'

const props = defineProps<{
  modalVisible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'openModal', action: 'edit' | 'delete'): void
}>()

const { t: $t } = useI18n()

const closeModal = () => {
  emit('close')
}

const emitGroupEvent = (type: actionTypes) => {
  emit('openModal', type)
}
</script>

<template>
  <a-modal
    :open="props.modalVisible"
    class="batch-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ $t('GroupEditPage.Modal.MoreOperation.Title') }}</span>
      </div>
    </template>
    <div class="action-container">
      <div
        class="action-item"
        @click="emitGroupEvent('edit')"
      >
        <BaseSvgIcon
          iconName="edit"
          size="lg"
        />
        {{ $t('GroupEditPage.Modal.MoreOperation.Edit') }}
      </div>
      <div
        class="action-item"
        @click="emitGroupEvent('delete')"
      >
        <BaseSvgIcon
          iconName="trash"
          size="lg"
        />
        {{ $t('GroupEditPage.Modal.MoreOperation.Delete') }}
      </div>
    </div>
    <template #footer></template>
  </a-modal>
</template>

<style lang="scss" scoped>
.modal-title {
  font-size: 16px;
}
.action-container {
  padding: 0.5rem 1rem;
  .action-item {
    display: flex;
    align-items: center;
    column-gap: 16px;
    font-size: 16px;
    user-select: none;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
    background-color: rgba(0, 0, 0, 0);
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
