<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SvgIcon from '@/components/Base/SvgIcon.vue'
import { useHeader } from '@/composables/useHeader'

import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()
const { updateHeaderTitle } = useHeader()

const storeName = ref('')
const activeKey = ref<'claw' | 'coin'>('claw')

onMounted(() => {
  storeName.value = '大寮光華店'

  updateHeaderTitle($t('DashboardPage.HeaderTitle') + storeName.value) // 設定動態 header title
})

const tabs = [
  {
    key: 'claw',
    label: '選物販賣機'
  },
  {
    key: 'coin',
    label: '兌幣機'
  }
]

const selectedTab = ref('claw')
</script>

<template>
  <div class="dashboard-page">
    <div class="bar-chart-container">Bar Chart Here</div>

    <div class="update-container">
      <div class="update-detail">
        更新時間
        <span class="update-date">2021-11-11</span>
        <span class="update-time">11:11:11</span>
        <div class="update-button">
          <SvgIcon iconName="cross" />
        </div>
      </div>
    </div>

    <div class="tabs-container">
      <label
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-title"
        :class="{ active: tab.key === selectedTab }"
      >
        <input
          class="hidden-input"
          type="radio"
          name="tabs"
          :value="tab.key"
          v-model="selectedTab"
        />
        {{ tab.label }}
      </label>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.update-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
  margin-block: 1rem;
  font-size: 0.875rem;
  color: $--color-gray-600;

  .update-detail {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}

.tabs-container {
  width: 100%;
  display: flex;
  outline: 2px solid $--color-primary--dark;
  border-radius: $--border-radius-middle;
  background-color: $--color-primary--dark;

  .tab-title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 0.5rem;
    border-radius: $--border-radius-middle;
    color: $--color-primary--dark;
    background-color: $--color-white;
    cursor: pointer;

    &.active {
      color: $--color-white;
      background-color: $--color-primary--dark;
    }
  }
}

.hidden-input {
  position: absolute;
  opacity: 0;
  pointer-events: none; /* 防止用户意外点击到隐藏的input */
}
</style>
