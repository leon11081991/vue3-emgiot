<script setup lang="ts">
// import
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AvatarDisplay from '@/components/Base/AvatarDisplay.vue'
import UpdateRecord from '@/components/DashboardPage/UpdateRecord.vue'
import IndexBarChart from '@/components/BarChart/IndexBarChart.vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import FloatButton from '@/components/Base/FloatButton.vue'
import { useFetchStore } from '@/composables/useFetchStore'
import { useRouter } from 'vue-router'

// store 相關
const { storesListInfo, fetchStoresListInfo, dispatchRecordCurrentStore } = useFetchStore()

// route/router
const router = useRouter()

// i18n
const { t: $t } = useI18n()

// 非響應式變數
const targetPath = '/dashboard'

// ref 變數
const searchInfo = ref({
  keyword: '',
  placeholder: $t('HomePage.search')
})
const updateKey = ref(0)

// computed
const storeLists = computed(() => {
  const keyword = searchInfo.value.keyword.trim()
  return keyword
    ? storesListInfo.value.data?.stores.filter((item) => item.storeName.includes(keyword))
    : storesListInfo.value.data?.stores
})

// function
const fnRefreshData = () => {
  updateKey.value += 1
}

// async/await function
const fnDispatchRecordStore = async (storeId: string, storeName: string) => {
  const dispatchStatus = await dispatchRecordCurrentStore(storeId)
  if (dispatchStatus) {
    localStorage.setItem('storeName', storeName)
    router.push(targetPath)
  }
}

// 生命週期 (Lifecycle hooks)
fetchStoresListInfo()
</script>

<template>
  <div class="index-page">
    <!-- BarChart -->
    <IndexBarChart :key="updateKey" />
    <UpdateRecord @update="fnRefreshData" />
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
      <div
        :key="listItem.storeId"
        v-for="listItem in storeLists"
        class="merchant-list-item"
        @click="fnDispatchRecordStore(listItem.storeId, listItem.storeName)"
      >
        <AvatarDisplay
          size="lg"
          :name="listItem.storeName"
          :charNum="2"
        />
        {{ listItem.storeName }}
      </div>
    </div>
    <FloatButton />
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
