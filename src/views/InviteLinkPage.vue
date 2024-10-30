<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import { useMessage } from '@/composables/useMessage'
import { UtilCommon } from '@/utils/utilCommon'

// Router
const router = useRouter()

// i18n
const { t: $t } = useI18n()

// Composables
const { openMessage } = useMessage()

// Variables
const baseUrl = window.location.origin

// Refs
const query = ref<string | null>(null)

// Functions
const copy = (text: string) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        openMessage('success', $t('Common.Message.CopySuccess'))
      })
      .catch(() => {
        openMessage('error', $t('Common.Message.CopyFailed'))
      })
  } else {
    openMessage('error', $t('Common.Message.ClipboardNotSupported'))
  }
}

// Life Cycle Hooks
onMounted(() => {
  query.value = UtilCommon.getQueryParam('inviteKeyring')
})
</script>

<template>
  <div class="invite-link-page">
    <div class="invite-link-page-inner">
      <div class="qr-code-container">
        <a-qrcode
          :bordered="false"
          :size="200"
          :value="`${baseUrl}/member-join?inviteKeyring=${query}`"
        />
        <p class="qr-code-hint">
          <BaseSvgIcon iconName="exclamation" />
          {{ $t('InviteLinkPage.QRCodeHint') }}
        </p>
      </div>

      <div class="text-container">
        <p class="hint">{{ $t('InviteLinkPage.TextHint') }}</p>
        <a
          class="invite-link"
          target="_blank"
          :href="`${baseUrl}/member-join?inviteKeyring=${query}`"
          >{{ `${baseUrl}/member-join?inviteKeyring=${query}` }}</a
        >
      </div>

      <a-button
        type="primary"
        size="large"
        @click="copy(`${baseUrl}/member-join?inviteKeyring=${query}`)"
      >
        {{ $t('InviteLinkPage.Button.Copy') }}
      </a-button>
    </div>

    <a-button
      type="primary"
      size="large"
      ghost
      @click="router.go(-1)"
    >
      {{ $t('InviteLinkPage.Button.Return') }}</a-button
    >
  </div>
</template>

<style lang="scss" scoped>
.invite-link-page {
  min-height: calc(100vh - $--header-height - $--page-padding-top - $--page-padding-bottom);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .invite-link-page-inner {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .qr-code-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    :deep(.ant-qrcode) {
      width: 50%;
    }

    .qr-code-hint {
      display: flex;
      align-items: center;
      color: $--color-primary;
    }
  }

  .text-container {
    color: $--color-primary;
    padding: 1rem 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border-radius: $--border-radius-large;
    background-color: $--color-gray-300;

    .hint {
      font-size: 1rem;
    }

    .invite-link {
      color: $--color-primary;
      text-decoration: none;
    }
  }
}
</style>
