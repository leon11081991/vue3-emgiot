<script setup lang="ts">
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

const floatButtonProps = withDefaults(
  defineProps<{
    iconName?: string
  }>(),
  {
    iconName: 'add'
  }
)

const floatButtonEmit = defineEmits<{
  (e: 'click'): void
}>()

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
