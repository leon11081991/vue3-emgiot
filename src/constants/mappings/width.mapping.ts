import type { widthType } from '@/models/types/mapping.types'

// 裝置寬度對應
export const widthMapping: Record<widthType, number> = {
  xs: 375,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  '2xl': 1400,
  '3xl': 1600,
  '4xl': 1920,
  '5xl': 2560
}
