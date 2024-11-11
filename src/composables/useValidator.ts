import { ref } from 'vue'
import { ValidationTypeEnums } from '@/constants/enums/validator.enums'
import { UtilCommon } from '@/utils/utilCommon'
import { useI18n } from 'vue-i18n'

/** 驗證格式規則 */
const validationRules = [
  {
    key: ValidationTypeEnums.Email,
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: '信箱格式不正確'
  },
  {
    key: ValidationTypeEnums.Password,
    value: /^[A-Za-z0-9]{6,}$/,
    errorMessage: '密碼需為6位以上字母或數字'
    // TODO: 正式需更換為下列規則
    // value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,16}$/,
    // errorMessage: '密碼需為8-16位英文數字混和密碼'
  },
  {
    key: ValidationTypeEnums.Phone,
    value: /^09\d{8}$/,
    errorMessage: '手機格式不正確'
  },
  {
    key: ValidationTypeEnums.Name,
    value: /^[\s\S]{2,16}$/,
    errorMessage: '請輸入2~16個字'
  },
  {
    key: ValidationTypeEnums.VerificationCode,
    value: /^[\s\S]+$/,
    errorMessage: '請輸入簡訊驗證碼'
  }
]

export type ValidatorReturnType = {
  success: boolean
  errorMessage: string
}

export const useValidator = () => {
  const { t: $t } = useI18n()

  const validateErrorMessage = ref<string | null>(null) // 驗證錯誤訊息

  /** 基本驗證格式 */
  const validate = (type: ValidationTypeEnums, value: string): boolean => {
    const rule = validationRules.find((item) => item.key === type)

    if (!rule) {
      validateErrorMessage.value = '找不到相應格式'
      return false
    }

    if (!rule.value.test(value) || value.trim() === '') {
      validateErrorMessage.value = rule.errorMessage
      return false
    }

    return true
  }

  /** 驗證確認密碼 */
  const validateConfirmPassword = (value: string, toCompareValue: string): string | null => {
    if (UtilCommon.checkIsEmpty(value)) {
      return $t('LoginPage.ValidateMessage.Required')
    }
    if (toCompareValue !== value) {
      return $t('LoginPage.ValidateMessage.ConfirmPasswordError')
    }
    return null
  }

  return {
    validateErrorMessage,
    validate,
    validateConfirmPassword
  }
}
