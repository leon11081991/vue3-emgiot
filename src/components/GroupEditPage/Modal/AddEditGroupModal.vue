<script setup lang="ts">
import type { BasePcbGroupResType } from '@/models/types/group.types'
import { useI18n } from 'vue-i18n'
import { ref, computed, watchEffect } from 'vue'
import { useMessage } from '@/composables/useMessage'
import { useGroup } from '@/composables/useGroupEdit'

const props = defineProps<{
  modalVisible: boolean
  type: string
  groupInfo: BasePcbGroupResType
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'refresh:grouplist'): void
}>()

// store 相關
const { t: $t } = useI18n()
const { openMessage } = useMessage()
const { fnAddGroupList, fnUpdateGroupList } = useGroup()

/* 非響應式變數 */
const maxLength = 10

/* 響應式變數 */
const groupName = ref('')
const isGroupNameExisted = ref(false)
const isGroupNameLenOverRule = computed(() => +groupName.value.length > maxLength)
const groupExistMessage = computed(() => (isGroupNameExisted.value ? '你已建立過相同群組' : ''))

/* computed */
const modalTitle = computed(() =>
  props.type === 'edit'
    ? $t('GroupEditPage.Modal.AddEditGroup.Title.Edit')
    : props.type === 'add'
      ? $t('GroupEditPage.Modal.AddEditGroup.Title.Add')
      : ''
)

/* function */
const groupModalDataRest = () => {
  groupName.value = ''
  isGroupNameExisted.value = false
}

const closeModal = () => {
  groupModalDataRest()
  emit('close')
}

const updateGroupValue = (e: Event) => {
  const value = (e.target as HTMLInputElement).value
  groupName.value = value
}

const fnAddEditGroup = async (type: string) => {
  if (groupName.value.trim() === '') {
    openMessage('error', $t('GroupEditPage.Modal.AddEditGroup.Message.Empty'))
    return
  }

  if (isGroupNameLenOverRule.value) {
    openMessage('error', $t('GroupEditPage.Modal.AddEditGroup.Message.LengthOverRule'))
    return
  }

  if (type === 'edit' && !props.groupInfo.groupId) return

  let res: boolean | undefined

  if (type === 'add') {
    res = await fnAddGroupList(groupName.value)
  } else {
    const groupId = props.groupInfo.groupId
    if (!groupId) return

    res = await fnUpdateGroupList({
      groupId,
      groupName: groupName.value
    })
  }

  if (res) {
    emit('refresh:grouplist')
    closeModal()
  } else {
    isGroupNameExisted.value = true
  }
}

const resetGroupFields = () => {
  groupName.value = ''
}

/* watchEffect */
watchEffect(() => {
  if (!props.modalVisible) return
  if (props.type === 'edit') {
    groupName.value = props.groupInfo.groupName || ''
  } else if (props.type === 'add') {
    resetGroupFields()
  }
})
</script>

<template>
  <a-modal
    :open="props.modalVisible"
    class="addGroup-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ modalTitle }}</span>
      </div>
    </template>

    <div class="addGroup-action-container">
      <a-input
        class="addGroup-input"
        :value="groupName"
        :class="{ error: isGroupNameLenOverRule || isGroupNameExisted }"
        :placeholder="$t('GroupEditPage.Modal.AddEditGroup.Placeholder.GroupName')"
        @change="updateGroupValue"
        :maxLength="maxLength"
      >
      </a-input>
      <div
        class="addGroup-extraInfo"
        :class="{ error: isGroupNameLenOverRule || isGroupNameExisted }"
      >
        <span>{{ groupExistMessage }}</span>
        <span class="ml-auto">{{ groupName.length }} / {{ maxLength }}</span>
      </div>
    </div>

    <template #footer>
      <a-button
        class="confirm-btn"
        type="primary"
        @click="fnAddEditGroup(props.type)"
      >
        {{ $t('GroupEditPage.Modal.AddEditGroup.Button.Confirm') }}
      </a-button>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.addGroup-action-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .addGroup-input {
    padding: 0.75rem 0.5rem;
    font-size: 16px;
    background-color: var(--color-transparent);
  }

  .addGroup-extraInfo {
    display: flex;
    color: $--color-gray-600;
  }

  .error {
    color: var(--color-error);
    border-color: var(--color-error);
  }

  .ml-auto {
    margin-left: auto;
  }
}

.action-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  margin-block: 0.75rem;

  @include media-breakpoint-down(sm) {
    justify-content: space-between;
  }

  .action-text {
    color: $--color-gray-600;
  }
}

.addGroup-modal {
  .confirm-btn {
    width: 100%;
  }
}
</style>
