<script setup lang="ts">
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

import { useHeader } from '@/composables/useHeader'
import { useSidebar } from '@/composables/useSidebar'

import { useCommonStore } from '@/stores/common.stores'

const commonStore = useCommonStore()

// const { headerTitle, showGoBack, goPrevPage } = useHeader()
const { showGoBack, goPrevPage } = useHeader()
const { handleOpenSidebar } = useSidebar()
</script>

<template>
  <header class="header">
    <div v-if="!showGoBack" class="logo">
      <!-- TODO: 需更新為公司logo -->
      雲端
    </div>
    <div v-else class="go-prev-page" @click="goPrevPage">
      <BaseSvgIcon iconName="left-arrow" />
    </div>
    <h2 class="header-title">{{ commonStore.headerTitle }}</h2>
    <div id="menu" class="menu" @click="handleOpenSidebar">
      <BaseSvgIcon iconName="menu" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  height: $--header-height;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-inline: $--header-padding-x;
  background-color: $--header-bg-color;
  z-index: $--header-z-index;

  .header-title {
    margin: 0;
    flex: 1;
    text-align: center;
    color: $--color-primary;
    font-weight: 900;
  }

  .go-prev-page,
  .menu {
    @include base-transition;
    cursor: pointer;
    border-radius: $--border-radius-base;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
