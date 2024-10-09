<script setup lang="ts">
/* 1. import */
import { ref, computed, onMounted, onBeforeUnmount, h } from 'vue'
import { CaretDownOutlined } from '@ant-design/icons-vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { useDropdown } from '@/composables/useDropdown'
import { QDate } from 'quasar'
import { useDate } from '@/composables/useDate'

import '@/assets/scss/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'

/* 2. type */
type PickerType = 'start' | 'end' | 'range'
type SelectType = 'group' | 'merchandise'

const { groupsDDLList, goodsList, fetchGroupsDDLList, fetchGoodsList } = useDropdown()

/* 5. Props (defineProps) */
const props = defineProps<{
  modalVisible: boolean
  searchValue: string
}>()

/* 6. Emits Events (defineEmits) */
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'update:searchValue', value: string): void
  (e: 'onSearch'): void
}>()

/* 9. 非響應式變數 */
const { today, calculateDate, getDaysInTwoMonths, getThreeMonthsAgo } = useDate()

/* 11. ref 變數 */
const startDate = ref<string | null>(today())
const endDate = ref<string | null>(today())
const rangeDate = ref<{ from: string; to: string } | string>({ from: '', to: '' })
const tempRangeDate = ref({ from: '', to: '' })
const rangePickerActiveItem = ref('今日')

const picker = ref({
  start: false,
  end: false,
  range: false
})

const isDropdownOpen = ref({
  group: false,
  merchandise: false
})

/* 13. computed */
// 動態根據下拉選單狀態更改圖標
const customIcon = (selectType: SelectType) => {
  return h(CaretDownOutlined, {
    class: isDropdownOpen.value[selectType] ? 'rotate-up' : ''
  })
}

/* 14. function */

const closeModal = () => {
  emit('close')
}

const fnFilterDashboardData = () => {
  closeModal()
}

const updateSearchValue = (value: string) => {
  console.log('updateSearchValue', value)
  emit('update:searchValue', value)
}

const onSearch = () => {
  console.log('onSearch')
  emit('onSearch')
}

const fnToggleDatePicker = (type: PickerType) => {
  const pickerKeys = Object.keys(picker.value) as Array<keyof typeof picker.value>
  pickerKeys.forEach((key) => {
    if (key !== type) {
      picker.value[key] = false
    }
  })

  // 檢查 rangeDate 是否為物件並更新值
  if (typeof rangeDate.value === 'object' && 'from' in rangeDate.value && startDate.value) {
    rangeDate.value.from = startDate.value
  }

  if (typeof rangeDate.value === 'object' && 'to' in rangeDate.value && endDate.value) {
    rangeDate.value.to = endDate.value
  }

  // 如果 rangeDate 是字串並且 startDate 和 endDate 相等，更新 rangeDate 為字串值
  if (typeof rangeDate.value === 'string' && startDate.value === endDate.value) {
    rangeDate.value = startDate.value || endDate.value || ''
  }

  picker.value[type] = !picker.value[type]
}

const isRangeDateSelected = computed(() =>
  typeof rangeDate.value === 'object'
    ? rangeDate.value?.from || rangeDate.value?.to
    : rangeDate.value
)

const fnRangePicker = (label: keyof typeof dateRangePickerConfig) => {
  rangePickerActiveItem.value = label
  if (endDate.value) {
    startDate.value = calculateDate(endDate.value, 'backward', dateRangePickerConfig[label])
  }
}

const handleFnKeepTempRangeDate = () => {
  if (typeof rangeDate.value === 'object' && rangeDate.value?.from && rangeDate.value?.to) {
    tempRangeDate.value.from = rangeDate.value?.from
    tempRangeDate.value.to = rangeDate.value?.to
  } else if (typeof rangeDate.value === 'string' && rangeDate.value) {
    tempRangeDate.value.from = rangeDate.value
    tempRangeDate.value.to = rangeDate.value
  }
}

const fnHandleRangeDateConfirm = () => {
  if (tempRangeDate.value?.from && tempRangeDate.value?.to) {
    startDate.value = tempRangeDate.value?.from
    endDate.value = tempRangeDate.value?.to
    tempRangeDate.value.from = ''
    tempRangeDate.value.to = ''
  }
  fnToggleDatePicker('range')
}

