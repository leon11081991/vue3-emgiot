<script setup lang="ts">
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

const props = defineProps<{
  text: string
  iconName: string
}>()
</script>

<template>
  <a-button
    class="third-party-btn"
    type="third-party"
  >
    <template #icon>
      <BaseSvgIcon
        :iconName="props.iconName"
        size="lg"
      />
    </template>
    <span class="text">{{ props.text }}</span>
  </a-button>
</template>

<style lang="scss" scoped>
.third-party-btn {
  width: 100%;
  height: auto;
}

.third-party-btn {
  :deep(.text) {
    flex: 1;
  }
}
</style>
