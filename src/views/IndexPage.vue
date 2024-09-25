<script setup lang="ts">
import { ref, computed } from 'vue'
import AvatarDisplay from '@/components/Base/AvatarDisplay.vue'
import UpdateRecord from '@/components/DashboardPage/UpdateRecord.vue'
import DashboardBarChart from '@/components/DashboardPage/DashboardBarChart.vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { useFetchStore } from '@/composables/useFetchStore'

const { storesListInfo, fetchStoresListInfo } = useFetchStore()

const searchInfo = ref({
  keyword: '',
  placeholder: '搜尋商家名稱'
})

const updateKey = ref(0)

// computed
const storeLists = computed(() => {
  const keyword = searchInfo.value.keyword.trim()
  return keyword
    ? storesListInfo.value.data[0]?.stores.filter((item) => item.storeName.includes(keyword))
    : storesListInfo.value.data[0]?.stores
})

function fnUpdateData() {
  updateKey.value += 1
}

fetchStoresListInfo()
</script>

<template>
  <div class="index-page">
    <!-- BarChart -->
    <DashboardBarChart :key="updateKey" />
    <UpdateRecord @update="fnUpdateData" />
    <div class="place-holder"></div>
    <div class="search-merchant-container">
      <BaseSvgIcon
        class="search-icon"
        iconName="magnifier"
      />
      <input
        class="search-box"
        type="text"
        v-model="searchInfo.keyword"
        :placeholder="searchInfo.placeholder"
      />
    </div>
    <div class="merchant-list-container">
      <router-link
        :key="listItem.storeId"
        v-for="listItem in storeLists"
        class="merchant-list-item"
        to="/dashboard"
      >
        <AvatarDisplay
          size="lg"
          :name="listItem.storeName"
          :charNum="2"
        />
        {{ listItem.storeName }}
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-merchant-container {
  height: 3rem;
  border: 2px solid $--color-border;
  border-radius: 6px;
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
  .search-icon {
    position: absolute;
    left: 8px;
  }
  .search-box {
    width: 100%;
    height: 100%;
    padding: 0 0.5rem 0 3rem;
    border: none;
    outline: none;
    font-size: 1.2rem;
    background-color: rgba(0, 0, 0, 0);
  }
}
.place-holder {
  display: block;
  height: 4rem;
}
.merchant-list-container {
  .merchant-list-item {
    display: flex;
    align-items: center;
    column-gap: 1rem;
    min-height: 4rem;
    padding: 1rem;
    cursor: pointer;
    color: $--color-primary;
    text-decoration: none;
    font-size: 1.2rem;
    &:not(:last-of-type) {
      border-bottom: 2px solid $--color-border;
    }
    &_img {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: 100%;
      object-position: top;
      object-fit: cover;
      background-color: $--color-border;
    }
  }
}
</style>
