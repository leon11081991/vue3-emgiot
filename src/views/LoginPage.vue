<script setup lang="ts">
import type {
  LoginDataType,
  SignUpDataType,
  ForgotPasswordReqType
} from '@/models/types/auth.types'
import { ValidationTypeEnums } from '@/constants/enums/validator.enums'
import { onMounted, ref } from 'vue'
import { Form } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { loginPageTabBarStyleConfig } from '@/constants/configs/login.config'
import { useAuth } from '@/composables/useAuth'
import { useModal } from '@/composables/useModal'
import { useValidator } from '@/composables/useValidator'
import { UtilCommon } from '@/utils/utilCommon'

type TabKey = 'login' | 'register'
type ButtonFieldType = 'login' | 'register' | 'forgotPassword'

const { t: $t } = useI18n()
const { loadLoginInfo, fnLogin, fnSignUp, fnForgotPassword } = useAuth()
const { modalVisible, openModal, closeModal } = useModal()
const { validateErrorMessage, validate, validateConfirmPassword } = useValidator()

// constants
const maxLength = 10

// refs
const isButtonLoading = ref<Record<ButtonFieldType, boolean>>({
  login: false,
  register: false,
  forgotPassword: false
})
const isSentValidationCode = ref<boolean>(false)
const activeKey = ref<TabKey>('login')
const loginFormModel = ref<LoginDataType>({
  userId: '',
  password: '',
  rememberMe: false
})
const registerFormModel = ref<SignUpDataType>({
  userId: '',
  password: '',
  confirmPassword: '',
  realName: ''
})
const forgotPasswordFormModel = ref<ForgotPasswordReqType>({
  userId: ''
})

const loginForm = Form.useForm(loginFormModel.value)
const registerForm = Form.useForm(registerFormModel.value)
const forgotPasswordForm = Form.useForm(forgotPasswordFormModel.value)

// functions
const toggleTab = (key: TabKey) => {
  activeKey.value = key
}

// 表單輸入項驗證
const validateFormItem = (
  type: keyof typeof ValidationTypeEnums,
  value: string
): (() => Promise<void>) => {
  return () => {
    // 驗證是否必填項為填入
    if (UtilCommon.checkIsEmpty(value)) {
      return Promise.reject('必填')
    }
    // 驗證規則是否通過
    const isValid = validate(ValidationTypeEnums[type], value)
    if (!isValid) {
      return Promise.reject(validateErrorMessage.value)
    }

    return Promise.resolve()
  }
}

// 輸入值驗證
const validateValue = (type: keyof typeof ValidationTypeEnums, value: string): boolean => {
  // 驗證是否必填項為填入
  if (UtilCommon.checkIsEmpty(value)) {
    return false
  }

  // 驗證規則是否通過
  const isValid = validate(ValidationTypeEnums[type], value)
  if (!isValid) {
    return false
  }

  return true
}

const checkRegisterButtonDisabled = (): boolean => {
  const { userId, password, confirmPassword, realName } = registerFormModel.value

  return !(
    userId.trim().length > 0 &&
    password.trim().length > 0 &&
    confirmPassword.trim().length > 0 &&
    realName.trim().length > 0
  )
}

const onLoginFinish = (values: LoginDataType) => {
  isButtonLoading.value.login = true
  fnLogin(
    {
      userId: values.userId,
      password: values.password
    },
    values.rememberMe
  ).finally(() => {
    isButtonLoading.value.login = false
  })
}

const onRegisterFinish = (values: SignUpDataType) => {
  isButtonLoading.value.register = true
  fnSignUp(values)
    .then((res) => {
      if (!res) return
      isSentValidationCode.value = true
    })
    .finally(() => {
      isButtonLoading.value.register = false
    })
}

const onForgotPasswordFinish = (values: ForgotPasswordReqType) => {
  isButtonLoading.value.forgotPassword = true
  fnForgotPassword(values)
    .then((res) => {
      if (!res) return
      closeModal()
    })
    .finally(() => {
      isButtonLoading.value.forgotPassword = false
    })
}

// lifecycle hooks
onMounted(() => {
  const rememberMeData = loadLoginInfo()
  if (!rememberMeData) return
  loginFormModel.value = rememberMeData
})
</script>

