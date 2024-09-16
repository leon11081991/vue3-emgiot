<script setup lang="ts">
const props = defineProps<{
  isVisible: boolean
}>()
</script>

<template>
  <div
    v-if="props.isVisible"
    class="mask-overlay"
  ></div>
</template>

<style lang="scss" scoped>
.mask-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: $--mask-overlay-z-index;
}
</style>
