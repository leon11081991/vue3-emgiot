<script setup lang="ts">
import { computed } from 'vue'
import { useAvatarLetters } from '@/composables/useAvatarLetters'
import { useRandomColor } from '@/composables/useRandomColor'

const props = withDefaults(
  defineProps<{
    name: string
    charNum?: number
    isGoogleMember?: boolean
    googleAvatarUrl?: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    charNum: 1,
    isGoogleMember: false,
    size: 'md'
  }
)

const { avatarLetters } = useAvatarLetters(props.name, props.charNum)
const { colorHex } = useRandomColor()

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
</script>

<template>
  <div class="avatar-container">
    <a-avatar
      v-if="props.isGoogleMember"
      :src="props.googleAvatarUrl"
      :size="avatarSize"
    ></a-avatar>
    <div
      v-else
      :class="['avatar', { 'two-letters': avatarLetters.length === 2 }]"
      :style="{ backgroundColor: colorHex, width: `${avatarSize}px`, height: `${avatarSize}px` }"
    >
      <span
        v-for="(letter, index) in avatarLetters"
        :key="index"
        :class="`letter letter-${index + 1}`"
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
  font-size: 1.5rem;
  overflow: hidden;
}

.letter-1 {
  top: 4px;
  left: 2px;
}

.letter-2 {
  top: 20px;
  right: 2px;
}
</style>
