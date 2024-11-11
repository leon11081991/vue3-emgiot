import { type ApiResponse, ApiFactory } from '@/utils/api'
import { SignUpEnum } from '@/constants/enums/api/auth.enums'
import { UserEnum } from '@/constants/enums/api/user.enums'

export class UserServices extends ApiFactory {
  constructor() {
    super('')
  }

  /** 取得使用者資訊 */
  getUserInfo = async () => {
    return await this.get<unknown, ApiResponse>(UserEnum.userInfo)
  }

  /** 變更使用者資訊 */
  updateUserInfo = async (newUserName: string) => {
    return await this.put<string, ApiResponse>(UserEnum.userInfo, newUserName)
  }
}
