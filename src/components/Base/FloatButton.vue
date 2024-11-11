<script setup lang="ts">
/* import */
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

/* props(defineProps) */
const floatButtonProps = withDefaults(
  defineProps<{
    iconName?: string
  }>(),
  {
    iconName: 'add'
  }
)

/* emits(defineEmits) */
const floatButtonEmit = defineEmits<{
  (e: 'click'): void
}>()

/* functions */
const click = (): void => {
  floatButtonEmit('click')
}
</script>

<template>
  <a-float-button
    type="primary"
    :style="{
      right: '24px'
    }"
    @click="click"
  >
    <template #icon>
      <BaseSvgIcon
        :icon-name="floatButtonProps.iconName"
        color="white"
      />
    </template>
  </a-float-button>
</template>

<style lang="scss" scoped></style>
