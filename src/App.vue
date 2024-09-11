<script lang="ts" setup>
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <component :is="route.meta.layoutComponent || 'div'">
    <main class="main-page" :class="route.name">
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

  &.Login,
  &.SignUp {
    min-height: 100vh;
  }

  @include media-breakpoint-down(md) {
    padding-inline: $--page-padding-x-mobile;
  }
}

/** Ant Design Button */
.ant-btn {
  &.ant-btn-default {
    @include base-transition;
    background-color: $--color-default;
    color: $--color-white;
    border: none;

    &:hover {
      background-color: $--color-default--hover;
      color: $--color-white;
    }

    &[disabled] {
      background-color: $--color-default--disabled;
    }
  }

  &.ant-btn-primary {
    @include base-transition;
    background-color: $--color-primary;

    &:hover {
      background-color: $--color-primary--hover;
    }

    &[disabled] {
      background-color: $--color-primary--disabled;
    }
  }
}

/** Ant Design Modal */
.ant-modal {
  & .ant-modal-content {
    padding: 0;
    padding-bottom: 0.75rem;
    background-color: $--background-color-base;
    border-radius: $--border-radius-middle;
  }

  & .ant-modal-header {
    padding: 0.75rem;
    margin: 0;
    background-color: $--background-color-base;

    .ant-modal-title {
      color: $--color-primary;
    }
  }

  & .ant-modal-body {
    margin-inline: 0.75rem;
    margin-block: 0.5rem;
  }

  & .ant-modal-footer {
    margin-inline: 0.75rem;
  }

  & .ant-modal-close {
    top: 0.75rem;
    inset-inline-end: 0.75rem;
  }

  & .ant-modal-close-x {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $--color-primary;
  }
}
</style>
