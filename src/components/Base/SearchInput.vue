<script setup lang="ts">
/* import */
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

/* defineProps */
const props = defineProps<{
  searchValue: string
  placeholder?: string
}>()

/* defineEmits */
const emit = defineEmits<{
  (e: 'update:searchValue', value: string): void
  (e: 'onSearch'): void
}>()

/* functions */
const updateSearchValue = (e: InputEvent) => {
  emit('update:searchValue', (e.target as HTMLInputElement).value)
}

const onSearch = () => {
  emit('onSearch')
}
</script>

<template>
  <a-input
    class="search-input"
    :value="props.searchValue"
    :placeholder="props.placeholder"
    @change="updateSearchValue"
    @pressEnter="onSearch"
  >
    <template #prefix>
      <BaseSvgIcon iconName="magnifier" />
    </template>
  </a-input>
</template>

<style lang="scss" scoped>
.search-input {
  &.ant-input-affix-wrapper {
    background-color: $--background-color-base;

    :deep(.ant-input) {
      background-color: $--background-color-base;
    }
  }
}
</style>
