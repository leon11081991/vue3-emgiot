import { ref } from 'vue'
import { ValidationTypeEnums } from '@/constants/enums/validator.enums'

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
  const validateErrorMessage = ref<string>('')

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

  return {
    validateErrorMessage,
    validate
  }
}
