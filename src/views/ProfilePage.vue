<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AvatarDisplay from '@/components/Base/AvatarDisplay.vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { useModal } from '@/composables/useModal'
import { useValidator } from '@/composables/useValidator'
import { useAuth } from '@/composables/useAuth'
import { useFetchUser } from '@/composables/useFetchUser'
import { modalStyleConfig } from '@/constants/configs/profile.config'
import { ValidationTypeEnums } from '@/constants/enums/validator.enums'
import { UtilCommon } from '@/utils/utilCommon'
import { useUserStore } from '@/stores/user.stores'

// type
type ModalType = 'username' | 'password'

// composables
const { t: $t } = useI18n()
const { modalVisible, openModal, closeModal } = useModal()
const { validateErrorMessage, validate, validateConfirmPassword } = useValidator()
const { fnChangePassword } = useAuth()
const { fnUpdateUserInfo } = useFetchUser()
// stores
const userStore = useUserStore()

// refs
const newUserData = ref({
  username: '',
  password: '',
  confirmPassword: ''
})
const isButtonLoading = ref<boolean>(false)
const modalType = ref<ModalType>('username')
const modalTitle = ref({
  username: $t('ProfilePage.Modal.UserNameField.Title'),
  password: $t('ProfilePage.Modal.PasswordField.Title')
})
const modalErrorMsg = ref<Record<string, string | null>>({
  password: null,
  confirmPassword: null
})

// constants
const maxLength = 10
const fakePassword = '12345678'

// functions
const changeModalField = (field: ModalType): void => {
  modalType.value = field
}

const validatePassword = (type: keyof typeof ValidationTypeEnums, value: string): string | null => {
  // 驗證是否必填項為填入
  if (UtilCommon.checkIsEmpty(value)) {
    return '必填'
  }
  // 驗證規則是否通過
  const isValid = validate(ValidationTypeEnums[type], value)
  if (!isValid) {
    return validateErrorMessage.value
  }
  return null
}

const checkButtonDisabled = (field: ModalType): boolean => {
  if (field === 'username') {
    // 修改個人資料: 確認是否有輸入
    return !(newUserData.value.username.trim().length > 0)
  }

  if (field === 'password') {
    // 修改密碼: 新密碼和確認密碼都沒有錯誤訊息且皆有輸入

    const { password: errorPassword, confirmPassword: errorConfirmPassword } = modalErrorMsg.value
    const { password: newPassword, confirmPassword: newConfirmPassword } = newUserData.value

    return !(
      [errorPassword, errorConfirmPassword].every((v) => v === null) &&
      newPassword.trim().length > 0 &&
      newConfirmPassword.trim().length > 0
    )
  }

  return true
}

// handle functions
const handleOpenModal = (field: ModalType): void => {
  openModal(() => changeModalField(field))
}

const handleConfirmClick = async (field: ModalType): Promise<void> => {
  console.log('[handleConfirmClick]', field)
  isButtonLoading.value = true

  if (field === 'username') {
    fnUpdateUserInfo(newUserData.value.username).finally(() => {
      newUserData.value.username = ''
    })
  }

  if (field === 'password') {
    fnChangePassword(newUserData.value.password).finally(() => {
      newUserData.value.password = ''
      newUserData.value.confirmPassword = ''
    })
  }

  isButtonLoading.value = false
  closeModal()
}
</script>

