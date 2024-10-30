<script setup lang="ts">
/* import */
import type { ProductListModalType } from '@/models/types/modal.types'
import type { BaseGoodsResType } from '@/models/types/dropdown.type'
import { ref, computed, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import MoreOperationModal from '@/components/Product/Modal/MoreOperationModal.vue'
import AddEditGoodsModal from '@/components/Product/Modal/AddEditGoodsModal.vue'
import DeleteGoodsModal from '@/components/Product/Modal/DeleteGoodsModal.vue'
import { useModal } from '@/composables/useModal'
import { useDropdown } from '@/composables/useDropdown'

/* defineProps */
const props = defineProps<{
  goodsFilter: string
  addModalOpenCount: number
}>()

const router = useRouter()

/* store 相關 */
const { modalVisible, openModal, closeModal } = useModal()
const { goodsList, fetchGoodsList } = useDropdown()

/* 非響應式變數 */
const ProductInfoChart_link = '/productInfoChart'

/* ref 變數 */
const isModalVisible = ref<Record<ProductListModalType, boolean>>({
  more: false,
  edit: false,
  delete: false,
  add: false
})

const openModalType = ref('')
const singleGoodsInfo = ref<BaseGoodsResType>({
  goodsId: '',
  goodsName: '',
  cost: 0,
  isSpecial: false,
  forbiddenStores: []
})

/* computed */
const filteredGoodsList = computed(() =>
  goodsList.value.data.filter((item) => item.goodsName.includes(props.goodsFilter))
)

/* watchEffect */
watchEffect(() => {
  if (props.addModalOpenCount) {
    fnOpenOperationModal('add')
  }
})

/* function */
const resetModalVisible = (
  modalVisibility: Record<ProductListModalType, boolean>
): Record<ProductListModalType, boolean> => {
  Object.keys(modalVisibility).forEach((key) => {
    modalVisibility[key as ProductListModalType] = false
  })
  return modalVisibility
}

const fnOpenOperationModal = (type: ProductListModalType, item?: BaseGoodsResType): void => {
  if (item) {
    singleGoodsInfo.value = item
  }

  openModalType.value = type
  isModalVisible.value = resetModalVisible(isModalVisible.value)
  openModal(() => {
    isModalVisible.value[type] = true
  })
}

const fnCheckProductInfo = () => {
  router.push(`${ProductInfoChart_link}/${singleGoodsInfo.value.goodsId}`)
}

/* store 呼叫 */
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
      <a-list
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
                @click="fnOpenOperationModal('more', item)"
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
      @check:productInfo="fnCheckProductInfo"
      @close="closeModal"
    />

    <AddEditGoodsModal
      v-if="isModalVisible.edit || isModalVisible.add"
      :modal-visible="modalVisible"
      :type="openModalType"
      :goodsInfo="singleGoodsInfo"
      @close="closeModal"
      @goods:refresh="fetchGoodsList"
    />

    <DeleteGoodsModal
      v-if="isModalVisible.delete"
      :modal-visible="modalVisible"
      :type="openModalType"
      :goods-id="singleGoodsInfo.goodsId"
      @close="closeModal"
      @goods:refresh="fetchGoodsList"
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
}
</style>
