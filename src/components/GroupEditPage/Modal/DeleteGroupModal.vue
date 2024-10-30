<script setup lang="ts">
import { useGroup } from '@/composables/useGroupEdit'

const props = defineProps<{
  modalVisible: boolean
  groupId: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'refresh:grouplist'): void
}>()

const { fnDeleteGroupList } = useGroup()

const closeModal = () => {
  emit('close')
}

const fnDeleteGroup = async (groupId: string) => {
  const res = await fnDeleteGroupList(groupId)
  if (res) {
    emit('refresh:grouplist')
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
        <span class="modal-title">{{ '刪除自訂分類' }}</span>
      </div>
    </template>
    <div class="action-container">
      {{ '請確認是否刪除自訂分類' }} <br />
      {{ '該分類內的機台將會被移動至未分類' }}
    </div>
    <template #footer>
      <div class="button-container">
        <a-button
          type="primary confirm-btn btn"
          @click="fnDeleteGroup(props.groupId)"
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
