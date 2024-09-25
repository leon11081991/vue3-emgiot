<script lang="ts" setup>
import { RouterView, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <component
    class="container"
    :is="route.meta.layoutComponent || 'div'"
  >
    <main
      class="main-page"
      :class="route.name"
    >
      <RouterView />
    </main>
  </component>
</template>

<style lang="scss">
.container {
  position: relative;
  overflow: hidden;
  max-width: map-get($grid-breakpoints, md);
  margin: 0 auto;
}
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

.group-tag {
  padding: 0.25rem 0.5rem;
  background-color: $--color-primary;
  color: $--color-white;
  border-radius: $--border-radius-middle;
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
      box-shadow: $--box-shadow-light;
    }

    &[disabled] {
      background-color: $--color-default--disabled;
    }
  }

  &.ant-btn-primary {
    @include base-transition;
    height: auto;
    padding-block: 0.75rem;
    background-color: $--color-primary;
    color: $--color-white;
    border: none;

    &:hover {
      background-color: $--color-primary--hover;
      box-shadow: $--box-shadow-light;
    }

    &[disabled] {
      background-color: $--color-primary--disabled;
    }
  }

  &.ant-btn-secondary {
    @include base-transition;

    &.ant-btn-background-ghost {
      background-color: $--color-white;
      color: $--color-secondary;
      border: 1px solid $--color-secondary;

      &:hover {
        background-color: $--color-secondary;
        color: $--color-white;
      }
    }
  }

  &.ant-btn-third-party {
    @include base-transition;
    display: flex;
    align-items: center;
    background-color: $--color-white;
    border: 1px solid $--color-gray-400;
    color: $--color-primary;
    padding-block: 0.25rem;

    &:hover {
      box-shadow: $--box-shadow-light;
    }
  }
}

/** Ant Design Float Button */
.ant-float-btn {
  &-primary {
    .ant-float-btn-body {
      @include base-transition;
      background-color: $--color-primary;

      &:hover {
        background-color: $--color-primary--hover;
      }
    }
  }
}

/** Ant Design Modal */
.ant-modal {
  & .ant-modal-content {
    padding: 0;
    padding-bottom: 0.75rem;
    background-color: $--background-color-base;
  }

  & .ant-modal-header {
    padding: 0;
    margin: 0;
    overflow: hidden;

    .modal-header {
      padding: 0.75rem;

      &-default {
        background-color: $--background-color-base;

        .modal-title {
          color: $--color-primary;
        }
      }

      &-primary {
        background-color: $--color-primary;

        .modal-title {
          color: $--color-white;
        }
      }
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

  &.primary {
    .ant-modal-close-x {
      color: $--color-white;
    }
  }
}

/** Ant Design Segmented */
.ant-segmented {
  background-color: $--color-tertiary;
  border-radius: 4px;

  .ant-segmented-thumb {
    background-color: $--color-tertiary;
    z-index: 1;
  }

  .ant-segmented-item {
    background-color: $--color-white;
    border-radius: 2px;

    .svg-icon {
      padding: 2px;
      color: $--color-tertiary;
    }

    .tab-label {
      color: $--color-tertiary;
    }
  }

  .ant-segmented-item-selected {
    background-color: $--color-tertiary;
    .svg-icon {
      color: $--color-white;
    }

    .tab-label {
      color: $--color-white;
    }
  }

  .ant-segmented-item-label {
    display: flex;
    align-items: center;
    width: 100%;

    .tab-label {
      flex: 1;
    }
  }
}

/** Ant Design Result */
.ant-result {
  padding: 0;
  max-width: 100%; // 確保容器不超出父級容器
  width: 100%;

  &.status-notification {
    display: grid;
    grid-template-areas: 'icon title' 'extra extra';
    grid-template-columns: auto 1fr;
    gap: 1rem;
  }

  .ant-result-icon {
    grid-area: icon;
    margin-bottom: 0px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .anticon {
      width: 100%;

      @include media-breakpoint-down(md) {
        font-size: 50px;
      }
    }
  }

  .ant-result-title {
    grid-area: title;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-items: center;
    gap: 0.5rem;

    .title {
      text-align: left;
      color: $--color-primary;
    }
    .sub-title {
      text-align: left;
      font-size: 1rem;
      color: $--color-gray-600;
      flex: 1;
    }
  }

  .ant-result-extra {
    grid-area: extra;
    margin-top: 0;

    .notification-button {
      width: 100%;

      &.error {
        background-color: $--color-error;
      }

      &.success {
        background-color: $--color-success;
      }
    }
  }
}

/** Ant Design Empty */
.ant-empty {
  margin-block: 0.5rem;
}
</style>
