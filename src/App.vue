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

<style lang="scss" scoped></style>
