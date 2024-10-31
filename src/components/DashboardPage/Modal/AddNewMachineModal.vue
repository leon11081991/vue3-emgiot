<script setup lang="ts">
import type { AddNewMachineDataType } from '@/models/types/dashboard.types'
import { ref } from 'vue'
// import { QrcodeStream } from 'vue-qrcode-reader'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

const props = defineProps<{
  modalVisible: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const maxLength = 10
const isButtonLoading = ref<boolean>(false)
const isShowQrCodeReader = ref<boolean>(false)
const newMachine = ref<AddNewMachineDataType>({
  machineName: '',
  qrcode: ''
})

const selectedConstraints = ref({ facingMode: 'environment' })
const defaultConstraintOptions = [
  { label: 'rear camera', constraints: { facingMode: 'environment' } },
  { label: 'front camera', constraints: { facingMode: 'user' } }
]
const constraintOptions = ref(defaultConstraintOptions)
const error = ref('')

const closeModal = () => {
  emit('close')
}

const openQrCodeReader = () => {
  isShowQrCodeReader.value = true
}

const barcodeFormats = ref({
  aztec: false,
  code_128: false,
  code_39: false,
  code_93: false,
  codabar: false,
  databar: false,
  databar_expanded: false,
  data_matrix: false,
  dx_film_edge: false,
  ean_13: false,
  ean_8: false,
  itf: false,
  maxi_code: false,
  micro_qr_code: false,
  pdf417: false,
  qr_code: true,
  rm_qr_code: false,
  upc_a: false,
  upc_e: false,
  linear_codes: false,
  matrix_codes: false
})
// const selectedBarcodeFormats = computed(() => {
//   return Object.keys(barcodeFormats.value).filter((format) => barcodeFormats.value[format])
// })

// const onDetect = (detectedCodes) => {
//   console.log(detectedCodes)
//   newMachine.value.qrcode = JSON.stringify(detectedCodes.map((code) => code.rawValue))
// }

// async function onCameraReady() {
//   // NOTE: on iOS we can't invoke `enumerateDevices` before the user has given
//   // camera access permission. `QrcodeStream` internally takes care of
//   // requesting the permissions. The `camera-on` event should guarantee that this
//   // has happened.
//   const devices = await navigator.mediaDevices.enumerateDevices()
//   const videoDevices = devices.filter(({ kind }) => kind === 'videoinput')

//   constraintOptions.value = [
//     ...defaultConstraintOptions,
//     ...videoDevices.map(({ deviceId, label }) => ({
//       label: `${label} (ID: ${deviceId})`,
//       constraints: { deviceId }
//     }))
//   ]

//   error.value = ''
// }

// function onError(err) {
//   error.value = `[${err.name}]: `

//   if (err.name === 'NotAllowedError') {
//     error.value += 'you need to grant camera access permission'
//   } else if (err.name === 'NotFoundError') {
//     error.value += 'no camera on this device'
//   } else if (err.name === 'NotSupportedError') {
//     error.value += 'secure context required (HTTPS, localhost)'
//   } else if (err.name === 'NotReadableError') {
//     error.value += 'is the camera already in use?'
//   } else if (err.name === 'OverconstrainedError') {
//     error.value += 'installed cameras are not suitable'
//   } else if (err.name === 'StreamApiNotSupportedError') {
//     error.value += 'Stream API is not supported in this browser'
//   } else if (err.name === 'InsecureContextError') {
//     error.value +=
//       'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
//   } else {
//     error.value += err.message
//   }
// }

// const onDetect = (result: string) => {
//   newMachine.value.qrcode = result
//   isShowQrCodeReader.value = false
// }

const onFinish = (values: AddNewMachineDataType) => {
  isButtonLoading.value = true
  console.log('onFinish', values)
  isButtonLoading.value = false
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
        <span class="modal-title">{{ '新增機台' }}</span>
      </div>
    </template>

    <div class="add-new-machine-modal-content">
      <a-form
        :model="newMachine"
        name="addNewMachine_form"
        autocomplete="off"
        @finish="onFinish"
      >
        <a-form-item
          name="machineName"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <div class="machine-container">
            <a-input
              v-model:value="newMachine.machineName"
              class="input-field"
              size="large"
              placeholder="請輸入名稱"
              :maxlength="maxLength"
            />
            <div class="count-nums">
              {{ newMachine.machineName.length }}&nbsp;/&nbsp;{{ maxLength }}
            </div>
          </div>
        </a-form-item>

        <a-form-item
          name="qrcode"
          :rules="[{ required: true, message: 'Please input your qrcode!' }]"
        >
          <div class="scan-container">
            <a-input
              v-model:value="newMachine.qrcode"
              class="input-field"
              size="large"
              placeholder="手動需入序號或掃描二維碼"
            />
            <div
              class="scan-button"
              @click="openQrCodeReader"
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
            class="submit-btn"
            type="primary"
            size="large"
            :loading="isButtonLoading"
            html-type="submit"
            >{{ '確認' }}</a-button
          >
        </a-form-item>
      </a-form>
    </div>

    {{ newMachine.qrcode }}

    <!-- <qrcode-stream
      v-if="isShowQrCodeReader"
      @error="onError"
      @detect="onDetect"
      @camera-on="onCameraReady"
    /> -->
  </a-modal>
</template>

<style lang="scss" scoped>
.add-new-machine-modal {
  .count-nums {
    text-align: right;
    color: $--color-gray-600;
  }

  .submit-btn {
    width: 100%;
  }
}

.scan-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
