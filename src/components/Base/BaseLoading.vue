<script setup lang="ts">
/* import */
import type { CSSProperties } from 'vue'
import { computed } from 'vue'

/* props(defineProps) */
const props = withDefaults(
  defineProps<{
    position?: string
    bgColor?: string
    zIndex?: number
  }>(),
  {
    position: 'fixed',
    bgColor: 'rgba(244, 244, 244, 0.5)',
    zIndex: 10000
  }
)

/* 非響應變數 */
const dotNum = 3

/* computed */
const style = computed(() => {
  return {
    position: props.position || 'fixed',
    backgroundColor: props.bgColor || 'rgba(244, 244, 244, 0.5)',
    zIndex: props.zIndex || 10000
  } as CSSProperties
})
</script>
<template>
  <div
    class="loading"
    :style="style"
  >
    <div id="loading-dots">
      <div
        v-for="i in dotNum"
        :key="i"
        class="dot"
      ></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loading {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-dots {
  margin-top: 1rem;
}

.dot {
  width: 1rem;
  height: 1rem;
  border-radius: 1000px;
  background-color: $--color-primary;
  display: inline-block;
  margin: 0 8px;
  animation: moveAndChangeColor 1.5s infinite linear alternate;

  @for $i from 1 through 3 {
    &:nth-child(#{$i}) {
      animation-delay: 0.25s * $i;
    }
  }
}

// 上下跳動＋變換顏色動畫
@keyframes moveAndChangeColor {
  0%,
  100% {
    transform: translateY(0);
    background-color: $--color-primary;
  }
  50% {
    transform: translateY(-25px);
    background-color: $--color-primary--light;
  }
}
</style>
