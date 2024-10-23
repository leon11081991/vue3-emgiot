<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import FloatButton from '@/components/Base/FloatButton.vue'
import ProductTabList from '@/components/Product/ProductTabList.vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

// store
const { t: $t } = useI18n()

/* 非響應式變數 */
const searchInput_placeholder = '搜尋商品名稱'

// ref變數
const goodsFilter = ref('')

// function
const handleInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  goodsFilter.value = target.value
}
</script>

<template>
  <div class="product-page">
    <div class="search-action-container">
      <a-input
        class="search-input"
        :value="goodsFilter"
        :placeholder="searchInput_placeholder"
        @change="handleInputChange"
      >
        <template #prefix>
          <BaseSvgIcon iconName="magnifier" />
        </template>
      </a-input>
    </div>
    <ProductTabList :goodsFilter="goodsFilter" />
    <FloatButton />
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
