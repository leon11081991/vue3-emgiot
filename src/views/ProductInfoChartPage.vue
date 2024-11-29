<script setup lang="ts">
/* import */
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import ProductInfoBarChart from '@/components/BarChart/ProductInfoBarChart.vue'
import ProductInfoListItem from '@/components/Product/ProductInfoListItem.vue'
import UpdateRecord from '@/components/DashboardPage/UpdateRecord.vue'
import { useHeader } from '@/composables/useHeader'
import { useFetchGoods } from '@/composables/useFetchGoods'

/* store */
const { t: $t } = useI18n()
const route = useRoute()
const { updateHeaderTitle } = useHeader()

/* 非響應式數據 */
const title = $t('ProductInfoChartPage.Title')
const { productListInfo, fnGetProductOperationInfo } = useFetchGoods()

/* ref 變數 */
const updateKey = ref(0)

/* computed */
const goodsId = computed(() =>
  typeof route.params.goodsId === 'string' ? route.params.goodsId : ''
)
const goodsName = computed(() => productListInfo.value?.data[0]?.goodsName)

/* function */
const fnRefreshData = () => {
  updateKey.value += 1
  fnGetProductOperationInfo(goodsId.value)
}

fnGetProductOperationInfo(goodsId.value)

/* lifecycle hooks */
onMounted(() => {
  updateHeaderTitle(title)
})
</script>

<template>
  <div class="productInfoChart-page">
    <ProductInfoBarChart
      :key="updateKey"
      :title="goodsName"
      :goodsId="goodsId"
    />
    <UpdateRecord @update="fnRefreshData" />
    <ProductInfoListItem :info="productListInfo" />
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

  .productInfo-header {
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
