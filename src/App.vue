<script lang="ts" setup>
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <component :is="route.meta.layoutComponent || 'div'">
    <main class="main-page">
      <RouterView />
    </main>
  </component>
</template>

<style lang="scss">
.main-page {
  min-height: calc(100vh - $--header-height);
  padding-inline: $--page-padding-x;
  padding-block: $--page-padding-top $--page-padding-bottom;
  background-color: $--page-bg-color;

  @include media-breakpoint-down(md) {
    padding-inline: $--page-padding-x-mobile;
  }
}

.ant-modal {
  & .ant-modal-content {
    padding: 0;
    padding-bottom: 1rem;
  }

  & .ant-modal-header {
    padding: 1rem;
    margin: 0;
    background-color: $--color-primary;
  }

  & .ant-modal-body {
    margin: 1rem;
  }

  & .ant-modal-footer {
    margin-inline: 1rem;
  }

  & .ant-modal-close-x {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $--color-white;
  }
}
</style>
