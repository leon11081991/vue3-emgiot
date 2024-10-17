<script setup lang="ts">
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

const props = defineProps<{
  searchValue: string
  placeholder?: string
}>()

const emit = defineEmits<{
  (e: 'update:searchValue', value: string): void
  (e: 'onSearch'): void
}>()

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
