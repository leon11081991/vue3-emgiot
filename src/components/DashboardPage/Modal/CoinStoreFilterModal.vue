<script setup lang="ts">
/* import */
import type {
  RefreshCoinDashboardType,
  SelectedGroupAndGoodsRemoveType
} from '@/models/types/dashboard.types'
import { useI18n } from 'vue-i18n'
import { ref, computed, onMounted, onBeforeUnmount, h, watchEffect } from 'vue'
import { CaretDownOutlined } from '@ant-design/icons-vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { useDropdown } from '@/composables/useDropdown'
import { QDate } from 'quasar'
import { useDate } from '@/composables/useDate'

import '@/assets/scss/quasar.scss'
import '@quasar/extras/material-icons/material-icons.css'

/* type */
type PickerType = 'start' | 'end' | 'range'
type SelectType = 'group'
type DatePickerKeysType = (typeof DatePickerKeys)[keyof typeof DatePickerKeys]

/* Props (defineProps) */
const props = defineProps<{
  modalVisible: boolean
  resetAll: number
  removeSelected: SelectedGroupAndGoodsRemoveType
}>()

/* Emits Events (defineEmits) */
const emit = defineEmits<{
  (e: 'close'): void
  (e: 'refresh:coinStoreDashboard', value: RefreshCoinDashboardType): void
}>()

/* i18n */
const { t: $t } = useI18n()

/* 非響應式變數 */
const { today, formatDate, calculateDate, getDaysInTwoMonths, getThreeMonthsAgo } = useDate()
const { groupsDDLList, fetchGroupsDDLList } = useDropdown()

const DAYS_IN_WEEK = 7
const TODAY = 1
const DatePickerKeys = {
  Today: $t('DashboardPage.Modal.CoinStoreFilter.DatePicker.Today'),
  TwoDays: $t('DashboardPage.Modal.CoinStoreFilter.DatePicker.TwoDays'),
  ThreeDays: $t('DashboardPage.Modal.CoinStoreFilter.DatePicker.ThreeDays'),
  OneWeek: $t('DashboardPage.Modal.CoinStoreFilter.DatePicker.OneWeek'),
  OneMonth: $t('DashboardPage.Modal.CoinStoreFilter.DatePicker.OneMonth')
} as const
const dateRangePickerConfig: Record<DatePickerKeysType, number> = {
  [DatePickerKeys.Today]: TODAY,
  [DatePickerKeys.TwoDays]: 2,
  [DatePickerKeys.ThreeDays]: 3,
  [DatePickerKeys.OneWeek]: DAYS_IN_WEEK,
  [DatePickerKeys.OneMonth]: getDaysInTwoMonths()
}
const groupDefaultName = $t('DashboardPage.Modal.CoinStoreFilter.DropDown.GroupDefaultName')
let resetGroupNameCount = 0
let resetGroupsDDLFilter = 0

/* ref 變數 */
const startDate = ref<string | null>(today())
const endDate = ref<string | null>(today())
const rangeDate = ref<{ from: string; to: string } | string>({ from: '', to: '' })
const tempRangeDate = ref({ from: '', to: '' })
const rangePickerActiveItem = ref($t('DashboardPage.Modal.CoinStoreFilter.DatePicker.Today'))

const groupsDDLFilter = ref('')
const groupName = ref(groupDefaultName)
const picker = ref({
  start: false,
  end: false,
  range: false
})

const isFirstTimeSelectRangePicker = ref(false)
const isConfirmFilterCondition = ref(false)

const isDropdownOpen = ref({
  group: false
})

/* computed */
// 動態根據下拉選單狀態更改圖標
const customIcon = (selectType: SelectType) => {
  return h(CaretDownOutlined, {
    class: isDropdownOpen.value[selectType] ? 'rotate-up' : ''
  })
}

const isRangeDateSelected = computed(() =>
  typeof rangeDate.value === 'object'
    ? rangeDate.value?.from || rangeDate.value?.to
    : rangeDate.value
)

const selectedGroupId = computed(() => {
  if (groupsDDLList?.value.data && groupName.value && groupName.value !== groupDefaultName) {
    const group = groupsDDLList.value.data.find((item) => item.groupName === groupName.value)
    return group ? group.groupId : ''
  }
  return ''
})

/* function */
const optionsConfig = (date: string) => {
  const current = new Date(date)
  return current >= new Date(getThreeMonthsAgo()) && current <= new Date(today())
}

