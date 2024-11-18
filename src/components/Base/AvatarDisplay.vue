<script setup lang="ts">
/* import */
import { computed } from 'vue'
import { useAvatarLetters } from '@/composables/useAvatarLetters'
import { useRandomColor } from '@/composables/useRandomColor'

/* props(defineProps) */
const props = withDefaults(
  defineProps<{
    name: string
    charNum?: number
    googleAvatarUrl?: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    name: '',
    charNum: 1,
    size: 'md'
  }
)

/* composables */
const { colorHex } = useRandomColor()

/* computed */
const avatarLetters = computed(() => {
  return useAvatarLetters(props.name, props.charNum).avatarLetters.value
})
const avatarSize = computed(() => {
  switch (props.size) {
    case 'sm':
      return 24
    case 'md':
      return 48
    case 'lg':
      return 64
    default:
      return 24
  }
})
const isGoogleMember = computed<boolean>(() => !!props.googleAvatarUrl)
</script>

<template>
  <div class="avatar-container">
    <a-avatar
      v-if="isGoogleMember"
      :src="props.googleAvatarUrl"
      :size="avatarSize"
    ></a-avatar>
    <div
      v-else
      :class="['avatar', { 'two-letters': avatarLetters?.length === 2 }]"
      :style="{ backgroundColor: colorHex, width: `${avatarSize}px`, height: `${avatarSize}px` }"
    >
      <span
        v-for="(letter, index) in avatarLetters"
        :key="index"
        :class="`letter letter-${index + 1} ${props.size}`"
      >
        {{ letter }}
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  font-weight: bold;
  position: relative;
  overflow: hidden;
  color: $--color-white;
}

.two-letters .letter {
  position: absolute;
  overflow: hidden;
  line-height: 1;

  &.sm {
    font-size: 1rem;
  }

  &.md {
    font-size: 1.5rem;
  }

  &.lg {
    font-size: 2rem;
  }
}

.letter-1 {
  top: 4px;
  left: 0;
}

.letter-2 {
  bottom: 4px;
  right: 0;
}
</style>
