<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AvatarDisplay from '@/components/Base/AvatarDisplay.vue'

const { t: $t } = useI18n()

const props = withDefaults(
  defineProps<{
    storeName: string
    hideStoreName?: boolean
  }>(),
  {
    storeName: '',
    hideStoreName: false
  }
)
</script>

<template>
  <section class="info-container">
    <div class="store-info-container">
      <AvatarDisplay
        size="lg"
        :name="props.storeName"
        :charNum="2"
      />
      <div class="store-name-container">
        {{ $t('Common.AppName') }}&nbsp;-&nbsp;

        <span
          v-if="!props.hideStoreName"
          class="store-name"
          >{{ props.storeName }}</span
        >
        <slot />
      </div>
    </div>
    <slot name="user" />
  </section>
</template>

<style lang="scss" scoped>
.info-container {
  padding: 0.75rem;
  border-radius: $--border-radius-middle;
  border: 1px solid $--color-gray-400;

  .store-info-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 0.5rem;

    .store-name-container {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      font-size: 1.5rem;
      color: $--color-primary;
      font-weight: bold;
    }
  }
}
</style>
