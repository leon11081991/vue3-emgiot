import { ref } from 'vue'

export const useModal = () => {
  const modalVisible = ref<boolean>(false) // modal 是否顯示

  /** 顯示 modal
   *  可傳入其他 callback
   */
  const openModal = (callback?: () => void): void => {
    modalVisible.value = true

    if (callback) {
      callback()
    }
  }

  /** 關閉 modal */
  const closeModal = () => {
    modalVisible.value = false
  }

  return {
    modalVisible,
    openModal,
    closeModal
  }
}