const optionsConfigStart = (date: string) => {
  const current = new Date(date)
  return current >= new Date(getThreeMonthsAgo()) && current <= new Date(today())
}

const optionsConfigEnd = (date: string) => {
  const current = new Date(formatDate(date, 'YYYY-MM-DD'))
  if (startDate.value) {
    return (
      current >= new Date(getThreeMonthsAgo()) &&
      current <= new Date(today()) &&
      current >= new Date(startDate.value)
    )
  }
  return current >= new Date(getThreeMonthsAgo()) && current <= new Date(today())
}

const resetFilter = () => {
  startDate.value = today()
  endDate.value = today()
  groupsDDLFilter.value = ''
  groupName.value = groupDefaultName
  isFirstTimeSelectRangePicker.value = false
}

const closeModal = () => {
  if (!isConfirmFilterCondition.value) {
    resetFilter()
  }
  emit('close')
}

const filterCoinDashboardData = () => {
  isConfirmFilterCondition.value = true
  emit('refresh:coinStoreDashboard', {
    startDate: startDate.value || '',
    endDate: endDate.value || '',
    groupsDDLFilter: groupsDDLFilter.value || '',
    groupName: groupName.value === groupDefaultName ? '' : groupName.value || '',
    pcbGroupId: selectedGroupId.value || ''
  })
  closeModal()
}

const updateRangeDate = () => {
  if (typeof rangeDate.value === 'object') {
    if (rangeDate.value.from && startDate.value) rangeDate.value.from = startDate.value
    if (rangeDate.value.to && endDate.value) rangeDate.value.to = endDate.value
  } else if (typeof rangeDate.value === 'string' && startDate.value === endDate.value) {
    rangeDate.value = startDate.value || endDate.value || ''
  }
}

const toggleDatePicker = (type: PickerType) => {
  const pickerKeys = Object.keys(picker.value) as Array<keyof typeof picker.value>
  pickerKeys.forEach((key) => {
    if (key !== type) picker.value[key] = false
  })
  updateRangeDate()
  picker.value[type] = !picker.value[type]
}

const setRangePicker = (label: keyof typeof dateRangePickerConfig) => {
  rangePickerActiveItem.value = label
  if (label === $t('DashboardPage.Modal.CoinStoreFilter.DatePicker.Today')) {
    endDate.value = today()
  }
  if (endDate.value) {
    startDate.value = calculateDate(endDate.value, 'backward', dateRangePickerConfig[label])
  }
}

const keepTempRangeDate = () => {
  if (!isFirstTimeSelectRangePicker.value) isFirstTimeSelectRangePicker.value = true
  if (typeof rangeDate.value === 'object' && rangeDate.value?.from && rangeDate.value?.to) {
    tempRangeDate.value.from = rangeDate.value?.from
    tempRangeDate.value.to = rangeDate.value?.to
  } else if (typeof rangeDate.value === 'string' && rangeDate.value) {
    tempRangeDate.value.from = rangeDate.value
    tempRangeDate.value.to = rangeDate.value
  }
}

const confirmRangeDate = () => {
  if (tempRangeDate.value?.from && tempRangeDate.value?.to) {
    startDate.value = tempRangeDate.value?.from
    endDate.value = tempRangeDate.value?.to
    tempRangeDate.value.from = ''
    tempRangeDate.value.to = ''
  }
  toggleDatePicker('range')
}

const toggleDropdownVisibility = (visible: boolean, selectType: 'group') => {
  isDropdownOpen.value[selectType] = visible
}

const handleInputChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  groupsDDLFilter.value = target.value
}

const selectGroup = (data: string) => {
  groupName.value = data
}

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

/* watch */
watchEffect(() => {
  if (props.resetAll) {
    isConfirmFilterCondition.value = false
    resetFilter()
  }

  if (
    props.removeSelected['groupName'] &&
    props.removeSelected['groupName'] !== resetGroupNameCount
  ) {
    groupName.value = groupDefaultName
    resetGroupNameCount++
  }
  if (
    props.removeSelected['groupsDDLFilter'] &&
    props.removeSelected['groupsDDLFilter'] !== resetGroupsDDLFilter
  ) {
    groupsDDLFilter.value = ''
    resetGroupsDDLFilter++
  }
})

