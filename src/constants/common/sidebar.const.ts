import { getI18nTranslate } from '@/utils/i18nUtils'

// sidebar的項目
export const navigationList = [
  {
    label: getI18nTranslate('Common.Sidebar.Home'),
    name: 'Home',
    'header-title': '',
    iconName: 'home'
  },
  {
    label: getI18nTranslate('Common.Sidebar.Profile'),
    name: 'Profile',
    'header-title': '個人資料',
    iconName: 'profile'
  },
  {
    label: getI18nTranslate('Common.Sidebar.Member'),
    name: 'Member',
    'header-title': '成員管理',
    iconName: 'group-members'
  },
  {
    label: getI18nTranslate('Common.Sidebar.GroupEdit'),
    name: 'GroupEdit',
    'header-title': '編輯自訂分類',
    iconName: 'custom-category'
  },
  {
    label: getI18nTranslate('Common.Sidebar.Product'),
    name: 'Product',
    'header-title': '商品列表',
    iconName: 'product'
  }
]
