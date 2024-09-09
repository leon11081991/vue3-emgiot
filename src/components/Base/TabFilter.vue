<script setup lang="ts">
import { ref } from 'vue'
import { type Tab } from '@/models/interfaces/tab.interface'

const tabFilterProps = defineProps<{
  tabs: Tab[]
  modalValue: string
}>()

const tabFilterEmit = defineEmits<{
  (e: 'update:modalValue', value: string): void
}>()

const filterValue = ref(tabFilterProps.modalValue)

const updateValue = (value: string) => {
  filterValue.value = value
  tabFilterEmit('update:modalValue', value)
}
</script>

<template>
  <div class="tab-filter">
    <!-- <label
      v-for="tab in tabs"
      :key="tab.key"
      class="tab-title"
      :class="{ active: tab.key === tabFilterProps.modalValue }"
    > -->
    <label
      v-for="tab in tabs"
      :key="tab.key"
      class="tab-title"
      :class="{ active: tab.key === filterValue }"
    >
      <!-- <input
        class="hidden-input"
        type="radio"
        name="tabs"
        :value="tab.key"
        v-model="tabFilterProps.modalValue"
        @change="updateValue(tab.key)"
      /> -->
      <input
        class="hidden-input"
        type="radio"
        name="tabs"
        :value="tab.key"
        v-model="filterValue"
        @change="updateValue(tab.key)"
      />
      {{ tab.label }}
    </label>
  </div>
</template>

<style lang="scss" scoped>
.tab-filter {
  width: 100%;
  display: flex;
  outline: 2px solid $--color-primary--dark;
  border-radius: $--border-radius-middle;
  background-color: $--color-primary--dark;

  .tab-title {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 0.5rem;
    border-radius: $--border-radius-middle;
    color: $--color-primary--dark;
    background-color: $--color-white;
    cursor: pointer;

    &.active {
      color: $--color-white;
      background-color: $--color-primary--dark;
    }
  }

  .hidden-input {
    position: absolute;
    opacity: 0;
    pointer-events: none; /* 防止點擊到隱藏的input */
  }
}
</style>
