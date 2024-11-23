<script setup lang="ts">
/* import */
import type { DetectedCode } from '@/models/interfaces/qrCode.interface'
import type { BindingPcbDataType } from '@/models/types/pcbRegister.types'
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'
import BaseLoading from '@/components/Base/BaseLoading.vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { useQRCode } from '@/composables/useQRCode'
import { useFetchPcbRegister } from '@/composables/useFetchPcbRegister'
import { UtilCommon } from '@/utils/utilCommon'

/* i18n */
const { t: $t } = useI18n()

/* composables */
const { trackFunctions, error: QRCodeError, onError, onDetect } = useQRCode()
const { fnBindingPcb } = useFetchPcbRegister()

/* defineProps */
const props = defineProps<{
  modalVisible: boolean
}>()

/* defineEmits */
const emit = defineEmits<{
  (e: 'refresh'): void
  (e: 'close'): void
}>()

/* 非響應式變數 */
const maxLength = 10

/* refs */
const isButtonLoading = ref<boolean>(false)
const showQrCodeReader = ref<boolean>(false)
const cameraLoading = ref<boolean>(true)
const cameraPaused = ref<boolean>(false)
const showScanConfirmation = ref<boolean>(false)
const newMachine = ref<BindingPcbDataType>({
  machineName: '',
  qrcode: ''
})

/* functions */
const modalTitle = (showQRCode: boolean) => {
  if (showQRCode) {
    return $t('DashboardPage.Modal.AddNewMachine.Title.QRCode')
  }
  return $t('DashboardPage.Modal.AddNewMachine.Title.Default')
}

const initStatus = () => {
  newMachine.value = {
    machineName: '',
    qrcode: ''
  }
  showQrCodeReader.value = false
  cameraLoading.value = true
}

const closeModal = () => {
  initStatus()
  emit('close')
}

const openQRCodeReader = () => {
  showQrCodeReader.value = true
}

const onCameraOn = () => {
  cameraLoading.value = false
  showScanConfirmation.value = false
}

const onCameraOff = () => {
  showScanConfirmation.value = true
}

const handleDetected = async (detectedCodes: DetectedCode[]) => {
  newMachine.value.qrcode = onDetect(detectedCodes)[0]

  cameraPaused.value = true

  window.setTimeout(() => {
    cameraPaused.value = false
    showQrCodeReader.value = false
  }, 1000)
}

const onFinish = (values: BindingPcbDataType) => {
  isButtonLoading.value = true
  fnBindingPcb(values)
    .then((resp) => {
      if (!resp) return
      emit('refresh')
      closeModal()
    })
    .finally(() => {
      isButtonLoading.value = false
    })
}
</script>

<template>
  <a-modal
    :open="props.modalVisible"
    :footer="null"
    class="add-new-machine-modal primary"
    @cancel="closeModal"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ modalTitle(showQrCodeReader) }}</span>
      </div>
    </template>

    <div class="add-new-machine-modal-content">
      <a-form
        v-if="!showQrCodeReader"
        :model="newMachine"
        name="addNewMachine_form"
        class="add-new-machine-form"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-form-item
          name="machineName"
          :rules="[{ required: true, message: '未輸入名稱' }]"
        >
          <div class="machine-container">
            <a-input
              v-model:value="newMachine.machineName"
              class="input-field"
              size="large"
              :placeholder="$t('DashboardPage.Modal.AddNewMachine.Placeholder.MachineName')"
              :maxlength="maxLength"
            />
            <div class="count-nums">
              {{ newMachine.machineName.length }}&nbsp;/&nbsp;{{ maxLength }}
            </div>
          </div>
        </a-form-item>

        <a-form-item
          name="qrcode"
          :rules="[{ required: true, message: '未輸入' }]"
        >
          <div class="scan-container">
            <a-input
              v-model:value="newMachine.qrcode"
              class="input-field"
              size="large"
              :placeholder="$t('DashboardPage.Modal.AddNewMachine.Placeholder.QRCode')"
            />
            <div
              class="scan-button"
              @click="openQRCodeReader"
            >
              <BaseSvgIcon
                iconName="scan"
                size="xl"
              />
            </div>
          </div>
        </a-form-item>

        <a-form-item>
          <a-button
            class="modal-btn"
            type="primary"
            size="large"
            :disabled="
              UtilCommon.checkIsEmpty(newMachine.machineName) ||
              UtilCommon.checkIsEmpty(newMachine.qrcode)
            "
            :loading="isButtonLoading"
            html-type="submit"
          >
            {{ $t('DashboardPage.Modal.AddNewMachine.Button.Confirm') }}
          </a-button>
        </a-form-item>
      </a-form>

      <div
        v-else
        class="qr-code-reader-content"
      >
        <div class="qr-code-reader">
          <qrcode-stream
            :paused="cameraPaused"
            :track="trackFunctions['outline']"
            @error="onError"
            @camera-on="onCameraOn"
            @camera-off="onCameraOff"
            @detect="handleDetected"
          >
            <BaseLoading
              v-if="cameraLoading"
              position="absolute"
            />
            <div
              v-show="showScanConfirmation"
              class="reader-confirmation"
            >
              <BaseSvgIcon
                iconName="success"
                size="xl"
              />
            </div>
          </qrcode-stream>
        </div>

        <a-button
          class="modal-btn"
          type="primary"
          size="large"
          ghost
          @click="initStatus"
        >
          {{ $t('DashboardPage.Modal.AddNewMachine.Button.GoBack') }}
        </a-button>
      </div>
    </div>
  </a-modal>
</template>

<style lang="scss" scoped>
.add-new-machine-modal {
  background-color: #35495e;
  .count-nums {
    text-align: right;
    color: $--color-gray-600;
  }

  .modal-btn {
    width: 100%;
  }
}

.scan-container {
  display: flex;
  align-items: center;
  gap: 1rem;

  .scan-button {
    cursor: pointer;
  }
}

.qr-code-reader-content {
  .qr-code-reader {
    position: relative;
    margin-block: 1rem;

    .reader-confirmation {
      position: absolute;
      width: 100%;
      height: 100%;

      background-color: rgba(255, 255, 255, 0.8);

      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;

      .svg-icon {
      }
    }
  }
}
</style>
