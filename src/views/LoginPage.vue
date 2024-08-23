<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import {
  createLoginFormConfig,
  createForgotPasswordModalConfig,
  formValidateMsgsConfig
} from '@/constants/configs/login.config'
import { useModal } from '@/composables/useModal'

const { showModal, openModal, closeModal } = useModal()

type TabKey = 'login' | 'register'

const { t: $t } = useI18n()

const activeKey = ref<TabKey>('login')
const loginFormModel = ref({
  userAccount: '',
  password: '',
  rememberMe: false
})
const registerFormModel = ref({
  userAccount: ''
})

const loginForm = Form.useForm(loginFormModel.value)
const registerForm = Form.useForm(registerFormModel.value)
const loginFormConfig = createLoginFormConfig($t)
const forgotPasswordModalConfig = createForgotPasswordModalConfig($t)

const showForgotPasswordModal = ref(false)

// Modal handlers
const openForgotPasswordModal = () => {
  showForgotPasswordModal.value = true
}

const closeForgotPasswordModal = () => {
  showForgotPasswordModal.value = false
}

// TODO: type 修正
const onLoginFinish = (values: any) => {
  console.log('登入資料:', values)
  // 在這裡處理登入邏輯
}

// TODO: type 修正
const onRegisterFinish = (values: any) => {
  console.log('註冊資料:', values)
  // 在這裡處理註冊邏輯
}
</script>

<template>
  <div class="login-page">
    <div class="login-register-container">
      <a-card class="login-register-card">
        <a-tabs v-model:activeKey="activeKey" centered size="large">
          <!-- Login -->
          <a-tab-pane key="login" :tab="$t('LoginPage.Login.TabLabel')">
            <p class="text-message">{{ $t('LoginPage.Login.TextMessage') }}</p>
            <a-form
              :model="loginFormModel"
              :name="'login_form'"
              :layout="'vertical'"
              :form="loginForm"
              :validate-messages="formValidateMsgsConfig"
              @finish="onLoginFinish"
            >
              <a-form-item
                :name="loginFormConfig.userAccount.name"
                :label="$t('LoginPage.Login.UserAccount')"
                :rules="loginFormConfig.userAccount.rules"
              >
                <a-input
                  class="base-input"
                  :placeholder="loginFormConfig.userAccount.placeholder"
                  v-model:value="loginFormModel.userAccount"
                />
              </a-form-item>

              <a-form-item
                :name="loginFormConfig.password.name"
                :label="$t('LoginPage.Login.Password')"
                :rules="loginFormConfig.password.rules"
              >
                <a-input-password
                  class="base-input"
                  autocomplete="current-password"
                  :placeholder="loginFormConfig.password.placeholder"
                  v-model:value="loginFormModel.password"
                />
              </a-form-item>

              <div class="actions-container">
                <a-checkbox v-model:checked="loginFormModel.rememberMe">
                  {{ $t('LoginPage.Login.RememberMe') }}
                </a-checkbox>

                <span class="forgot-password" @click="openModal">忘記密碼</span>
              </div>

              <a-form-item>
                <a-button class="login-btn" type="primary" html-type="submit">
                  {{ $t('LoginPage.Login.Submit') }}
                </a-button>
              </a-form-item>
            </a-form>

            <div class="other-message">
              <span class="other-message-text">{{ $t('LoginPage.Login.OtherMessage') }}</span>
            </div>

            <a-button class="google-btn" type="primary"> Google </a-button>
          </a-tab-pane>

          <!-- Register -->
          <a-tab-pane key="register" :tab="$t('LoginPage.Register.TabLabel')">
            <p class="text-message">{{ $t('LoginPage.Register.TextMessage') }}</p>
            <a-form
              :model="registerFormModel"
              :name="'register_form'"
              :layout="'vertical'"
              :form="registerForm"
              @finish="onRegisterFinish"
            >
              <a-form-item
                :name="loginFormConfig.userAccount.name"
                :label="$t('LoginPage.Register.UserAccount')"
              >
                <a-input-group compact>
                  <a-input
                    v-model:value="registerFormModel.userAccount"
                    :placeholder="loginFormConfig.userAccount.placeholder"
                    class="validate-input"
                  />
                  <a-button type="primary" class="validate-btn">
                    {{ $t('LoginPage.Register.Validate') }}
                  </a-button>
                </a-input-group>
              </a-form-item>

              <a-form-item>
                <a-button class="register-btn" type="primary" html-type="submit">
                  {{ $t('LoginPage.Register.Submit') }}
                </a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </div>

    <!-- Forgot Password Modal -->
    <a-modal
      class="forgot-password-modal"
      v-model:visible="showModal"
      :title="forgotPasswordModalConfig.title"
      @cancel="closeModal"
    >
      <a-form :layout="'vertical'">
        <a-form-item :label="$t('LoginPage.ForgotPassword.UserAccount')">
          <a-input :placeholder="$t('LoginPage.ForgotPassword.UserAccount')" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  position: relative;
}
.login-register-container {
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);

  width: 90%;
  max-width: 400px;
}

.ant-card {
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
}

.base-input {
  padding-block: 0.5rem;
}

.login-btn,
.register-btn,
.google-btn {
  width: 100%;
  padding-block: 0.75rem;
  height: auto;
}

.validate-input {
  width: 70%;
}
.validate-btn {
  width: 30%;
  height: 100%;
}

.text-message {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: $--color-gray-600;
}

.actions-container {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  .forgot-password {
    color: $--color-gray-600;
    transition: all 0.2s ease-in-out;

    &:hover {
      color: $--color-gray-900;
      cursor: pointer;
    }
  }
}

.other-message {
  position: relative;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 0.75rem;
  color: $--color-gray-600;
}

.other-message-text {
  position: relative;
  padding-inline: 0.5rem;

  &:before {
    position: absolute;
    top: 50%;
    left: 100%;
    content: '';
    display: block;
    width: calc(100% - 1.5rem);
    height: 1px;
    background-color: $--color-gray-500;
  }
  &:after {
    position: absolute;
    top: 50%;
    right: 100%;
    content: '';
    display: block;
    width: calc(100% - 1.5rem);
    height: 1px;
    background-color: $--color-gray-500;
  }
}

:global(.forgot-password-modal) {
  top: 200px;
}
</style>
