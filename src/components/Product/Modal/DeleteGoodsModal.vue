<script setup lang="ts">
import { useGoods } from '@/composables/useGoods'

const props = defineProps<{
  modalVisible: boolean
  goodsId: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'goods:refresh'): void
}>()

const { dispatchDeleteGoods } = useGoods()

const closeModal = () => {
  emit('close')
}

const fnDeleteGoods = async (goodsId: string) => {
  const res = await dispatchDeleteGoods(goodsId)
  if (res) {
    emit('goods:refresh')
  }
  closeModal()
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
        <span class="modal-title">{{ '刪除商品' }}</span>
      </div>
    </template>
    <div class="action-container">
      {{ '請確認是否刪除所選商品' }}
    </div>
    <template #footer>
      <div class="button-container">
        <a-button
          type="primary confirm-btn btn"
          @click="fnDeleteGoods(props.goodsId)"
          >確定</a-button
        >
        <a-button
          class="cancel-btn btn"
          type="outlined"
          @click="closeModal"
        >
          取消
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.modal-title {
  font-size: 16px;
}
.action-container {
  padding: 1rem 1rem;
  text-align: center;
  font-size: 16px;
  color: $--color-update-time;
}
.button-container {
  display: flex;
  .btn {
    flex: 1;
  }
}
</style>
