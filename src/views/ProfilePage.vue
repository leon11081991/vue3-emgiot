<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AvatarDisplay from '@/components/Base/AvatarDisplay.vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { useModal } from '@/composables/useModal'
import { modalStyleConfig } from '@/constants/configs/profile.config'

type ModalType = 'username' | 'password'

const { t: $t } = useI18n()
const { modalVisible, openModal, closeModal } = useModal()

const modalType = ref<ModalType>('username')
const modalTitle = ref({
  username: $t('ProfilePage.Modal.UserNameField.Title'),
  password: $t('ProfilePage.Modal.PasswordField.Title')
})

const changeModalField = (field: ModalType): void => {
  modalType.value = field
}

const handleOpenModal = (field: ModalType): void => {
  openModal(() => changeModalField(field))
}

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
          <div class="name-edit-button" @click="handleOpenModal('username')">
            <BaseSvgIcon iconName="edit" />
          </div>
        </div>
      </div>
      <div class="editable-container">
        <div class="input-container name-input">
          <span class="input-label">
            {{ $t('ProfilePage.EditableContainer.UserNameField.Title') }}
          </span>
          <a-input v-model:value="mockUserData.name" size="large" readonly class="input-field">
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
              v-model:value="mockUserData.password"
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
            <a-button type="primary" class="change-button" @click="handleOpenModal('password')">
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

    <div v-if="modalType === 'username'" class="modal-content username">
      <a-input v-model:value="newUserData.username" class="input-field" size="large"></a-input>
      <div class="count-nums">/10</div>
    </div>

    <div v-if="modalType === 'password'" class="modal-content password">
      <div class="input-container password-input">
        <span class="input-label"> 新密碼 </span>

        <a-input-password v-model:value="newUserData.password" size="large" class="input-field">
          <template #iconRender="v">
            <div class="password-visible" v-if="v">
              <SvgIcon iconName="home" />
            </div>
            <div class="password-invisible" v-else>
              <SvgIcon iconName="cross" />
            </div>
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
          <template #iconRender="x">
            <div class="password-visible" v-if="x">
              <SvgIcon iconName="home" />
            </div>
            <div class="password-invisible" v-else>
              <SvgIcon iconName="cross" />
            </div>
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
      padding-inline: 5px;
      font-size: 0.75rem;
      background-color: $--background-color-base;
      z-index: 2;
    }

    .input-field {
      padding: 0.75rem 1rem;
      background-color: $--background-color-base;
      &:hover {
        border-color: none;
      }

      :deep(.ant-input) {
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
  }

  .input-container {
    position: relative;

    .input-label {
      position: absolute;
      top: 2px;
      left: 1rem;
      font-size: 0.75rem;
      z-index: 2;
    }

    .input-field {
      padding: 1.5rem 1rem 0.75rem 1rem;
    }
  }

  .modal-title {
    color: $--color-white;
  }

  .modal-content {
    .count-nums {
      text-align: right;
    }
  }
}
</style>
