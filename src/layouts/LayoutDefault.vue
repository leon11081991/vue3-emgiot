<script setup lang="ts">
import Header from '@/components/Common/Header.vue'
import Sidebar from '@/components/Common/Sidebar.vue'
</script>

<template>
  <div class="layout-default">
    <Header />
    <Sidebar />
    <slot />
  </div>
</template>

<style lang="scss" scoped></style>
