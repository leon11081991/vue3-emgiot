<script setup lang="ts">
/* import */
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

/* props(defineProps) */
const props = withDefaults(
  defineProps<{
    value: boolean
    iconName?: string
  }>(),
  {
    value: true
  }
)

/* emits(defineEmits) */
const emit = defineEmits<{
  (e: 'update:value', value: boolean): void
}>()

/* functions */
const toggleSwitch = () => {
  emit('update:value', !props.value)
}
</script>

<template>
  <div
    class="switch-container"
    @click="toggleSwitch"
  >
    <div class="switch-background"></div>
    <div :class="['switch-button', { active: props.value }]">
      <BaseSvgIcon
        v-if="props.iconName"
        :iconName="props.iconName"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
$--switch-height: 24px;
$--switch-width: 60px;

.switch-container {
  display: inline-block;
  width: $--switch-width;
  height: $--switch-height;
  position: relative;
  cursor: pointer;
}

.switch-background {
  @include base-transition;
  width: 100%;
  height: 100%;
  background-color: $--color-gray-600;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s ease;
}

.switch-button {
  position: absolute;
  top: 50%;
  left: -5px;
  transform: translate(0, -50%);
  width: $--icon-width-md;
  height: $--icon-height-md;
  background-color: $--color-primary;
  border-radius: 50%;
  transition: transform 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;

  &.active {
    transform: translate(35px, -50%);
  }
}

.switch-container:hover .switch-background {
  background-color: $--color-primary--light;
}
</style>