<template>
  <div class="login-page">
    <div
      class="login-register-container"
      :class="{ 'is-sent-validation': isSentValidationCode }"
    >
      <a-tabs
        class="tabs-container"
        v-model:activeKey="activeKey"
        :tabBarStyle="loginPageTabBarStyleConfig"
      >
        <!-- Login -->
        <a-tab-pane
          class="login-tab-field"
          key="login"
        >
          <h2 class="tab-label">{{ $t('LoginPage.Login.TabLabel') }}</h2>
          <p class="text-message">{{ $t('LoginPage.Login.TextMessage') }}</p>

          <!-- Login Form -->
          <a-form
            class="login-form"
            name="login_form"
            layout="vertical"
            :model="loginFormModel"
            :form="loginForm"
            @finish="onLoginFinish"
          >
            <!-- Email -->
            <a-form-item
              name="userId"
              validateTrigger="blur"
              :rules="[
                { required: true, message: '' },
                { validator: validateFormItem('Email', loginFormModel.userId) }
              ]"
            >
              <div class="input-container userId-input">
                <a-input
                  class="base-input"
                  :placeholder="$t('LoginPage.Login.UserId')"
                  v-model:value="loginFormModel.userId"
                >
                  <template #prefix>
                    <BaseSvgIcon iconName="mail" />
                  </template>
                </a-input>
              </div>
            </a-form-item>

            <!-- Password -->
            <a-form-item
              name="password"
              validateTrigger="blur"
              :rules="[
                { required: true, message: '' },
                { validator: validateFormItem('Password', loginFormModel.password) }
              ]"
            >
              <a-input-password
                class="base-input"
                autocomplete="current-password"
                :placeholder="$t('LoginPage.Login.Password')"
                v-model:value="loginFormModel.password"
              >
                <template #prefix>
                  <BaseSvgIcon iconName="lock" />
                </template>

                <template #iconRender="x">
                  <div
                    class="password-visible"
                    v-if="x"
                  >
                    <BaseSvgIcon iconName="eye-off" />
                  </div>
                  <div
                    class="password-invisible"
                    v-else
                  >
                    <BaseSvgIcon iconName="eye-on" />
                  </div>
                </template>
              </a-input-password>
            </a-form-item>

            <div class="actions-container">
              <!-- Remember Me -->
              <a-form-item
                name="rememberMe"
                class="remember-me-container"
              >
                <a-checkbox
                  class="remember-me"
                  v-model:checked="loginFormModel.rememberMe"
                >
                  {{ $t('LoginPage.Login.RememberMe') }}
                </a-checkbox>
              </a-form-item>
              <!-- Forgot Password -->
              <span
                class="forgot-password"
                @click="openModal()"
              >
                {{ $t('LoginPage.Login.ForgotPassword') }}</span
              >
            </div>

            <a-form-item>
              <a-button
                class="login-btn"
                type="primary"
                html-type="submit"
                :loading="isButtonLoading.login"
              >
                {{ $t('LoginPage.Login.Submit') }}
              </a-button>
            </a-form-item>
          </a-form>

          <div class="other-message">
            <span class="other-message-text">{{ $t('LoginPage.OtherText.UseOtherMethods') }}</span>
          </div>

          <!-- Third Party Login -->
          <div class="third-party-login-container">
            <a-button
              class="third-party-btn"
              type="third-party"
            >
              <template #icon>
                <BaseSvgIcon
                  iconName="logo-google"
                  size="lg"
                />
              </template>
              <span class="text">使用 Google 登入</span>
            </a-button>
            <a-button
              class="third-party-btn"
              type="third-party"
            >
              <template #icon>
                <BaseSvgIcon
                  iconName="logo-apple"
                  size="lg"
                />
              </template>
              <span class="text">使用 Apple 登入</span>
            </a-button>
          </div>

          <div class="to-register">
            <span>{{ $t('LoginPage.OtherText.HasNoAccount') }}</span>
            <span
              class="to-register-btn"
              @click="toggleTab('register')"
              >{{ $t('LoginPage.OtherText.ToggleToRegister') }}</span
            >
          </div>
        </a-tab-pane>

        <!-- Register -->
        <a-tab-pane
          class="register-tab-field"
          key="register"
        >
          <h2 class="tab-label">{{ $t('LoginPage.Register.TabLabel') }}</h2>
          <p class="text-message">{{ $t('LoginPage.Register.TextMessage') }}</p>
          <a-form
            class="register-form"
            name="register_form"
            layout="vertical"
            :form="registerForm"
            :model="registerFormModel"
            @finish="onRegisterFinish"
          >
            <a-form-item
              name="userId"
              validateTrigger="blur"
              :rules="[
                { required: true, message: '' },
                { validator: validateFormItem('Email', registerFormModel.userId) }
              ]"
            >
              <a-input-group>
                <div class="input-container validate-input">
                  <a-input
                    class="base-input"
                    :placeholder="$t('LoginPage.Register.UserId')"
                    v-model:value="registerFormModel.userId"
                  >
                    <template #prefix>
                      <BaseSvgIcon iconName="mail" />
                    </template>
                  </a-input>
                </div>
              </a-input-group>
            </a-form-item>

            <a-form-item
              name="password"
              validateTrigger="blur"
              :rules="[
                { required: true, message: '' },
                { validator: validateFormItem('Password', registerFormModel.password) }
              ]"
            >
              <a-input-password
                class="base-input"
                autocomplete="current-password"
                :placeholder="$t('SignUpPage.SignUp.Password')"
                v-model:value="registerFormModel.password"
              >
                <template #prefix>
                  <BaseSvgIcon iconName="lock" />
                </template>

                <template #iconRender="x">
                  <div
                    class="password-visible"
                    v-if="x"
                  >
                    <BaseSvgIcon iconName="eye-off" />
                  </div>
                  <div
                    class="password-invisible"
                    v-else
                  >
                    <BaseSvgIcon iconName="eye-on" />
                  </div>
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item
              name="confirmPassword"
              validateTrigger="blur"
              :validate-status="validateErrorMessage ? 'error' : ''"
              :help="validateErrorMessage"
              :rules="[{ required: true, message: '' }]"
            >
              <a-input-password
                class="base-input"
                autocomplete="none"
                :placeholder="$t('SignUpPage.SignUp.VerifyPassword')"
                v-model:value="registerFormModel.confirmPassword"
                @blur="
                  validateErrorMessage = validateConfirmPassword(
                    registerFormModel.confirmPassword,
                    registerFormModel.password
                  )
                "
              >
                <template #prefix>
                  <BaseSvgIcon iconName="lock" />
                </template>

                <template #iconRender="x">
                  <div
                    class="password-visible"
                    v-if="x"
                  >
                    <BaseSvgIcon iconName="eye-off" />
                  </div>
                  <div
                    class="password-invisible"
                    v-else
                  >
                    <BaseSvgIcon iconName="eye-on" />
                  </div>
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item
              name="realName"
              validateTrigger="blur"
              :rules="[{ required: true, message: $t('LoginPage.ValidateMessage.Required') }]"
            >
              <div class="input-container userInfo-input">
                <a-input
                  class="base-input"
                  :placeholder="$t('SignUpPage.SignUp.UserInfo')"
                  :maxLength="maxLength"
                  v-model:value="registerFormModel.realName"
                >
                  <template #prefix>
                    <BaseSvgIcon iconName="profile" />
                  </template>
                </a-input>
              </div>
            </a-form-item>

            <a-form-item>
              <a-button
                class="register-btn"
                type="primary"
                :disabled="checkRegisterButtonDisabled()"
                html-type="submit"
                :loading="isButtonLoading.register"
              >
                {{ $t('LoginPage.Register.Submit') }}
              </a-button>
            </a-form-item>

            <div class="to-login">
              <span>{{ $t('LoginPage.OtherText.AlreadyHasAccount') }}</span>
              <span
                class="to-login-btn"
                @click="toggleTab('login')"
                >{{ $t('LoginPage.OtherText.ToggleToLogin') }}</span
              >
            </div>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>

    <!-- Forgot Password Modal -->
    <a-modal
      class="forgot-password-modal"
      v-model:open="modalVisible"
      :footer="null"
      @cancel="closeModal"
    >
      <template #title>
        <div class="modal-header modal-header-default">
          <span class="modal-title">{{ $t('LoginPage.ForgotPassword.Title') }}</span>
        </div>
      </template>

      <a-form
        class="forgot-password-form"
        name="forgot-password_form"
        layout="vertical"
        :model="forgotPasswordFormModel"
        :form="forgotPasswordForm"
        @finish="onForgotPasswordFinish"
      >
        <a-form-item
          name="userId"
          validateTrigger="blur"
          :rules="[
            { required: true, message: '' },
            { validator: validateFormItem('Email', forgotPasswordFormModel.userId) }
          ]"
        >
          <div class="input-container email-input">
            <a-input
              class="base-input"
              :placeholder="$t('LoginPage.ForgotPassword.UserId')"
              v-model:value="forgotPasswordFormModel.userId"
            >
              <template #prefix>
                <BaseSvgIcon iconName="mail" />
              </template>
            </a-input>
          </div>
        </a-form-item>

        <a-form-item>
          <a-button
            :disabled="!validateValue('Email', forgotPasswordFormModel.userId)"
            class="forgot-password-btn"
            type="primary"
            size="large"
            html-type="submit"
            :loading="isButtonLoading.forgotPassword"
          >
            {{ $t('LoginPage.ForgotPassword.Submit') }}
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  position: relative;
  display: flex;
  justify-content: center;
  min-height: calc(100dvh - $--page-padding-x - $--heading-font-size);
}
.login-register-container {
  width: 90%;
  max-width: 400px;

  @include media-breakpoint-down(sm) {
    top: $--login-top-mobile;
  }

  &.is-sent-validation {
    display: none;
  }

  .tabs-container {
    height: 100%;
    :deep(.ant-tabs-content) {
      height: 100%;
    }

    :deep(.ant-tabs-tabpane) {
      height: 100%;
    }
  }
}

