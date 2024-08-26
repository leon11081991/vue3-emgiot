<script setup lang="ts">
const navigationList = [
  {
    label: '首頁',
    name: 'Home',
    'header-title': '首頁'
  },
  {
    label: '個人資料',
    name: 'Profile'
  },
  {
    label: '成員管理',
    name: 'Member'
  }
]
</script>

<template>
  <aside class="sidebar">
    <nav class="navigation">
      <ul class="nav-list">
        <li v-for="item in navigationList" :key="item.name" class="nav-item">
          <RouterLink :key="item.name" :to="{ name: item.name }" class="nav-link">
            {{ item.label }}
          </RouterLink>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style lang="scss" scoped></style>
