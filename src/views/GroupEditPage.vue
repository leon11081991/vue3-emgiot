<script setup lang="ts">
import type { GroupListModalType } from '@/models/types/modal.types'
import type {
  BasePcbGroupResType,
  ReArrangeDataType,
  BaseReArrangeGroupReqType
} from '@/models/types/group.types'
import { useI18n } from 'vue-i18n'
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

const { t: $t } = useI18n()
const { modalVisible, openModal, closeModal } = useModal()
const { openMessage } = useMessage()
const { updateHeaderTitle } = useHeader()
const { groupList, fnGetGroupList, fnReArrangeGroupList } = useGroup()

/* 非響應式數據 */
const title = '編輯自訂分類'
const skeletonCount = 20

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
const isReArrangeBtn_visible = ref(false)
const reArrange_obj = ref<BaseReArrangeGroupReqType[]>([])
const collapseCount = ref(0)

/* function */
const resetModalVisible = (
  modalVisibility: Record<GroupListModalType, boolean>
): Record<GroupListModalType, boolean> => {
  Object.keys(modalVisibility).forEach((key) => {
    modalVisibility[key as GroupListModalType] = false
  })
  return modalVisibility
}

const fnOpenOperationModal = (type: GroupListModalType, item?: BasePcbGroupResType): void => {
  if (item) {
    singleGroupInfo.value = item

    if (!item.groupId) {
      openMessage('error', $t('GroupEditPage.Message.NoGroupId'))
      return
    }
  }

  openModalType.value = type
  isModalVisible.value = resetModalVisible(isModalVisible.value)
  openModal(() => {
    isModalVisible.value[type] = true
  })
}

const fnHandleReArrangePcbs = (list: ReArrangeDataType) => {
  if (!isReArrangeBtn_visible.value) {
    isReArrangeBtn_visible.value = true
  }

  const groupIndex = groupList.value.data.findIndex((group) => group.groupId === list.groupId)

  if (groupIndex !== -1) {
    groupList.value.data[groupIndex].pcbs = list.pcbs
  }
}

const fnHandleReArrangeGroup = async () => {
  reArrange_obj.value = groupList.value.data
    .map((item) => {
      if (item.groupId) {
        return {
          groupId: item.groupId,
          pcbs: item.pcbs.map((pcb) => pcb.pcbId)
        }
      } else {
        return undefined
      }
    })
    .filter((item): item is { groupId: string; pcbs: string[] } => item !== undefined)

  const res = await fnReArrangeGroupList(reArrange_obj.value)
  if (res) {
    collapseCount.value++
    fnCollapseGroupList()
  }
}

const fnCollapseGroupList = () => {
  isReArrangeBtn_visible.value = false
}

fnGetGroupList()

onMounted(() => {
  updateHeaderTitle(title)
})
</script>

<template>
  <div class="group-edit-page">
    <div class="groupList-item-container">
      <a-skeleton
        avatar
        :title="false"
        :loading="groupList.isLoading"
        :active="true"
        v-for="item in skeletonCount"
        :key="item"
      >
      </a-skeleton>
      <GroupList
        v-for="item in groupList.data"
        :key="item.groupId || 'default'"
        :collapse="collapseCount"
        :list="item"
        @open-modal:more="fnOpenOperationModal('more', item)"
        @update:group-list="fnHandleReArrangePcbs"
      />
    </div>
    <div
      v-show="isReArrangeBtn_visible"
      class="reArrangeBtn-container"
    >
      <a-button
        type="primary confirm-btn btn"
        @click="fnHandleReArrangeGroup"
      >
        {{ $t('GroupEditPage.Button.Confirm') }}
      </a-button>
      <a-button
        class="cancel-btn btn"
        type="outlined"
        @click="fnCollapseGroupList"
      >
        {{ $t('GroupEditPage.Button.Cancel') }}
      </a-button>
    </div>
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

<style lang="scss" scoped>
.groupList-item-container {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  @media screen and (max-width: 468px) {
    width: 95%;
  }
}
.reArrangeBtn-container {
  width: 80%;
  padding: 1.5rem 0;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 16px;
  .btn {
    width: 100%;
  }
  @media screen and (max-width: 468px) {
    width: 95%;
  }
}
</style>