.tab-label {
  text-align: center;
  font-size: $--heading-font-size;
  color: $--color-primary;

  @include media-breakpoint-down(sm) {
    font-size: $--heading-font-size-mobile;
  }
}

.base-input {
  padding-block: 0.5rem;
  background-color: $--background-color-base;

  :deep(.ant-input) {
    background-color: $--background-color-base;
    color: $--color-gray-600;
  }
}

.third-party-login-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.login-btn,
.register-btn,
.third-party-btn {
  width: 100%;
  height: auto;
}

.third-party-btn {
  :deep(.text) {
    flex: 1;
  }
}

.register-tab-field {
  .register-form {
    display: flex;
    flex-direction: column;
    height: calc(100% - $--heading-font-size - 22px - $--page-padding-top - $--page-padding-bottom);

    .ant-form-item {
      &:nth-of-type(1),
      &:nth-of-type(3) {
        margin-bottom: 2.5rem;
      }
      &:nth-of-type(4) {
        flex: 1;
      }
      &:nth-of-type(5) {
        margin-bottom: 0;
      }
    }
  }

  .validate-input {
    position: relative;

    :deep(.ant-input-affix-wrapper) {
      border-radius: $--border-radius-middle;
    }
  }
  .validate-btn {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    height: 80%;
    z-index: 1;
  }
}

