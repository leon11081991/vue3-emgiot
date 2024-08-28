<script setup lang="ts">
import { computed } from 'vue'

type SizeType = 'sm' | 'md' | 'lg' | 'xl'
const props = withDefaults(
  defineProps<{
    iconName: string
    size?: SizeType
    color?: string
  }>(),
  {
    size: 'md'
  }
)

const iconName = computed(() => `#icon-${props.iconName}`)
const classes = computed(() => {
  return {
    [`icon-${props.iconName}`]: props.iconName,
    [props.size]: props.size
  }
})
</script>

<template>
  <svg class="svg-icon" :class="classes" v-bind="$attrs" :style="{ color: color }">
    <use :href="iconName" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  color: $--color-primary;

  &.sm {
    width: $--icon-width--sm;
    height: $--icon-height--sm;
  }

  &.md {
    width: $--icon-width--md;
    height: $--icon-height--md;
  }

  &.lg {
    width: $--icon-width--lg;
    height: $--icon-height--lg;
  }

  &.xl {
    width: $--icon-width--xl;
    height: $--icon-height--xl;
  }

  &.logo {
    width: 100%;
    height: 40px;
  }
}
</style>
