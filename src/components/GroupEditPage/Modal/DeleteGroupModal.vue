<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useFetchGroupList } from '@/composables/useFetchGroupList'

const props = defineProps<{
  modalVisible: boolean
  groupId: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'refresh:grouplist'): void
}>()

const { t: $t } = useI18n()

const { fnDeleteGroupList } = useFetchGroupList()

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
        <span class="modal-title">{{ $t('GroupEditPage.Modal.DeleteGroup.Title') }}</span>
      </div>
    </template>
    <div class="action-container">
      {{ $t('GroupEditPage.Modal.DeleteGroup.Content.First') }} <br />
      {{ $t('GroupEditPage.Modal.DeleteGroup.Content.Second') }}
    </div>
    <template #footer>
      <div class="button-container">
        <a-button
          type="primary confirm-btn btn"
          @click="fnDeleteGroup(props.groupId)"
        >
          {{ $t('GroupEditPage.Modal.DeleteGroup.Button.Confirm') }}
        </a-button>
        <a-button
          class="cancel-btn btn"
          type="outlined"
          @click="closeModal"
        >
          {{ $t('GroupEditPage.Modal.DeleteGroup.Button.Cancel') }}
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
