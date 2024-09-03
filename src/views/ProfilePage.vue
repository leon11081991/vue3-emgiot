<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AvatarDisplay from '@/components/Base/AvatarDisplay.vue'
import SvgIcon from '@/components/Base/SvgIcon.vue'
import { useProfilePageModal } from '@/composables/useProfilePageModal'
import { inputStyleConfig, modalStyleConfig } from '@/constants/configs/profile.config'

const { t: $t } = useI18n()
const { modalVisible, modalType, modalTitle, openModal, closeModal } = useProfilePageModal()

const handleConfirmClick = (field: 'username' | 'password'): void => {
  console.log('[handleConfirmClick]', field)

  // TODO: api

  closeModal()
}

const newUserData = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const mockUserData = {
  name: '雲小二',
  username: '雲小二',
  avatar: 'https://i.pravatar.cc/300',
  password: 'asvasv'
}
</script>

<template>
  <div class="profile-page">
    <div class="profile-content">
      <div class="display-container">
        <AvatarDisplay :name="mockUserData.username" size="lg" />
        <div class="user-name-container">
          <p class="user-name-display">{{ mockUserData.name }}</p>
          <div class="name-edit-button" @click="openModal('username')">
            <SvgIcon iconName="cross" />
          </div>
        </div>
      </div>
      <div class="editable-container">
        <div class="input-container name-input">
          <span class="input-label">
            {{ $t('ProfilePage.EditableContainer.UserNameField.Title') }}
          </span>
          <a-input
            v-model:value="mockUserData.name"
            size="large"
            readonly
            class="input-field"
            :style="inputStyleConfig.style"
          >
            <template #prefix>
              <SvgIcon iconName="cross" />
            </template>
          </a-input>
        </div>

        <div class="input-container password-input">
          <span class="input-label">
            {{ $t('ProfilePage.EditableContainer.PasswordField.Title') }}
          </span>
          <a-input-group>
            <a-input-password
              v-model:value="mockUserData.password"
              :visibility-toggle="false"
              readonly
              :placeholder="$t('ProfilePage.EditableContainer.PasswordField.Placeholder')"
              class="input-field"
            >
              <template #prefix>
                <SvgIcon iconName="cross" />
              </template>
            </a-input-password>
            <a-button type="primary" class="change-button" @click="openModal('password')">
              {{ $t('ProfilePage.EditableContainer.PasswordField.ChangeButton') }}
            </a-button>
          </a-input-group>
        </div>
      </div>
    </div>
  </div>

  <a-modal
    v-model:open="modalVisible"
    class="profile-modal"
    :centered="true"
    :cancel-button-props="modalStyleConfig.cancelButtonProps"
    :ok-button-props="modalStyleConfig.okButtonProps"
    :ok-text="modalStyleConfig.okText"
    @ok="handleConfirmClick(modalType)"
  >
    <template #title>
      <span class="modal-title">{{ modalTitle[modalType] }}</span>
    </template>

    <div v-if="modalType === 'username'" class="modal-content">
      <a-input v-model:value="newUserData.username" size="large" class="input-field"></a-input>
      <div class="count-nums">/10</div>
    </div>

    <div v-if="modalType === 'password'" class="modal-content">
      <div class="input-container password-input">
        <span class="input-label"> 新密碼 </span>

        <a-input-password v-model:value="newUserData.password" size="large" class="input-field">
          <template #iconRender="v">
            <EyeTwoTone v-if="v"></EyeTwoTone>
            <EyeInvisibleOutlined v-else></EyeInvisibleOutlined>
          </template>
        </a-input-password>
      </div>

      <div class="input-container password-input">
        <span class="input-label"> 確認密碼 </span>
        <a-input-password
          v-model:value="newUserData.confirmPassword"
          size="large"
          class="input-field"
        >
          <template #iconRender="v">
            <EyeTwoTone v-if="v"></EyeTwoTone>
            <EyeInvisibleOutlined v-else></EyeInvisibleOutlined>
          </template>
        </a-input-password>
      </div>
    </div>
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
      padding-inline: 2px;
      font-size: 0.75rem;
      background-color: $--background-color-base;
      z-index: 2;
    }

    .input-field {
      padding: 0.75rem 1rem;
      background-color: $--background-color-base;
    }

    .change-button {
      position: absolute;
      top: 50%;
      right: 0.5rem;
      transform: translateY(-50%);
      z-index: 2;
    }
  }
}

.profile-modal {
  .modal-content {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .input-container {
    position: relative;

    .input-label {
      position: absolute;
      top: 2px;
      left: 1rem;
      z-index: 2;
    }

    .input-field {
      padding: 1.5rem 1rem 0.75rem 1rem;
      // background-color: $--background-color-base;
    }
  }
}

.ant-modal .ant-modal-content {
  background-color: #f0f0f0; /* 修改背景色 */
  border-radius: 10px; /* 修改圆角 */
  padding: 20px; /* 内边距 */
}
</style>
