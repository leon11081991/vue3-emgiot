<script setup lang="ts">
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import MaskOverlay from '@/components/Base/MaskOverlay.vue'

import { useSidebar } from '@/composables/useSidebar'
import { useDeviceWidth } from '@/composables/useDeviceWidth'
import { useAvatar } from '@/composables/useAvatar'
import { useRandomColor } from '@/composables/useRandomColor'

import { useCommonStore } from '@/stores/common'

import { navigationList } from '@/constants/common.const'
import { widthMapping } from '@/constants/mappings/width.mapping'

const commonStore = useCommonStore()
const { sidebarRef, handleCloseSidebar } = useSidebar()
const { width } = useDeviceWidth()
const { colorHex } = useRandomColor()
</script>

<template>
  <aside ref="sidebarRef" class="sidebar" :class="{ 'is-open': commonStore.isSidebarOpen }">
    <div class="close" @click="handleCloseSidebar">
      <BaseSvgIcon iconName="cross" />
    </div>

    <div class="user-info">
      <div class="user-container">
        <div class="user-avatar" :style="{ backgroundColor: colorHex }">
          {{ useAvatar('雲小二') }}
        </div>
        <h5 class="user-name">雲小二雲小二雲小二雲小二</h5>
        <div class="user-level">1級</div>
      </div>
      <div class="message-container">
        <RouterLink :to="{ name: 'Message' }" class="message-link">
          <BaseSvgIcon iconName="mail" />
        </RouterLink>
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
    <MaskOverlay
      v-if="width <= widthMapping['md']"
      :isVisible="commonStore.isSidebarOpen"
      @click="handleCloseSidebar"
    />
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
  box-shadow: $--box-shadow-dark;
  z-index: $--sidebar-z-index;

  &.is-open {
    right: 0;
  }

  .close {
    @include base-transition;
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
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    column-gap: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid $--color-gray-500;

    .user-container {
      display: grid;
      grid-template-areas:
        'avatar name'
        'avatar level';
      grid-template-columns: 3rem 1fr;
      column-gap: 0.5rem;
    }
    .user-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      grid-area: avatar;
      border: 1px solid $--color-gray-400;
      border-radius: $--border-radius-circle;
      font-size: 2rem;
      color: $--color-white;
    }
    .user-name {
      @include ellipsisText;
      grid-area: name;
      margin: 0;
      color: $--color-primary;
      font-size: 1rem;
    }
    .user-level {
      grid-area: level;
    }

    .message-container {
      display: flex;
      align-items: center;

      .message-link {
        @include base-transition;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.75rem;
        height: 1.75rem;
        border-radius: $--border-radius-base;
        cursor: pointer;

        &:hover {
          background-color: rgba(#000000, 0.1);
        }
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
