import { getI18nTranslate } from '@/utils/i18nUtils'

// header的項目
export const headerTitleList = [
  {
    name: 'Home',
    'header-title': ''
  },
  {
    name: 'Profile',
    'header-title': getI18nTranslate('ProfilePage.HeaderTitle')
  },
  {
    name: 'Member',
    'header-title': getI18nTranslate('MemberPage.HeaderTitle')
  },
  {
    name: 'MemberInfo',
    'header-title': getI18nTranslate('MemberInfoPage.HeaderTitle')
  },
  {
    name: 'AddMember',
    'header-title': getI18nTranslate('AddMemberPage.HeaderTitle')
  },
  {
    name: 'InviteLink',
    'header-title': getI18nTranslate('InviteLinkPage.HeaderTitle')
  },
  {
    name: 'GroupEdit',
    'header-title': getI18nTranslate('GroupEditPage.HeaderTitle')
  },
  {
    name: 'Product',
    'header-title': getI18nTranslate('ProductPage.HeaderTitle')
  }
]