/* 18. 生命週期 (Lifecycle hooks) */
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

/* 下拉選單開關變化處理 */
const handleDropdownVisibleChange = (visible: boolean, selectType: 'group' | 'merchandise') => {
  isDropdownOpen.value[selectType] = visible
}
/* 當點擊QDate外部時隱藏日期選擇器 */
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const datePickerElements = ['.datePickerCom', '.dateData', '.q-date', '.q-date__calendar']
  const isClickInside = datePickerElements.some((selector) => target.closest(selector))
  if (!isClickInside) {
    picker.value.start = false
    picker.value.end = false
    picker.value.range = false
  }
}

/* date range picker configuration */
const dateRangePickerConfig = {
  今日: 0,
  二日: 1,
  三日: 2,
  一週: 6,
  一個月: getDaysInTwoMonths()
}

const optionsConfig = (date: string) => {
  const current = new Date(date)
  return current >= new Date(getThreeMonthsAgo()) && current <= new Date(today())
}

fetchGroupsDDLList()
fetchGoodsList()
</script>
<template>
  <a-modal
    :open="props.modalVisible"
    class="batch-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">設定篩選條件</span>
      </div>
    </template>

    <!-- 日期選擇器 -->
    <div class="datePicker-container">
      <div class="datePicker startDate-container">
        <div class="quasar-custom-container start">
          <transition name="fade">
            <q-date
              v-show="picker.start"
              :options="optionsConfig"
              mask="YYYY-MM-DD"
              class="datePickerCom startDateCom"
              v-model="startDate"
              @update:modelValue="fnToggleDatePicker('start')"
              minimal
              persistent
            />
          </transition>
        </div>
        <div
          class="dateData"
          @click.stop="fnToggleDatePicker('start')"
        >
          <div class="dateData-item">
            開始時間
            <div class="date">
              {{ startDate }}
            </div>
          </div>
        </div>
      </div>
      <div class="datePicker endDate-container">
        <div class="quasar-custom-container end">
          <transition name="fade">
            <q-date
              v-show="picker.end"
              :options="optionsConfig"
              mask="YYYY-MM-DD"
              class="datePickerCom endDateCom"
              v-model="endDate"
              @update:modelValue="fnToggleDatePicker('end')"
              minimal
              persistent
            />
          </transition>
        </div>
        <div
          class="dateData"
          @click.stop="fnToggleDatePicker('end')"
        >
          <div class="dateData-item">
            結束時間
            <div class="date">
              {{ endDate }}
            </div>
          </div>
        </div>
      </div>
      <div class="multi-datePicker-container">
        <BaseSvgIcon
          class="rangeDate-icon"
          iconName="calendar"
          size="lg"
          @click.stop="fnToggleDatePicker('range')"
        />
        <div class="quasar-custom-container range">
          <transition name="fade">
            <q-date
              v-show="picker.range"
              :options="optionsConfig"
              mask="YYYY-MM-DD"
              class="rangeDate"
              v-model="rangeDate"
              @update:modelValue="handleFnKeepTempRangeDate"
              range
              minimal
              persistent
            >
              <template #default>
                <div class="range-button-container">
                  <a-button
                    class="confirm-btn btn"
                    type="primary"
                    v-if="isRangeDateSelected"
                    @click="fnHandleRangeDateConfirm"
                  >
                    確認
                  </a-button>
                  <a-button
                    v-else
                    class="cancel-btn btn"
                    type="outlined"
                    @click="fnToggleDatePicker('range')"
                  >
                    取消
                  </a-button>
                </div>
              </template>
            </q-date>
          </transition>
        </div>
      </div>
    </div>

    <div class="rangeDate-picker">
      <div
        v-for="(days, label) in dateRangePickerConfig"
        :key="label"
        :class="{ active: label === rangePickerActiveItem }"
        class="rangeDate-picker-item"
        @click="fnRangePicker(label)"
      >
        {{ label }}
      </div>
    </div>

    <div class="search-action-container">
      <a-input
        class="search-input"
        :value="props.searchValue"
        placeholder="機台"
        @change="updateSearchValue"
        @pressEnter="onSearch"
      >
        <template #prefix>
          <BaseSvgIcon iconName="magnifier" />
        </template>
      </a-input>
    </div>

    <div class="select-container">
      <a-select
        class="select-item group-container"
        placeholder="群組"
        :suffixIcon="customIcon('group')"
        size="large"
        @dropdownVisibleChange="(visible: boolean) => handleDropdownVisibleChange(visible, 'group')"
      >
        <a-select-option
          v-for="groupsDDL in groupsDDLList.data"
          :key="groupsDDL.groupId"
          :value="groupsDDL.groupName"
          >{{ groupsDDL.groupName }}</a-select-option
        >
      </a-select>
      <a-select
        class="select-item merchandise-container"
        placeholder="商品"
        :suffixIcon="customIcon('merchandise')"
        size="large"
        @dropdownVisibleChange="
          (visible: boolean) => handleDropdownVisibleChange(visible, 'merchandise')
        "
      >
        <a-select-option
          v-for="goods in goodsList.data"
          :key="goods.goodsId"
          :value="goods.goodsName"
          >{{ goods.goodsName }}</a-select-option
        >
      </a-select>
    </div>
    <template #footer>
      <div class="button-group">
        <a-button
          class="confirm-btn btn"
          type="primary"
          @click="fnFilterDashboardData"
        >
          確認
        </a-button>
        <a-button
          class="cancel-btn btn"
          type="outlined"
          @click="closeModal"
        >
          取消
        </a-button>
      </div>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.search-action-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  .search-action-title {
    color: $--color-gray-700;
  }
  .search-input {
    &.ant-input-affix-wrapper {
      background-color: $--background-color-base;

      :deep(.ant-input) {
        background-color: $--background-color-base;
      }
    }
  }
}

