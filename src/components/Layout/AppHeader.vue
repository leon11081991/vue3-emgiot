<script setup lang="ts">
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

import { useHeader } from '@/composables/useHeader'
import { useSidebar } from '@/composables/useSidebar'

import { useCommonStore } from '@/stores/common.stores'

const commonStore = useCommonStore()

const { showGoBack, goPrevPage } = useHeader()
const { handleOpenSidebar } = useSidebar()
</script>

<template>
  <header class="header">
    <div
      v-if="!showGoBack"
      class="logo"
    >
      <BaseSvgIcon iconName="LOGO" />
    </div>
    <div
      v-else
      class="go-prev-page"
      @click="goPrevPage"
    >
      <BaseSvgIcon
        iconName="prev-arrow"
        size="lg"
      />
    </div>
    <h2 class="header-title">{{ commonStore.headerTitle }}</h2>
    <div
      id="menu"
      class="menu"
      @click="handleOpenSidebar"
    >
      <BaseSvgIcon
        iconName="menu"
        size="lg"
      />
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

  @include media-breakpoint-down(md) {
    padding-inline: $--header-padding-x-mobile;
  }

  .logo {
    width: 20%;
    max-width: $--logo-width-max;
    min-width: $--logo-width-min;
    height: $--logo-height;

    .svg-icon {
      width: 100%;
      height: 100%;
    }
  }

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
