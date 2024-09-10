<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import {
  loginPageTabBarStyleConfig,
  createLoginFormConfig,
  createForgotPasswordModalConfig,
  formValidateMsgsConfig
} from '@/constants/configs/login.config'
import { useAuth } from '@/composables/useAuth'
import { useModal } from '@/composables/useModal'
type TabKey = 'login' | 'register'

const { modalVisible, openModal, closeModal } = useModal()
const { fnLogin } = useAuth()
const { t: $t } = useI18n()

const loginFormConfig = createLoginFormConfig($t)
const forgotPasswordModalConfig = createForgotPasswordModalConfig($t)

const activeKey = ref<TabKey>('login')
const loginFormModel = ref({
  userId: '',
  password: '',
  rememberMe: false
})
const registerFormModel = ref({
  userId: ''
})

const loginForm = Form.useForm(loginFormModel.value)
const registerForm = Form.useForm(registerFormModel.value)

const handleGoTo = (key: TabKey) => {
  activeKey.value = key
}

// TODO: type 修正
const onLoginFinish = (values: any) => {
  console.log('登入資料:', values)
  // 在這裡處理登入邏輯

  fnLogin({
    userId: values.userAccount,
    password: values.password
  })
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
      <a-tabs v-model:activeKey="activeKey" :tabBarStyle="loginPageTabBarStyleConfig">
        <!-- Login -->
        <a-tab-pane key="login">
          <h2 class="tab-label">{{ $t('LoginPage.Login.TabLabel') }}</h2>
          <p class="text-message">{{ $t('LoginPage.Login.TextMessage') }}</p>

          <!-- Login Form -->
          <a-form
            :model="loginFormModel"
            :name="'login_form'"
            :layout="'vertical'"
            :form="loginForm"
            :validate-messages="formValidateMsgsConfig"
            @finish="onLoginFinish"
          >
            <!-- Email -->
            <a-form-item :name="loginFormConfig.userId.name" :rules="loginFormConfig.userId.rules">
              <div class="input-container userId-input">
                <a-input
                  class="base-input"
                  :placeholder="loginFormConfig.userId.placeholder"
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
              :name="loginFormConfig.password.name"
              :rules="loginFormConfig.password.rules"
            >
              <a-input-password
                class="base-input"
                autocomplete="current-password"
                :placeholder="loginFormConfig.password.placeholder"
                v-model:value="loginFormModel.password"
              >
                <template #prefix>
                  <BaseSvgIcon iconName="lock" />
                </template>
              </a-input-password>
            </a-form-item>

            <div class="actions-container">
              <!-- Remember Me -->
              <a-checkbox class="remember-me" v-model:checked="loginFormModel.rememberMe">
                {{ $t('LoginPage.Login.RememberMe') }}
              </a-checkbox>
              <!-- Forgot Password -->
              <span class="forgot-password" @click="openModal()">
                {{ $t('LoginPage.Login.ForgotPassword') }}</span
              >
            </div>

            <a-form-item>
              <a-button class="login-btn" type="primary" html-type="submit">
                {{ $t('LoginPage.Login.Submit') }}
              </a-button>
            </a-form-item>
          </a-form>

          <div class="other-message">
            <span class="other-message-text">{{ $t('LoginPage.OtherText.UseOtherMethods') }}</span>
          </div>

          <a-button class="google-btn" type="primary"> Google </a-button>

          <div class="to-register">
            <span>{{ $t('LoginPage.OtherText.HasNoAccount') }}</span>
            <span class="to-register-btn" @click="handleGoTo('register')">註冊帳號</span>
          </div>
        </a-tab-pane>

        <!-- Register -->
        <a-tab-pane key="register">
          <h2 class="tab-label">{{ $t('LoginPage.Register.TabLabel') }}</h2>
          <p class="text-message">{{ $t('LoginPage.Register.TextMessage') }}</p>
          <a-form
            :model="registerFormModel"
            :name="'register_form'"
            :layout="'vertical'"
            :form="registerForm"
            @finish="onRegisterFinish"
          >
            <a-form-item
              :name="loginFormConfig.userId.name"
              :label="$t('LoginPage.Register.UserAccount')"
            >
              <a-input-group compact>
                <div class="input-container userAccount-input">
                  <a-input
                    class="base-input"
                    :placeholder="loginFormConfig.userId.placeholder"
                    v-model:value="loginFormModel.userId"
                  >
                    <template #prefix>
                      <BaseSvgIcon iconName="mail" />
                    </template>
                  </a-input>
                </div>
                <!-- <a-input
                  v-model:value="registerFormModel.userAccount"
                  :placeholder="loginFormConfig.userAccount.placeholder"
                  class="validate-input"
                /> -->
                <a-button type="primary" class="validate-btn">
                  {{ $t('LoginPage.Register.Validate') }}
                </a-button>
              </a-input-group>
            </a-form-item>

            <a-form-item
              :name="loginFormConfig.password.name"
              :rules="loginFormConfig.password.rules"
            >
              <a-input-password
                class="base-input"
                autocomplete="current-password"
                :placeholder="loginFormConfig.password.placeholder"
                v-model:value="loginFormModel.password"
              >
                <template #prefix>
                  <BaseSvgIcon iconName="lock" />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item
              :name="loginFormConfig.password.name"
              :rules="loginFormConfig.password.rules"
            >
              <a-input-password
                class="base-input"
                autocomplete="current-password"
                :placeholder="loginFormConfig.password.placeholder"
                v-model:value="loginFormModel.password"
              >
                <template #prefix>
                  <BaseSvgIcon iconName="lock" />
                </template>
              </a-input-password>
            </a-form-item>

            <a-form-item :name="loginFormConfig.userId.name" :rules="loginFormConfig.userId.rules">
              <div class="input-container userId-input">
                <a-input
                  class="base-input"
                  :placeholder="loginFormConfig.userId.placeholder"
                  v-model:value="loginFormModel.userId"
                >
                  <template #prefix>
                    <BaseSvgIcon iconName="profile" />
                  </template>
                </a-input>
              </div>
            </a-form-item>

            <a-form-item>
              <a-button class="register-btn" type="primary" html-type="submit">
                {{ $t('LoginPage.Register.Submit') }}
              </a-button>
            </a-form-item>

            <div class="to-login">
              <span>已有帳號?</span>
              <span class="to-login-btn" @click="handleGoTo('login')">登入帳號</span>
            </div>
          </a-form>
        </a-tab-pane>
      </a-tabs>
    </div>

    <!-- Forgot Password Modal -->
    <a-modal
      class="forgot-password-modal"
      v-model:open="modalVisible"
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
  top: $--header-height;
  left: 50%;
  transform: translateX(-50%);

  width: 90%;
  max-width: 400px;
}

.tab-label {
  margin-bottom: 1rem;
  text-align: center;
  font-size: 2.5rem;
  color: $--color-primary;
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

  .remember-me {
    color: $--color-primary;
  }

  .forgot-password {
    @include base-transition;
    padding-inline: 0.75rem;
    color: $--color-primary;
    border: 1px solid $--color-gray-500;

    &:hover {
      color: darken($--color-primary, 10%);
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
}

.to-register,
.to-login {
  margin-top: 2rem;
  display: flex;
  justify-content: center;
  gap: 0.5rem;

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

:global(.forgot-password-modal) {
  top: 200px;
}

:global(.ant-tabs-nav) {
  display: none;
}
</style>
