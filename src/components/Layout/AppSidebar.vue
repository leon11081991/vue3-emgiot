<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import MaskOverlay from '@/components/Base/MaskOverlay.vue'
import AvatarDisplay from '@/components/Base/AvatarDisplay.vue'
import { useSidebar } from '@/composables/useSidebar'
import { useAuth } from '@/composables/useAuth'
import { useDeviceWidth } from '@/composables/useDeviceWidth'
import { useCommonStore } from '@/stores/common.stores'
import { useUserStore } from '@/stores/user.stores'
import { navigationList } from '@/constants/common/sidebar.const'
import { widthMapping } from '@/constants/mappings/width.mapping'

const { t: $t } = useI18n()
const commonStore = useCommonStore()
const userStore = useUserStore()
const { sidebarRef, handleCloseSidebar } = useSidebar()
const { fnLogOut } = useAuth()
const { width } = useDeviceWidth()

const isLogoutModalOpen = ref(false)
const isButtonLoading = ref(false)

const handleLogout = () => {
  commonStore.isSidebarOpen = false
  isLogoutModalOpen.value = true
}
</script>

<template>
  <aside
    ref="sidebarRef"
    class="sidebar"
    :class="{ 'is-open': commonStore.isSidebarOpen }"
  >
    <div
      class="close"
      @click="handleCloseSidebar"
    >
      <BaseSvgIcon iconName="cross" />
    </div>

    <div class="user-info">
      <div class="user-container">
        <AvatarDisplay
          :name="userStore.userInfo.name"
          :google-avatar-url="userStore.userInfo.photoUrl"
        />
        <div class="user-wrap">
          <h5 class="user-name">{{ userStore.userInfo.name }}</h5>
          <!-- issue43：完全不顯示等級 -->
          <!-- <div class="user-level">
            <BaseSvgIcon :iconName="`level-${userStore.userInfo.roleOrder}`" />
            <span class="user-level-text">
              {{ $t(`Common.Level`, { level: userStore.userInfo.roleOrder }) }}</span
            >
          </div> -->
        </div>
      </div>
      <div class="message-container">
        <RouterLink
          :to="{ name: 'Message' }"
          class="message-link"
          @click="handleCloseSidebar"
        >
          <BaseSvgIcon iconName="bell-on" />
        </RouterLink>
      </div>
    </div>

    <nav class="navigation">
      <ul class="nav-list">
        <li
          v-for="item in navigationList"
          :key="item.name"
          class="nav-item"
        >
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
      <a-button
        type="primary"
        class="logout-btn"
        @click="handleLogout"
      >
        {{ $t('Common.Logout') }}
      </a-button>
    </div>
  </aside>
  <transition name="fade">
    <MaskOverlay
      v-if="width <= widthMapping['md']"
      :isVisible="commonStore.isSidebarOpen"
      @click="handleCloseSidebar"
    />
  </transition>

  <a-modal
    v-model:open="isLogoutModalOpen"
    class="logout-modal primary"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ $t('LoginPage.Modal.Logout.Title') }}</span>
      </div>
    </template>

    <div class="logout-modal-content">
      <p>{{ $t('LoginPage.Modal.Logout.Content') }}</p>
    </div>

    <template #footer>
      <div class="button-group">
        <a-button
          type="primary"
          size="large"
          :loading="isButtonLoading"
          @click="fnLogOut"
        >
          {{ $t('LoginPage.Modal.Logout.Button.Confirm') }}
        </a-button>
        <a-button
          type="primary"
          size="large"
          ghost
          @click="isLogoutModalOpen = false"
        >
          {{ $t('LoginPage.Modal.Logout.Button.Cancel') }}
        </a-button>
      </div>
    </template>
  </a-modal>
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
  padding-inline: $--sidebar-padding-x;
  padding-block: $--sidebar-padding-y;
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
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;

    padding-bottom: 0.5rem;
    border-bottom: 1px solid $--color-gray-500;

    .user-container {
      display: flex;
      gap: 0.5rem;
    }
    .user-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      border: 1px solid $--color-gray-400;
      border-radius: $--border-radius-circle;
      font-size: 2rem;
      color: $--color-white;
    }
    .user-wrap {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 120px;
    }
    .user-name {
      @include ellipsisText;
      margin: 0;
      color: $--color-primary;
      font-size: 1rem;
    }
    .user-level {
      display: flex;
      align-items: center;
    }

    .message-container {
      width: 100%;
      display: flex;
      align-items: center;

      .message-link {
        @include base-transition;
        display: flex;
        align-items: center;
        justify-content: center;
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
    padding-left: 0.5rem;
    text-decoration: none;
    color: $--color-gray-700;
    border-radius: $--border-radius-base;

    &:hover {
      color: $--color-gray-900;
      background-color: rgba(#000000, 0.1);
    }
  }

  .nav-item {
    font-weight: 400;
    transition:
      text-shadow 0.5s ease,
      letter-spacing 0.5s ease;
    border-radius: $--border-radius-base;

    &:not(:last-child) {
      margin-bottom: 0.5rem;
    }

    &:has(.router-link-active) {
      background-color: rgba($--color-primary, 0.2);
      font-weight: 700;
      text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.3);
      letter-spacing: 0.5px;
    }
  }

  .logout {
    width: 100%;

    .logout-btn {
      width: 100%;
    }
  }
}

.logout-modal {
  .logout-modal-content {
    margin-block: 2rem;
    font-size: 1rem;
    text-align: center;
    color: $--color-gray-600;
  }

  .button-group {
    display: flex;

    & > button {
      flex: 1;
    }
  }
}
</style>
