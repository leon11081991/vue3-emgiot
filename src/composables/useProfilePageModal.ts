import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useProfilePageModal = () => {

  const { t: $t } = useI18n()

  const modalVisible = ref<boolean>(false)
  const modalType = ref<'username' | 'password'>('username')

  const modalTitle = ref({
    username: $t('ProfilePage.Modal.UserNameField.Title'),
    password: $t('ProfilePage.Modal.PasswordField.Title')
  })

  const openModal = (field: 'username' | 'password'): void => {
    modalVisible.value = true
    modalType.value = field
  }

  const closeModal = () => {
    modalVisible.value = false
  }

  return {
    modalVisible,
    modalType,
    modalTitle,
    openModal,
    closeModal
  }
}