.text-message {
  margin-bottom: 2rem;
  text-align: center;
  color: $--color-gray-600;
}

.actions-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;

  .remember-me-container {
    &.ant-form-item {
      margin-bottom: 0;
    }

    .remember-me {
      color: $--color-primary;
    }
  }

  .forgot-password {
    @include base-transition;
    display: flex;
    align-items: center;
    padding-inline: 0.75rem;
    color: $--color-primary;
    border: 1px solid $--color-gray-500;

    &:hover {
      color: $--color-primary--hover;
      cursor: pointer;
    }
  }
}

.other-message {
  position: relative;
  margin-block: 1rem;
  text-align: center;
  color: $--color-gray-600;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background-color: $--color-gray-600;
  }

  .other-message-text {
    position: relative;
    padding-inline: 0.5rem;
    background-color: $--background-color-base;
  }
}

.to-register,
.to-login {
  margin-top: 1.75rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  color: $--color-gray-600;

  .to-register-btn,
  .to-login-btn {
    cursor: pointer;
    color: $--color-primary;
    transition: all 0.2s ease-in-out;
    &:hover {
      color: $--color-primary--hover;
    }
  }
}

.forgot-password-modal {
  top: 200px;

  .forgot-password-btn {
    width: 100%;
  }
}
</style>