<template>
  <div class="profile-page">
    <div class="profile-content">
      <div class="display-container">
        <AvatarDisplay
          :name="userStore.userInfo.nickName"
          size="lg"
        />
        <div class="user-name-container">
          <p class="user-name-display">{{ userStore.userInfo.nickName }}</p>
          <div
            class="name-edit-button"
            @click="handleOpenModal('username')"
          >
            <BaseSvgIcon iconName="edit" />
          </div>
        </div>
      </div>
      <div class="editable-container">
        <div class="input-container name-input">
          <span class="input-label">
            {{ $t('ProfilePage.EditableContainer.UserNameField.Title') }}
          </span>
          <a-input
            v-model:value="userStore.userInfo.realName"
            size="large"
            readonly
            class="input-field"
          >
            <template #prefix>
              <BaseSvgIcon iconName="username" />
            </template>
          </a-input>
        </div>

        <div class="input-container password-input">
          <span class="input-label">
            {{ $t('ProfilePage.EditableContainer.PasswordField.Title') }}
          </span>
          <a-input-group>
            <a-input-password
              v-model:value="fakePassword"
              :visibility-toggle="false"
              size="large"
              readonly
              :placeholder="$t('ProfilePage.EditableContainer.PasswordField.Placeholder')"
              class="input-field"
            >
              <template #prefix>
                <BaseSvgIcon iconName="lock" />
              </template>
            </a-input-password>
            <a-button
              type="primary"
              class="change-button"
              @click="handleOpenModal('password')"
            >
              {{ $t('ProfilePage.EditableContainer.PasswordField.ChangeButton') }}
            </a-button>
          </a-input-group>
        </div>
      </div>
    </div>
  </div>

  <!-- <a-modal
    v-model:open="modalVisible"
    class="profile-modal primary"
    :centered="true"
    :cancel-button-props="modalStyleConfig.cancelButtonProps"
    :ok-button-props="{ ...modalStyleConfig.okButtonProps, loading: isButtonLoading }"
    :ok-text="modalStyleConfig.okText"
    @ok="handleConfirmClick(modalType)"
  > -->
  <a-modal
    v-model:open="modalVisible"
    class="profile-modal primary"
    :centered="true"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ modalTitle[modalType] }}</span>
      </div>
    </template>

    <!-- Update Username -->
    <div
      v-if="modalType === 'username'"
      class="modal-content username"
    >
      <a-input
        v-model:value="newUserData.username"
        class="input-field"
        size="large"
        :maxlength="maxLength"
      ></a-input>
      <div class="count-nums">{{ newUserData.username.length }}&nbsp;/&nbsp;{{ maxLength }}</div>
    </div>

    <!-- Update Password -->
    <a-form v-if="modalType === 'password'">
      <a-form-item
        validateTrigger="blur"
        :validate-status="modalErrorMsg.password ? 'error' : ''"
        :help="modalErrorMsg.password"
      >
        <div class="input-container password-input">
          <span class="input-label"> 新密碼 </span>
          <a-input-password
            v-model:value="newUserData.password"
            class="input-field"
            size="large"
            @blur="modalErrorMsg.password = validatePassword('Password', newUserData.password)"
          >
            <template #iconRender="v">
              <div
                class="password-visible"
                v-if="v"
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
        </div>
      </a-form-item>

      <a-form-item
        validateTrigger="blur"
        :validate-status="modalErrorMsg.confirmPassword ? 'error' : ''"
        :help="modalErrorMsg.confirmPassword"
      >
        <div class="input-container password-input">
          <span class="input-label"> 確認密碼 </span>
          <a-input-password
            v-model:value="newUserData.confirmPassword"
            size="large"
            class="input-field"
            @blur="
              modalErrorMsg.confirmPassword = validateConfirmPassword(
                newUserData.confirmPassword,
                newUserData.password
              )
            "
          >
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
        </div>
      </a-form-item>
    </a-form>

    <template #footer>
      <a-button
        type="primary"
        class="confirm-button"
        @click="handleConfirmClick(modalType)"
        :loading="isButtonLoading"
        :disabled="checkButtonDisabled(modalType)"
      >
        {{ modalStyleConfig.okText }}
      </a-button>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.profile-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-top: 2rem;
}

.display-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;

  .user-name-container {
    display: flex;
    align-items: center;

    .user-name-display {
      margin: 0;
      font-size: 1.25rem;
      color: $--color-primary;
    }

    .name-edit-button {
      @include base-transition;
      border-radius: $--border-radius-middle;
      cursor: pointer;

      &:hover {
        background-color: $--color-gray-400;
      }
    }
  }
}

.editable-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .input-container {
    position: relative;
    padding-top: 0.25rem;

    .input-label {
      position: absolute;
      top: 0;
      left: 1rem;
      padding-inline: 5px;
      font-size: 0.75rem;
      color: $--color-gray-700;
      background-color: $--background-color-base;
      z-index: 2;
    }

    .input-field {
      padding: 0.75rem 1rem;
      background-color: $--background-color-base;
      &:hover {
        border-color: none;
      }

      :deep(.ant-input-prefix) {
        margin-right: 1rem;
      }

      :deep(.ant-input) {
        color: $--color-gray-600;
        background-color: $--background-color-base;
      }
    }

    .change-button {
      position: absolute;
      top: 50%;
      right: 0.5rem;
      transform: translateY(-50%);
      z-index: 2;
    }
  }

  .password-input {
    .ant-input-affix-wrapper {
      border-start-end-radius: 8px;
      border-end-end-radius: 8px;
    }
  }
}

.profile-modal {
  .modal-content {
    display: flex;
    flex-direction: column;

    &.username {
      gap: 0.5rem;
    }

    &.password {
      gap: 1.5rem;
    }

    .count-nums {
      text-align: right;
      color: $--color-gray-600;
    }
  }

  .input-container {
    position: relative;

    .input-label {
      position: absolute;
      top: 2px;
      left: 1rem;
      font-size: 0.75rem;
      color: $--color-gray-600;
      z-index: 2;
    }

    .input-field {
      padding: 1rem 1rem 0.75rem 1rem;
    }
  }

  .ant-input,
  .ant-input-affix-wrapper {
    background-color: $--background-color-base;

    :deep(.ant-input) {
      background-color: $--background-color-base;
    }
  }

  .confirm-button {
    width: 100%;
    margin: 0;
  }
}
</style>
