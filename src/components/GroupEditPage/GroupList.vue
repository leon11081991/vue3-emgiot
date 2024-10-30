<script setup lang="ts">
import type {
  BasePcbGroupResType,
  BasePcbsInfoType,
  ReArrangeDataType
} from '@/models/types/group.types'
import { ref, computed, watchEffect } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

/* props */
const props = defineProps<{
  list: BasePcbGroupResType
  collapse: number
}>()

/* emit */
const emit = defineEmits<{
  (e: 'openModal:more'): void
  (e: 'update:groupList', list: ReArrangeDataType): void
}>()

/* 響應式變數 */
const accordion_open = ref(false)
const pcbs = ref([...props.list.pcbs])

/* computed */
const groupName = computed(() => props.list.groupName || '未分類')
const clawMachineCount = computed(
  () => '選物機-' + props.list.pcbs.filter((item) => item.machineType === 0).length
)
const coinMachineCount = computed(
  () => '兌幣機-' + props.list.pcbs.filter((item) => item.machineType === 1).length
)

/* function */
function onUpdate() {
  emit('update:groupList', {
    groupId: props.list.groupId || '',
    pcbs: pcbs.value
  })
}

function onAdd() {
  emit('update:groupList', {
    groupId: props.list.groupId || '',
    pcbs: pcbs.value
  })
}

const fnOpenOperationModal = () => {
  emit('openModal:more')
}

const fnToggleAccordion = () => {
  accordion_open.value = !accordion_open.value
}

const beforeEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = '0'
  element.style.opacity = '0'
}

const enter = (el: Element) => {
  const element = el as HTMLElement
  element.style.transition = 'height 0.3s ease, opacity 0.3s ease'
  element.style.height = element.scrollHeight + 'px'
  element.style.opacity = '1'
}

const afterEnter = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = 'auto'
  element.style.transition = ''
}

const beforeLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = element.scrollHeight + 'px'
  element.style.opacity = '1'
}

const leave = (el: Element) => {
  const element = el as HTMLElement
  element.style.transition = 'height 0.3s ease, opacity 0.3s ease'
  element.style.height = '0'
  element.style.opacity = '0'
}

const afterLeave = (el: Element) => {
  const element = el as HTMLElement
  element.style.height = ''
  element.style.transition = ''
}

watchEffect(() => {
  if (props.collapse) {
    accordion_open.value = false
  }
})
</script>
<template>
  <div class="groupList-item">
    <div class="list-header">
      <BaseSvgIcon
        iconName="category"
        size="lg"
      />
      <div class="listInfo-container">
        <div class="listInfo-header">
          {{ groupName }}
        </div>
        <div class="machineCount-container">{{ clawMachineCount }} | {{ coinMachineCount }}</div>
      </div>
      <div
        class="list-moreOperation"
        @click="fnOpenOperationModal"
      >
        ···
      </div>
      <div
        class="groupList-accordion"
        :class="{ 'rotate-180': accordion_open }"
        @click="fnToggleAccordion"
      >
        <BaseSvgIcon
          iconName="arrow-down"
          size="md"
        />
      </div>
    </div>
    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
      @before-leave="beforeLeave"
      @leave="leave"
      @after-leave="afterLeave"
    >
      <div
        v-if="accordion_open"
        class="list-body"
      >
        <VueDraggable
          class="draggable-container"
          v-model="pcbs"
          :animation="150"
          ghostClass="ghost"
          group="people"
          @update="onUpdate"
          @add="onAdd"
        >
          <div
            v-for="item in pcbs"
            :key="item.pcbId"
            class="draggable-item"
          >
            <BaseSvgIcon
              iconName="dot-six"
              size="lg"
            />
            <div class="storeName">
              {{ item.storeName }}
            </div>
            <div class="machineInfo">
              <div class="machineName">
                {{ item.machineName }}
              </div>
              <div class="machineType">
                {{ item.machineType === 0 ? '選物販賣機' : '兌幣機' }}
              </div>
            </div>
          </div>
        </VueDraggable>
      </div>
    </transition>
  </div>
</template>
<style lang="scss" scoped>
.groupList-item {
  border: 1px solid $--border-color-base;
  border-radius: 4px;
  padding: 8px 6px;
  user-select: none;
}

.list-header {
  display: flex;
  align-items: center;
  column-gap: 8px;
}

.list-body {
  overflow: hidden;
  border-top: 2px solid $--color-border;
  margin: 4px;
}

.draggable-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  overflow-y: auto;
  @media screen and (max-width: 468px) {
    padding: 16px 0;
  }
}

.draggable-item {
  display: flex;
  align-items: center;
  column-gap: 8px;
  cursor: move;
  border-radius: 8px;
  .svg-icon {
    flex-shrink: 0;
  }
  .storeName {
    flex-shrink: 0;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    color: #fff;
    background: $--color-Tab-bg;
  }
  .machineInfo {
    font-size: 14px;
    .machineName {
      color: $--color-primary;
    }
    .machineType {
      color: $--color-update-time;
    }
  }
  @media screen and (max-width: 468px) {
    column-gap: 0;
    .storeName {
      font-size: 14px;
      margin-right: 8px;
    }
  }
}

.listInfo-container {
  .listInfo-header {
    color: $--color-primary;
  }
  .machineCount-container {
    font-size: 12px;
    color: $--color-update-time;
  }
}

.list-moreOperation {
  margin-left: auto;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -1px;
  color: $--color-primary;
}

.groupList-accordion {
  cursor: pointer;
  &.rotate-180 {
    transform: rotate(180deg);
  }
}
</style>
