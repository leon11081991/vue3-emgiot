<script setup lang="ts">
/* import */
import type { BaseProductInfoListType } from '@/models/types/goods.types'
import { useI18n } from 'vue-i18n'

/* defineProps */
const props = defineProps<{
  info: {
    data: BaseProductInfoListType[]
    isLoading: boolean
  }
}>()

/* store */
const { t: $t } = useI18n()
</script>
<template>
  <div class="list productInfo">
    <div class="list-header productInfo-header">
      <div class="header-item productInfo-device">
        {{ $t('ProductInfoChartPage.TabList.Header.Device') }}
      </div>
      <div class="header-item productInfo-shipmentAmount">
        {{ $t('ProductInfoChartPage.TabList.Header.ShipmentAmount') }}
      </div>
      <div class="header-item productInfo-revenue">
        {{ $t('ProductInfoChartPage.TabList.Header.Revenue') }}
      </div>
      <div class="header-item productInfo-Shipment">
        {{ $t('ProductInfoChartPage.TabList.Header.Shipment') }}
      </div>
    </div>
    <div class="list-body">
      <a-list
        :loading="props.info.isLoading"
        item-layout="horizontal"
        :data-source="props.info.data"
      >
        <template #renderItem="{ item }">
          <a-list-item>
            <a-skeleton
              avatar
              :title="false"
              :loading="!!item.loading"
              active
            >
              <div class="flex-2 list-item">
                <span class="storeName">{{ item.storeName }}</span> {{ item.pcbName }}
              </div>
              <div class="flex-1 list-item">
                {{ item.revenue === 0 ? 0 : (item.revenue / item.prizeWinCount).toFixed(0) }}
              </div>
              <div class="flex-1 list-item">{{ item.revenue }}</div>
              <div class="flex-1 list-item">{{ item.prizeWinCount }}</div>
            </a-skeleton>
          </a-list-item>
        </template>
      </a-list>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  padding-top: 1rem;

  .list-header {
    display: grid;
    align-items: center;
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

  // ::v-deep(.ant-list-item){
  //   padding: 12px 20px;
  // }

  ::v-deep(.ant-list-item-action) {
    flex: 1;
    margin-left: 0;
    text-align: center;
  }

  .list-item {
    word-break: keep-all;
    text-align: center;
    color: $--color-primary;
  }
}

.storeName {
  padding: 0.25rem 0.5rem;
  margin-right: 4px;
  border-radius: 4px;
  color: #fff;
  background: $--color-Tab-bg;
}
</style>
