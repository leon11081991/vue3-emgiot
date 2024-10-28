<script setup lang="ts">
import type { GroupListModalType } from '@/models/types/modal.types'
import type { BasePcbGroupResType } from '@/models/types/group.types'
import { v4 as uuidv4 } from 'uuid'
import { ref, onMounted } from 'vue'
import GroupList from '@/components/GroupEditPage/GroupList.vue'
import AddEditGroupModal from '@/components/GroupEditPage/Modal/AddEditGroupModal.vue'
import MoreOperationModal from '@/components/GroupEditPage/Modal/MoreOperationModal.vue'
import DeleteGroupModal from '@/components/GroupEditPage/Modal/DeleteGroupModal.vue'
import FloatButton from '@/components/Base/FloatButton.vue'
import { useModal } from '@/composables/useModal'
import { useHeader } from '@/composables/useHeader'
import { useGroup } from '@/composables/useGroupEdit'
import { useMessage } from '@/composables/useMessage'

const { modalVisible, openModal, closeModal } = useModal()
const { openMessage } = useMessage()
const { updateHeaderTitle } = useHeader()
const { groupList, fnGetGroupList, fnReArrangeGroupList } = useGroup()

/* 非響應式數據 */
const title = '編輯自訂分類'

/* 響應式數據 */
const isModalVisible = ref<Record<GroupListModalType, boolean>>({
  add: false,
  more: false,
  edit: false,
  delete: false
})
const openModalType = ref('')
const singleGroupInfo = ref<BasePcbGroupResType>({
  groupId: null,
  groupName: null,
  pcbs: []
})

/* function */
const generateUniqueKey = () => uuidv4()

const resetModalVisible = (
  modalVisibility: Record<GroupListModalType, boolean>
): Record<GroupListModalType, boolean> => {
  Object.keys(modalVisibility).forEach((key) => {
    modalVisibility[key as GroupListModalType] = false
  })
  return modalVisibility
}

const fnHandleOpenModal = (type: GroupListModalType): void => {
  isModalVisible.value = resetModalVisible(isModalVisible.value)

  openModal(() => {
    isModalVisible.value[type] = true
  })
}

const fnOpenOperationModal = (type: GroupListModalType, item?: BasePcbGroupResType): void => {
  if (item) {
    singleGroupInfo.value = item

    if (!item.groupId) {
      openMessage('error', '未分類群組無法編輯名稱')
      return
    }
  }

  openModalType.value = type
  isModalVisible.value = resetModalVisible(isModalVisible.value)
  openModal(() => {
    isModalVisible.value[type] = true
  })
}

fnGetGroupList()

onMounted(() => {
  updateHeaderTitle(title)

  // rearrange
  // fnReArrangeGroupList()
})
</script>

<template>
  <div class="group-edit-page">
    <!-- groupList的more op之後移除  -->
    <GroupList
      v-for="item in groupList.data"
      :key="generateUniqueKey()"
      :list="item"
      @click="fnOpenOperationModal('more', item)"
    />
    <FloatButton @click="fnOpenOperationModal('add')" />
    <MoreOperationModal
      v-if="isModalVisible.more"
      :modal-visible="modalVisible"
      @open-modal="fnOpenOperationModal"
      @close="closeModal"
    />
    <AddEditGroupModal
      v-if="isModalVisible.edit || isModalVisible.add"
      :type="openModalType"
      :modal-visible="modalVisible"
      :groupInfo="singleGroupInfo"
      @refresh:grouplist="fnGetGroupList"
      @close="closeModal"
    />
    <DeleteGroupModal
      v-if="isModalVisible.delete"
      :modal-visible="modalVisible"
      :group-id="singleGroupInfo.groupId || ''"
      @close="closeModal"
      @refresh:grouplist="fnGetGroupList"
    />
  </div>
</template>

<style lang="scss" scoped></style>
