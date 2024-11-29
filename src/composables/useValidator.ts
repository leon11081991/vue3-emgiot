import { ref } from 'vue'
import { ValidationTypeEnums } from '@/constants/enums/validator.enums'
import { UtilCommon } from '@/utils/utilCommon'
import { useI18n } from 'vue-i18n'
import { getI18nTranslate } from '@/utils/i18nUtils'

/** 驗證格式規則 */
const validationRules = [
  {
    key: ValidationTypeEnums.Email,
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    errorMessage: getI18nTranslate('ErrorMessage.Validation.Email')
  },
  {
    key: ValidationTypeEnums.Password,
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/,
    errorMessage: getI18nTranslate('ErrorMessage.Validation.Password')
  },
  {
    key: ValidationTypeEnums.Phone,
    value: /^09\d{8}$/,
    errorMessage: getI18nTranslate('ErrorMessage.Validation.Phone')
  }
]

/** 驗證格式相關邏輯 */
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
      validateErrorMessage.value = $t('ErrorMessage.Validation.NotFound')
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
