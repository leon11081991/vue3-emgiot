import { TestService } from '@/services/test.services'
import { AuthServices } from '@/services/auth.services'
import { DashboardServices } from '@/services/dashboard.services'
import { StoreServices } from '@/services/store.services'
import { UserServices } from '@/services/user.services'
import { StoreMemberService } from '@/services/storeMember.services'
import { DropdownServices } from '@/services/dropdown.services'
import { GoodsServices } from '@/services/goods.services'
import { GroupServices } from '@/services/group.services'

const api = {
  test: new TestService(), // 測試範例
  auth: new AuthServices(), // 系統登入
  dashboard: new DashboardServices(), // 控制台
  store: new StoreServices(), // 商家
  user: new UserServices(), // 使用者
  storeMember: new StoreMemberService(), // 成員
  dropdown: new DropdownServices(), // 下拉選單
  goods: new GoodsServices(), // 商品
  group: new GroupServices() // 群組
}

export { api }
