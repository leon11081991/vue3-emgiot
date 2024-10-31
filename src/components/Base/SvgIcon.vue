<script setup lang="ts">
import { computed } from 'vue'

type SizeType = 'sm' | 'md' | 'lg' | 'xl'
type ColorType = 'primary' | 'secondary' | 'tertiary'

const props = withDefaults(
  defineProps<{
    iconName: string
    size?: SizeType
    color?: ColorType | string
  }>(),
  {
    size: 'md',
    color: 'primary'
  }
)

const rootStyles = getComputedStyle(document.documentElement)

const iconName = computed(() => `#icon-${props.iconName}`)
const classes = computed(() => {
  return {
    [`icon-${props.iconName}`]: props.iconName,
    [props.size]: props.size
  }
})
const color = computed(() => {
  switch (props.color) {
    case 'primary':
      return rootStyles.getPropertyValue('--color-primary').trim()
    case 'secondary':
      return rootStyles.getPropertyValue('--color-secondary').trim()
    case 'tertiary':
      return rootStyles.getPropertyValue('--color-tertiary').trim()
    case 'white':
      return rootStyles.getPropertyValue('--color-white').trim()
    default:
      return rootStyles.getPropertyValue('--color-primary').trim()
  }
})
</script>

<template>
  <svg
    class="svg-icon"
    :class="classes"
    v-bind="$attrs"
  >
    <use :href="iconName" />
  </svg>
</template>

<style lang="scss" scoped>
.svg-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  color: v-bind('color');
  pointer-events: none;

  &.sm {
    width: $--icon-width-sm;
    height: $--icon-height-sm;
  }

  &.md {
    width: $--icon-width-md;
    height: $--icon-height-md;
  }

  &.lg {
    width: $--icon-width-lg;
    height: $--icon-height-lg;
  }

  &.xl {
    width: $--icon-width-xl;
    height: $--icon-height-xl;
  }

  &.logo {
    width: 100%;
    height: 40px;
  }
}
</style>
