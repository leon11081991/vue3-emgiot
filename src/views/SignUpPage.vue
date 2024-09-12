<script setup lang="ts">
import { ref } from 'vue'
import { Form } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { createSignUpFormConfig } from '@/constants/configs/login.config'

const { t: $t } = useI18n()

const signUpFormModel = ref({
  userId: '',
  password: '',
  verifyPassword: '',
  userInfo: ''
})

const registerForm = Form.useForm(signUpFormModel.value)
const signUpFormConfig = createSignUpFormConfig($t)

const onSignupFinish = (values: any) => {
  console.log('註冊資料:', values)
}
</script>

<template>
  <div class="signup-page">
    <div class="signup-container">
      <h2 class="heading-text">{{ $t('SignUpPage.HeadingText') }}</h2>

      <a-form
        class="signup-form"
        name="signUp_form"
        layout="vertical"
        :form="registerForm"
        :model="signUpFormModel"
        @finish="onSignupFinish"
      >
        <a-form-item name="userId">
          <a-input-group>
            <div class="input-container validate-input">
              <a-input
                class="base-input"
                readonly
                :placeholder="$t('SignUpPage.SignUp.UserId')"
                v-model:value="signUpFormModel.userId"
              >
                <template #prefix>
                  <BaseSvgIcon iconName="mail" />
                </template>
              </a-input>

              <a-button type="primary" disabled class="validate-btn">
                {{ $t('LoginPage.Register.Validate') }}
              </a-button>
            </div>
          </a-input-group>
        </a-form-item>

        <a-form-item name="password" :rules="signUpFormConfig.password.rules">
          <a-input-password
            class="base-input"
            autocomplete="current-password"
            :placeholder="$t('SignUpPage.SignUp.Password')"
            v-model:value="signUpFormModel.password"
          >
            <template #prefix>
              <BaseSvgIcon iconName="lock" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item
          :name="signUpFormConfig.verifyPassword.name"
          :rules="signUpFormConfig.verifyPassword.rules"
        >
          <a-input-password
            class="base-input"
            autocomplete="none"
            :placeholder="$t('SignUpPage.SignUp.VerifyPassword')"
            v-model:value="signUpFormModel.verifyPassword"
          >
            <template #prefix>
              <BaseSvgIcon iconName="lock" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item name="userInfo" :rules="signUpFormConfig.userInfo.rules">
          <div class="input-container userInfo-input">
            <a-input
              class="base-input"
              :placeholder="$t('SignUpPage.SignUp.UserInfo')"
              v-model:value="signUpFormModel.userInfo"
            >
              <template #prefix>
                <BaseSvgIcon iconName="profile" />
              </template>
            </a-input>
          </div>
        </a-form-item>

        <a-form-item class="signup-btn-container">
          <a-button class="signup-btn" type="primary" size="large" html-type="submit">
            {{ $t('SignUpPage.SignUp.Submit') }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.signup-page {
  position: relative;
  display: flex;
  justify-content: center;
  height: calc(100dvh - $--page-padding-x - $--heading-font-size);

  @include media-breakpoint-down(sm) {
    height: calc(100dvh - --page-padding-x-mobile);
  }
}
.signup-container {
  width: 90%;
  max-width: 400px;
  display: flex;
  flex-direction: column;

  @include media-breakpoint-down(sm) {
    top: $--login-top-mobile;
  }

  .heading-text {
    text-align: center;
    font-size: $--heading-font-size;
    color: $--color-primary;

    @include media-breakpoint-down(sm) {
      font-size: $--heading-font-size-mobile;
    }
  }

  .signup-form {
    margin-top: 2rem;

    display: flex;
    flex-direction: column;
    flex-grow: 1;

    .signup-btn-container {
      margin-top: auto;

      .signup-btn {
        width: 100%;
        padding-block: 0.75rem;
        height: auto;
      }
    }
  }

  .validate-input {
    position: relative;
    margin-bottom: 2rem;

    :deep(.ant-input-affix-wrapper) {
      border-radius: $--border-radius-middle;
      border-color: $--border-color--disabled;
    }

    :deep(
        .ant-input-affix-wrapper:hover,
        .ant-input:focus,
        .ant-input-affix-wrapper-focused,
        .ant-input-affix-wrapper:focus
      ) {
      border-width: 1px;
      border-color: $--border-color--disabled; // 去除邊框色
      box-shadow: none; // 去除陰影效果
      outline: none; // 去除 outline
    }

    :deep(.ant-input-affix-wrapper:focus) {
      box-shadow: none;
    }

    :deep(.ant-input) {
      color: $--color-gray-500;
    }
  }
  .validate-btn {
    position: absolute;
    top: 50%;
    right: 0.5rem;
    transform: translateY(-50%);
    height: 80%;
    background-color: $--color-primary--light--disabled;
    color: $--color-white;
    z-index: 1;
  }
}

.base-input {
  padding-block: 0.5rem;
  background-color: $--background-color-base;

  :deep(.ant-input) {
    background-color: $--background-color-base;
  }
}
</style>
