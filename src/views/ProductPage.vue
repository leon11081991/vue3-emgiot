<script setup lang="ts">
/* import */
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FloatButton from '@/components/Base/FloatButton.vue'
import ProductTabList from '@/components/Product/ProductTabList.vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

/* store */
const { t: $t } = useI18n()

/* 非響應式變數 */
const searchInputPlaceholder = '搜尋商品名稱'

/* ref變數 */
const goodsFilter = ref('')
const createGoodsModalOpenCount = ref(0)

/* function */
const handleInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  goodsFilter.value = target.value
}

const fnHandleAddGoods = () => {
  createGoodsModalOpenCount.value += 1
}
</script>

<template>
  <div class="product-page">
    <div class="search-action-container">
      <a-input
        class="search-input"
        :value="goodsFilter"
        :placeholder="searchInputPlaceholder"
        @change="handleInputChange"
      >
        <template #prefix>
          <BaseSvgIcon iconName="magnifier" />
        </template>
      </a-input>
    </div>
    <ProductTabList
      :goodsFilter="goodsFilter"
      :add-modal-open-count="createGoodsModalOpenCount"
    />
    <FloatButton @click="fnHandleAddGoods" />
  </div>
</template>

<style lang="scss" scoped>
.search-input {
  &.ant-input-affix-wrapper {
    background-color: $--background-color-base;

    :deep(.ant-input) {
      background-color: $--background-color-base;
    }
  }
}
</style>
