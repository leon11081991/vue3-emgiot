<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

type actionTypes = 'edit' | 'check' | 'delete'

const props = defineProps<{
  modalVisible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'openModal', action: 'edit' | 'delete'): void
  (e: 'check:productInfo'): void
}>()

const { t: $t } = useI18n()

const closeModal = () => {
  emit('close')
}

const emitGoodsEvent = (type: actionTypes) => {
  if (type === 'check') {
    emit('check:productInfo')
    return
  }
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
        <span class="modal-title">{{ $t('ProductPage.Modal.MoreOperation.Title') }}</span>
      </div>
    </template>
    <div class="action-container">
      <div
        class="action-item"
        @click="emitGoodsEvent('edit')"
      >
        <BaseSvgIcon
          iconName="edit"
          size="lg"
        />
        {{ $t('ProductPage.Modal.MoreOperation.Edit') }}
      </div>
      <div
        class="action-item"
        @click="emitGoodsEvent('check')"
      >
        <BaseSvgIcon
          iconName="list"
          size="lg"
        />
        {{ $t('ProductPage.Modal.MoreOperation.InfoChart') }}
      </div>
      <div
        class="action-item"
        @click="emitGoodsEvent('delete')"
      >
        <BaseSvgIcon
          iconName="trash"
          size="lg"
        />
        {{ $t('ProductPage.Modal.MoreOperation.Delete') }}
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
