<script setup lang="ts">
import type { PcbsResType } from '@/models/types/dropdown.type'
import { ref, computed } from 'vue'
import SearchInput from '@/components/Base/SearchInput.vue'

const props = defineProps<{
  modalVisible: boolean
  searchValue: string
  checkedList: string[]
  listData: PcbsResType[]
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:checkedList', value: string[]): void
}>()

const searchKeyword = ref<string>('')
const pcbsList = computed(() => {
  return (props.listData || []).filter((item) => {
    return item.machineName?.includes(searchKeyword.value) || ''
  })
})

const onClickCheckAll = (options: PcbsResType[]) => {
  let checkedList: string[] = []
  options.forEach((item) => {
    checkedList.push(item.pcbId)
  })
  emit('update:checkedList', checkedList)
}

const onClickUncheckAll = () => {
  emit('update:checkedList', [])
}

const onUpdateCheckedList = (value: string[]) => {
  emit('update:checkedList', value)
}

const closeModal = () => {
  emit('close')
}

const updateSearchKeyword = (val: string) => {
  searchKeyword.value = val
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
        <span class="modal-title">{{ '批量操作' }}</span>
      </div>
    </template>

    <div class="search-action-container">
      <p class="search-action-title">{{ '請選擇要進行操作的機台' }}</p>

      <SearchInput
        :search-value="searchKeyword"
        :placeholder="'搜尋機台名稱'"
        @update:searchValue="updateSearchKeyword"
      />
    </div>

    <div class="action-container">
      <p class="action-text">已選{{ props.checkedList.length }}台</p>
      <a-button
        ghost
        type="secondary"
        @click="onClickCheckAll(props.listData)"
        >全部選擇
      </a-button>
      <a-button
        ghost
        type="secondary"
        @click="onClickUncheckAll"
        >全部取消
      </a-button>
    </div>

    <div class="batch-list">
      <a-checkbox-group
        :value="props.checkedList"
        @change="onUpdateCheckedList"
      >
        <template
          v-for="option in pcbsList"
          :key="option.pcbId"
        >
          <a-checkbox :value="option.pcbId">
            <div class="checkbox-item">
              <span
                v-if="option.groupName"
                class="group-tag"
                >{{ option.groupName }}</span
              >
              <span class="name-text">{{ option.machineName }}</span>
            </div>
          </a-checkbox>
        </template>
      </a-checkbox-group>
    </div>

    <template #footer>
      <a-button
        class="confirm-btn"
        type="primary"
      >
        {{ '確認' }}
      </a-button>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.search-action-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .search-action-title {
    color: $--color-gray-700;
  }
}

.action-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-block: 0.75rem;

  @include media-breakpoint-down(sm) {
    justify-content: space-between;
  }

  .action-text {
    color: $--color-gray-600;
  }
}

.batch-modal {
  .confirm-btn {
    width: 100%;
  }
}

.batch-list {
  padding-inline: 1.25rem;
  padding-top: 0.75rem;
  border-top: 1px solid $--color-gray-400;
  .ant-checkbox-group {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .checkbox-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .name-text {
        color: $--color-primary;
      }
    }
  }
}
</style>
