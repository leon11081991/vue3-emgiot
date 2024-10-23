<script setup lang="ts">
import type { ProductListModalType } from '@/models/types/modal.types'
import { ref, computed } from 'vue'
import MoreOperationModal from '@/components/Product/Modal/MoreOperationModal.vue'
import CreateEditGoodsModal from '@/components/Product/Modal/CreateEditGoodsModal.vue'
import { useModal } from '@/composables/useModal'
import { useDropdown } from '@/composables/useDropdown'

const props = defineProps<{
  goodsFilter: string
}>()

const { modalVisible, openModal, closeModal } = useModal()
const { goodsList, fetchGoodsList } = useDropdown()

const isModalVisible = ref<Record<ProductListModalType, boolean>>({
  more: false,
  edit: false,
  delete: false,
  create: false,
  check: false
})

const goodsId = ref('')
const openModalType = ref('')

/* computed */
const isProductListEmpty = computed(() => goodsList.value.data.length === 0)
const filteredGoodsList = computed(() =>
  goodsList.value.data.filter((item) => item.goodsName.includes(props.goodsFilter))
)

/* function */
const resetModalVisible = (
  modalVisibility: Record<ProductListModalType, boolean>
): Record<ProductListModalType, boolean> => {
  Object.keys(modalVisibility).forEach((key) => {
    modalVisibility[key as ProductListModalType] = false
  })
  return modalVisibility
}

const fnOpenOperationModal = (type: ProductListModalType, id?: string): void => {
  if (id) {
    goodsId.value = id
  }

  openModalType.value = type
  isModalVisible.value = resetModalVisible(isModalVisible.value)
  openModal(() => {
    isModalVisible.value[type] = true
  })
}

fetchGoodsList()
</script>

<template>
  <div class="list product-list">
    <div class="list-header product-list-header">
      <div class="header-item productName">商品</div>
      <div class="header-item productMark">標記</div>
      <div class="header-item productCost">成本價</div>
      <div class="header-item productOperation">更多操作</div>
    </div>

    <div class="list-body">
      <a-empty v-if="isProductListEmpty" />
      <a-list
        class="demo-loadmore-list"
        :loading="goodsList.isLoading"
        item-layout="horizontal"
        :data-source="filteredGoodsList"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-skeleton
              avatar
              :title="false"
              :loading="!!item.loading"
              active
            >
              <div class="flex-2 list-item">{{ item.goodsName }}</div>
              <div class="flex-1 list-item">{{ item.isSpecial ? '特' : '' }}</div>
              <div class="flex-1 list-item">{{ item.cost }}</div>
            </a-skeleton>
            <template #actions>
              <a
                key="list-loadmore-more"
                @click="fnOpenOperationModal('more', item.goodsId)"
                >...</a
              >
            </template>
          </a-list-item>
        </template>
      </a-list>
    </div>
    <MoreOperationModal
      v-if="isModalVisible.more"
      :modal-visible="modalVisible"
      @open-modal="fnOpenOperationModal"
      @close="closeModal"
    />
    <CreateEditGoodsModal
      v-if="isModalVisible.edit || isModalVisible.create"
      :modal-visible="modalVisible"
      :type="openModalType"
      @close="closeModal"
    />
  </div>
</template>

<style lang="scss" scoped>
.list {
  padding-top: 1rem;
  .list-header {
    display: grid;
    padding: 0.75rem 24px;
    background-color: $--color-primary;
    border-top-left-radius: $--border-radius-middle;
    border-top-right-radius: $--border-radius-middle;

    .header-item {
      flex: 1;
      font-size: 0.875rem;
      color: $--color-white;
      text-align: center;
    }
  }
  .product-list-header {
    grid-template-columns: 2fr 1fr 1fr 1fr;
  }

  .flex-1 {
    flex: 1;
  }

  .flex-2 {
    flex: 2;
  }

  ::v-deep(.ant-list-item-action) {
    flex: 1;
    margin-left: 0;
    text-align: center;
  }

  .list-item {
    text-align: center;
  }

  // .list-collapse {
  //   background-color: $--background-color-base;
  // }

  // .list-collapse-panel {
  //   :deep(.ant-collapse-expand-icon) {
  //     display: none;
  //   }

  //   :deep(.ant-collapse-header) {
  //     padding: 0.5rem;
  //   }

  //   :deep(.ant-collapse-content),
  //   :deep(.ant-collapse-content-box) {
  //     padding: 0;
  //   }

  //   .item-main-content {
  //     display: grid;

  //     & > .item-section {
  //       color: $--color-primary;
  //     }

  //     .item-category {
  //       padding: 0.25rem 0.5rem;
  //       background-color: $--color-primary;
  //       color: $--color-white;
  //       border-radius: $--border-radius-middle;
  //     }

  //     .item-id {
  //       position: relative;

  //       .offline {
  //         position: absolute;
  //         content: '';
  //         width: 0.3rem;
  //         height: 0.3rem;
  //         border-radius: $--border-radius-circle;
  //         background-color: $--color-error;

  //         top: 50%;
  //         left: -0.5rem;
  //         transform: translateY(-50%);
  //       }

  //       .online {
  //         position: absolute;
  //         content: '';
  //         width: 0.3rem;
  //         height: 0.3rem;
  //         border-radius: $--border-radius-circle;
  //         background-color: $--color-secondary;

  //         top: 50%;
  //         left: -0.5rem;
  //         transform: translateY(-50%);
  //       }
  //     }
  //   }

  //   .item-action-content {
  //     display: flex;
  //     flex-wrap: wrap;
  //     justify-content: space-between;
  //     padding: 0.5rem;

  //     & > .item-section {
  //       flex: 1;
  //       color: $--color-gray-600;
  //     }

  //     .action-button {
  //       @include base-transition;
  //       border-radius: $--border-radius-middle;

  //       &:hover {
  //         cursor: pointer;
  //         background-color: rgba(#000000, 0.1);
  //       }
  //     }
  //   }

  //   .item-section {
  //     display: flex;
  //     flex-direction: column;
  //     align-items: center;

  //     &.chart-detail {
  //       flex-direction: row;
  //       align-items: center;
  //       gap: 0.5rem;
  //     }
  //   }
  // }

  // demo list
  .demo-loadmore-list {
    min-height: 350px;
  }
}
</style>
