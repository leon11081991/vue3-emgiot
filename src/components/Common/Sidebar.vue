<script setup lang="ts">
import { type Ref, ref } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import MaskOverlay from '@/components/Base/MaskOverlay.vue'
import { useClickOutside } from '@/composables/useClickOutside'
import { useCommonStore } from '@/stores/common'

import { navigationList } from '@/constants/common.const'

const commonStore = useCommonStore()

const sidebarRef = ref<HTMLElement | null>(null)

const handleCloseSidebar = () => {
  commonStore.isSidebarOpen = false
}

// useClickOutside(sidebarRef, handleCloseSidebar)
</script>

<template>
  <aside ref="sidebarRef" class="sidebar" :class="{ 'is-open': commonStore.isSidebarOpen }">
    <div class="close" @click="handleCloseSidebar">
      <img src="/src/assets/icons/cross.svg" alt="close" />
    </div>

    <div class="user-info">
      <div class="user-container">
        <div class="user-avatar"></div>
        <h5 class="user-name">雲小二</h5>
        <div class="user-level">1級</div>
      </div>
      <div class="message">
        <BaseSvgIcon iconName="mail" />
      </div>
    </div>

    <nav class="navigation">
      <ul class="nav-list">
        <li v-for="item in navigationList" :key="item.name" class="nav-item">
          <RouterLink
            :key="item.name"
            :to="{ name: item.name }"
            class="nav-link"
            @click="handleCloseSidebar"
          >
            <BaseSvgIcon :iconName="item.iconName" />
            <div class="nav-link-label">{{ item.label }}</div>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <div class="logout">
      <a-button type="primary" class="logout-btn">登出</a-button>
    </div>
  </aside>
  <transition name="fade">
    <MaskOverlay :isVisible="commonStore.isSidebarOpen" @click="handleCloseSidebar" />
  </transition>
</template>

<style lang="scss" scoped>
aside.sidebar {
  @include base-transition;
  position: fixed;
  top: 0;
  right: -$--sidebar-width;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 3rem 1rem 2rem 1rem;
  width: $--sidebar-width;
  height: $--sidebar-height;
  background-color: $--sidebar-bg-color;
  box-shadow: $--box-shadow-base;
  z-index: $--sidebar-z-index;

  &.is-open {
    right: 0;
  }

  .close {
    // @extend .base-transition;
    position: absolute;
    top: 1rem;
    right: 1.5rem;
    cursor: pointer;

    &:hover {
      background-color: rgba(#000000, 0.1);
      border-radius: $--border-radius-base;
    }
  }

  .user-info {
    .user-container {
      display: grid;
      grid-template-areas:
        'avatar name'
        'avatar level';
      grid-template-columns: 3rem 1fr;
      column-gap: 0.5rem;
    }
    .user-avatar {
      width: 3rem;
      height: 3rem;
      grid-area: avatar;
      border-radius: $--border-radius-circle;
    }
    .user-name {
      grid-area: name;
      margin: 0;
      color: $--color-primary;
    }
    .user-level {
      grid-area: level;
    }

    .message {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 1.75rem;
      height: 1.75rem;
      cursor: pointer;

      &:hover {
        background-color: rgba(#000000, 0.1);
        border-radius: $--border-radius-base;
      }
    }
  }

  .navigation {
    flex: 1;
  }

  .nav-list {
    list-style-type: none;
    padding-left: 0;
    margin: 0;
  }

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-block: 0.5rem;
    text-decoration: none;
    color: $--color-gray-700;
    border-radius: $--border-radius-base;

    &:hover {
      color: $--color-gray-900;
      background-color: rgba(#000000, 0.1);
    }
  }

  .nav-item {
    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }
  }

  .logout {
    width: 100%;

    .logout-btn {
      width: 100%;
    }
  }
}
</style>
