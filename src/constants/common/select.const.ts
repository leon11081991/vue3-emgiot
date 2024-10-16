import type { SelectProps } from 'ant-design-vue'
import { ref } from 'vue'

export const levelOptions = ref<SelectProps['options']>([
  {
    id: 1,
    name: '1級'
  },
  {
    id: 2,
    name: '2級'
  },
  {
    id: 3,
    name: '3級'
  }
])
