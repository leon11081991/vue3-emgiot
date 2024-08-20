<script setup lang="ts">
import { ref } from 'vue'
import { Form, Layout } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

type TabKey = 'login' | 'register'

const { t: $t } = useI18n()

const activeKey = ref<TabKey>('login')

// TODO: 1.換為多語系資料2.拆分至model資料夾
const loginFormConfig = {
  userAccount: {
    name: 'userAccount',
    placeholder: '手機',
    rules: [{ required: true }]
  },
  password: {
    name: 'password',
    placeholder: '密碼',
    rules: [{ required: true }]
  }
}

// TODO: 1.換為多語系資料2.拆分至model資料夾
const validateMessages = {
  required: '${label} is required!'
}

const loginFormModel = ref({
  userAccount: '',
  password: ''
})

const registerFormModel = ref({
  userAccount: ''
})

const loginForm = Form.useForm(loginFormModel.value)
const registerForm = Form.useForm(registerFormModel.value)

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
        <a-tabs v-model:activeKey="activeKey">
          <!-- Login -->
          <a-tab-pane key="login" :tab="$t('LoginView.Login.TabLabel')">
            <p class="text-message">{{ $t('LoginView.Login.TextMessage') }}</p>
            <a-form
              :model="loginFormModel"
              :name="'login_form'"
              :layout="'vertical'"
              :form="loginForm"
              :validate-messages="validateMessages"
              @finish="onLoginFinish"
            >
              <a-form-item
                :name="loginFormConfig.userAccount.name"
                :label="$t('LoginView.Login.UserAccount')"
                :rules="[
                  {
                    required: loginFormConfig.userAccount.rules
                  }
                ]"
              >
                <a-input
                  :placeholder="loginFormConfig.userAccount.placeholder"
                  v-model:value="loginFormModel.userAccount"
                />
              </a-form-item>

              <a-form-item
                :name="loginFormConfig.password.name"
                :label="$t('LoginView.Login.Password')"
                :rules="[
                  {
                    required: loginFormConfig.password.rules
                  }
                ]"
              >
                <a-input-password
                  :placeholder="loginFormConfig.password.placeholder"
                  v-model:value="loginFormModel.password"
                />
              </a-form-item>

              <a-form-item>
                <a-button class="login-btn" type="primary" html-type="submit">
                  {{ $t('LoginView.Login.Submit') }}
                </a-button>
              </a-form-item>
            </a-form>

            <p class="other-message">{{ $t('LoginView.Login.OtherMessage') }}</p>
          </a-tab-pane>

          <!-- Register -->
          <a-tab-pane key="register" :tab="$t('LoginView.Register.TabLabel')">
            <p class="text-message">{{ $t('LoginView.Register.TextMessage') }}</p>
            <a-form
              :model="registerFormModel"
              :name="'register_form'"
              :layout="'vertical'"
              :form="registerForm"
              @finish="onRegisterFinish"
            >
              <!-- <a-form-item
                name="userAccount"
                rules="[ { required: true, message: '請輸入用戶名!' } ]"
              >
                <a-input placeholder="用戶名" />
              </a-form-item> -->

              <!-- <a-form-item name="password" rules="[ { required: true, message: '請輸入密碼!' } ]">
                <a-input-password placeholder="密碼" />
              </a-form-item> -->

              <a-form-item
                :name="loginFormConfig.userAccount.name"
                :label="$t('LoginView.Register.UserAccount')"
              >
                <a-input-group compact>
                  <a-input
                    v-model:value="registerFormModel.userAccount"
                    :placeholder="loginFormConfig.userAccount.placeholder"
                    style="width: calc(100% - 100px)"
                  />
                  <a-button type="primary">{{ $t('LoginView.Register.Validate') }}</a-button>
                </a-input-group>
              </a-form-item>

              <a-form-item>
                <a-button type="primary" html-type="submit">
                  {{ $t('LoginView.Register.Submit') }}
                </a-button>
              </a-form-item>
            </a-form>
          </a-tab-pane>
        </a-tabs>
      </a-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  position: relative;
  min-height: 100dvh;
  // display: flex;
  // justify-content: center;
  // align-items: center;
}
.login-register-container {
  transform: translateY(50%);
  max-width: 400px;
  margin: 0 auto;
}

.ant-card {
  // width: 40dvw;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.15);
}

.login-btn {
  width: 100%;
}
</style>