/* 生命週期 (Lifecycle hooks) */
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})

fetchGroupsDDLList()
</script>

<template>
  <a-modal
    :open="props.modalVisible"
    class="batch-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ $t('DashboardPage.Modal.CoinStoreFilter.Title') }}</span>
      </div>
    </template>

    <!-- 日期選擇器 -->
    <div class="datePicker-container">
      <div class="datePicker startDate-container">
        <div class="quasar-custom-container start">
          <transition name="fade">
            <q-date
              v-show="picker.start"
              :options="optionsConfigStart"
              mask="YYYY-MM-DD"
              class="datePickerCom startDateCom"
              v-model="startDate"
              @update:modelValue="() => toggleDatePicker('start')"
              minimal
              persistent
            />
          </transition>
        </div>
        <div
          class="dateData"
          @click.stop="toggleDatePicker('start')"
        >
          <div class="dateData-item">
            {{ $t('DashboardPage.Modal.CoinStoreFilter.Item.Start') }}
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
              :options="optionsConfigEnd"
              mask="YYYY-MM-DD"
              class="datePickerCom endDateCom"
              v-model="endDate"
              @update:modelValue="() => toggleDatePicker('end')"
              minimal
              persistent
            />
          </transition>
        </div>
        <div
          class="dateData"
          @click.stop="toggleDatePicker('end')"
        >
          <div class="dateData-item">
            {{ $t('DashboardPage.Modal.CoinStoreFilter.Item.End') }}
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
          @click.stop="toggleDatePicker('range')"
        />
        <div class="quasar-custom-container range">
          <transition name="fade">
            <q-date
              v-show="picker.range"
              :options="optionsConfig"
              mask="YYYY-MM-DD"
              class="rangeDate"
              v-model="rangeDate"
              @update:modelValue="keepTempRangeDate"
              range
              minimal
              persistent
            >
              <template #default>
                <div class="range-button-container">
                  <a-button
                    class="confirm-btn btn"
                    type="primary"
                    v-if="isRangeDateSelected && isFirstTimeSelectRangePicker"
                    @click="confirmRangeDate"
                  >
                    {{ $t('DashboardPage.Modal.CoinStoreFilter.Button.Confirm') }}
                  </a-button>
                  <a-button
                    v-else
                    class="cancel-btn btn"
                    type="outlined"
                    @click="toggleDatePicker('range')"
                  >
                    {{ $t('DashboardPage.Modal.CoinStoreFilter.Button.Cancel') }}
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
        @click="setRangePicker(label)"
      >
        {{ label }}
      </div>
    </div>

    <div class="search-action-container">
      <a-input
        class="search-input"
        :value="groupsDDLFilter"
        @change="handleInputChange"
        :placeholder="$t('DashboardPage.Modal.CoinStoreFilter.Placeholder.Search')"
      >
        <template #prefix>
          <BaseSvgIcon iconName="magnifier" />
        </template>
      </a-input>
    </div>

    <div class="select-container">
      <a-select
        v-if="groupsDDLList?.data"
        class="select-item group-container"
        :placeholder="groupDefaultName"
        :value="groupName"
        :suffixIcon="customIcon('group')"
        size="large"
        @change="selectGroup"
        @dropdownVisibleChange="(visible: boolean) => toggleDropdownVisibility(visible, 'group')"
      >
        <a-select-option
          v-for="groupsDDL in groupsDDLList.data"
          :key="groupsDDL.groupId"
          :value="groupsDDL.groupName"
        >
          {{ groupsDDL.groupName }}
        </a-select-option>
      </a-select>
    </div>
    <template #footer>
      <div class="button-group">
        <a-button
          class="confirm-btn btn"
          type="primary"
          @click="filterCoinDashboardData"
        >
          {{ $t('DashboardPage.Modal.CoinStoreFilter.Button.Confirm') }}
        </a-button>
        <a-button
          class="cancel-btn btn"
          type="outlined"
          @click="closeModal"
        >
          {{ $t('DashboardPage.Modal.CoinStoreFilter.Button.Cancel') }}
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
    ::v-deep(.ant-select-selection-item) {
      color: $--color-primary;
    }
    ::v-deep(.ant-select-arrow) {
      color: $--color-primary;
    }
  }
}

.rotate-up {
  transition: transform 0.3s ease;
  transform: rotate(180deg); /* 旋轉 180 度 */
}
</style>
