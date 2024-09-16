<script setup lang="ts">
import Header from '@/components/Common/AppHeader.vue'
import Sidebar from '@/components/Common/AppSidebar.vue'
</script>

<template>
  <div class="layout-default">
    <Header />
    <Sidebar />
    <slot />
  </div>
</template>

<style lang="scss" scoped></style>
