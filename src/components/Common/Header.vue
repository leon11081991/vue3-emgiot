<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCommonStore } from '@/stores/common'

const router = useRouter()
const commonStore = useCommonStore()

const goPrevPage = () => {
  router.go(-1)
}
</script>

<template>
  <header class="header">
    <div class="logo">雲端</div>
    <div class="go-prev-page" @click="goPrevPage">
      <img src="/src/assets/icons/left-arrow.svg" alt="go-prev-page" />
    </div>
    <h2 class="header-title">{{ commonStore.headerTitle }}</h2>
    <div class="menu">
      <img src="/src/assets/icons/menu.svg" alt="menu" />
    </div>
  </header>
</template>

<style lang="scss" scoped>
.header {
  height: $header-height;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-inline: 1.5rem;
  z-index: 10;

  .header-title {
    margin: 0;
    flex: 1;
    text-align: center;
  }

  .go-prev-page,
  .menu {
    @include base-transition;
    cursor: pointer;
    border-radius: $border-radius;

    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