.datePicker-container {
  display: flex;
  align-items: center;
  padding: 16px 0;
  .datePicker {
    flex: 1;
    position: relative;
    height: 52px;
    border: 1px solid $--color-border;
    &.startDate-container {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }
    &.endDate-container {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
  .multi-datePicker-container {
    position: relative;
    margin-left: 12px;
    cursor: pointer;
    .rangeDate-icon {
      pointer-events: initial;
    }
  }
  .dateData {
    position: relative;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
    user-select: none;
    color: $--color-border;
    line-height: 1.25rem;
    overflow: hidden;
    .date {
      min-height: 20px;
      font-size: 1rem;
      color: $--color-primary;
    }
    &-item {
      pointer-events: none;
      position: relative;
      left: 30px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.quasar-custom-container {
  position: absolute;
  z-index: 10;
  top: 100%;
  &.start {
    left: 0;
  }
  &.end,
  &.range {
    right: 0;
  }
}

/* 添加过渡效果的样式 */
:deep(.fade-enter-active),
:deep(.fade-leave-active) {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

:deep(.fade-enter-from),
:deep(.fade-leave-to) {
  opacity: 0;
  transform: scale(0.95);
}

:deep(.fade-enter-to),
:deep(.fade-leave-from) {
  opacity: 1;
  transform: scale(1);
}

.rangeDate-picker {
  display: flex;
  width: 100%;
  margin-bottom: 1.5rem;
  &-item {
    flex: 1;
    text-align: center;
    color: $--color-primary;
    border: 1px solid $--color-primary;
    background: $--color-white;
    padding: 4px 0;
    user-select: none;
    cursor: pointer;
    &:first-of-type {
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    &:last-of-type {
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
    }
    &:hover,
    &.active {
      color: $--color-white;
      background: $--color-primary;
    }
  }
}

.range-button-container {
  .btn {
    width: 100%;
    padding: 0.5rem 0.75rem;
  }
}

.batch-modal {
  .button-group {
    display: flex;
    .btn {
      flex: 1;
    }
  }
}

.select-container {
  display: flex;
  column-gap: 8px;
  padding: 1.75rem 0;
  .select-item {
    flex: 1;
  }
}

.rotate-up {
  transition: transform 0.3s ease;
  transform: rotate(180deg); /* 旋轉 180 度 */
}
</style>
