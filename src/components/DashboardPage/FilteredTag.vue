<script setup lang="ts">
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { UtilCommon } from '@/utils/utilCommon'

const filterTagProps = withDefaults(
  defineProps<{
    text: string
    maxLength?: number
    closable?: boolean
  }>(),
  {
    maxLength: 2,
    closable: true
  }
)

const filterTagEmits = defineEmits<{
  (e: 'close'): void
}>()

const handleClose = () => {
  filterTagEmits('close')
}
</script>

<template>
  <a-tag
    class="filtered-tag"
    :bordered="false"
    closable
    @close="handleClose"
  >
    <template #closeIcon>
      <BaseSvgIcon iconName="close-gray" />
    </template>
    <span class="tag-text">{{
      UtilCommon.ellipsisText(filterTagProps.text, filterTagProps.maxLength)
    }}</span>
  </a-tag>
</template>

<style lang="scss" scoped>
.filtered-tag {
  display: flex;
  align-items: center;
  padding: 0.2rem 0.25rem 0.2rem 0.5rem;
  border-radius: 100px;
  background-color: $--color-gray-500;

  .tag-text {
    font-size: 0.75rem;
    color: $--color-gray-700;
  }

  .svg-icon {
    width: 1.25rem;
    height: 1.25rem;
  }
}
</style>
