<script setup lang="ts">
import { ref } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

const props = defineProps<{
  modalVisible: boolean
  searchValue: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:searchValue', value: string): void
  (e: 'onSearch'): void
}>()

const checkedList = ref<string[]>([])

// TODO: get data from api
type PcbOptionsType = {
  pcbGroupName: string
  pcbName: string
  pcbId: string
}
// TODO: get data from api
const pcbOptions: PcbOptionsType[] = [
  { pcbGroupName: '南部食品機', pcbName: 'W208_01', pcbId: '01' },
  { pcbGroupName: '南部食品機', pcbName: 'W208_02', pcbId: '02' },
  { pcbGroupName: '南部食品機', pcbName: 'W208b1_01', pcbId: '03' }
]

const onClickCheckAll = (options: PcbOptionsType[]) => {
  options.forEach((item) => {
    checkedList.value.push(item.pcbId)
  })
}

const onClickUncheckAll = () => {
  checkedList.value = []
}

const closeModal = () => {
  emit('close')
}

const updateSearchValue = (value: string) => {
  console.log('updateSearchValue')
  emit('update:searchValue', value)
}

const onSearch = () => {
  console.log('onSearch')
  emit('onSearch')
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
      <a-input
        class="search-input"
        :value="props.searchValue"
        placeholder="搜尋機台名稱"
        @change="updateSearchValue"
        @pressEnter="onSearch"
      >
        <template #prefix>
          <BaseSvgIcon iconName="magnifier" />
        </template>
      </a-input>
    </div>

    <div class="action-container">
      <p class="action-text">已選{{ '1' }}台</p>
      <a-button
        ghost
        type="secondary"
        @click="onClickCheckAll(pcbOptions)"
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
        v-model:value="checkedList"
        @change="() => console.log(checkedList)"
      >
        <template
          v-for="option in pcbOptions"
          :key="option.value"
        >
          <a-checkbox :value="option.pcbId">
            <div class="checkbox-item">
              <span class="group-tag">{{ option.pcbGroupName }}</span>
              <span class="name-text">{{ option.pcbName }}</span>
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
  .search-input {
    &.ant-input-affix-wrapper {
      background-color: $--background-color-base;

      :deep(.ant-input) {
        background-color: $--background-color-base;
      }
    }
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
