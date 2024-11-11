<script setup lang="ts">
import type { StoreMemberInfoDataType } from '@/models/types/storeMember.types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import AvatarDisplay from '@/components/Base/AvatarDisplay.vue'
import InfoContainer from '@/components/MemberPage/InfoContainer.vue'
import PermissionContainer from '@/components/MemberPage/PermissionContainer.vue'
import ContentSettingContainer from '@/components/MemberPage/ContentSettingContainer.vue'
import { useFetchStoreMember } from '@/composables/useFetchStoreMember'
import { useModal } from '@/composables/useModal'
import { useDropdown } from '@/composables/useDropdown'
import { useStoreMember } from '@/composables/useStoreMember'
import { useDebounce } from '@/composables/useDebounce'

// Route
const { storeId, userId } = useRoute().params

// i18n
const { t: $t } = useI18n()

// Composables
const { storeMemberInfo, fetchStoreMemberInfo, fnUpdateStoreMemberInfo, fnDeleteStoreMember } =
  useFetchStoreMember()
const { modalVisible, openModal, closeModal } = useModal()
const { pcbsList, userRoleInStoreList, fetchPcbsList, fetchUserRoleInStore } = useDropdown()
const { changePermissionSetting, updateMemberData } = useStoreMember()

// Refs
const memberInfoData = ref<StoreMemberInfoDataType>({} as StoreMemberInfoDataType)

// Functions
const updateMemberInfo = useDebounce((memberInfoData: StoreMemberInfoDataType, storeId: string) => {
  fnUpdateStoreMemberInfo({ ...memberInfoData, storeId })
}, 500)

const deleteMember = useDebounce((storeId: string, userId: string) => {
  fnDeleteStoreMember({ storeId, userId }).then((resp) => {
    if (!resp) return
    closeModal()
  })
}, 500)

// Life Cycle Hooks
onMounted(async () => {
  await Promise.all([
    fetchStoreMemberInfo({
      storeId: storeId as string,
      userId: userId as string
    }),
    fetchUserRoleInStore(storeId as string)
  ])

  memberInfoData.value = {
    ...storeMemberInfo.value.data,
    storeId: storeId as string
  }

  await fetchPcbsList(storeId as string)
})
</script>

<template>
  <div class="member-info-page">
    <div class="member-info-page-inner">
      <InfoContainer :store-name="memberInfoData?.storeName">
        <template #user>
          <div class="user-info-container">
            <AvatarDisplay
              size="md"
              :name="memberInfoData.userName"
            />

            <a-skeleton-input
              v-if="storeMemberInfo.isLoading"
              :active="true"
              :size="'small'"
            />
            <div
              v-else
              class="user-wrap"
            >
              <h6 class="user-name">{{ memberInfoData.userName }}</h6>
              <div class="user-level">
                <BaseSvgIcon :iconName="`level-${memberInfoData.roleOrder}`" />
                {{ $t(`Common.Level`, { level: memberInfoData.roleOrder }) }}
              </div>
            </div>
          </div>
        </template>
      </InfoContainer>

      <PermissionContainer
        :selected-role="memberInfoData?.roleId || ''"
        :user-role-in-store-list="userRoleInStoreList.data"
        :is-loading="userRoleInStoreList.isLoading"
        @update:selectedRole="changePermissionSetting($event, memberInfoData)"
      />

      <ContentSettingContainer
        :member-info-data="memberInfoData"
        :pcbs-list="pcbsList.data"
        @update:member-info-data="updateMemberData($event, memberInfoData)"
      />
    </div>

    <div class="actions-container">
      <a-button
        type="primary"
        size="large"
        @click="updateMemberInfo(memberInfoData, storeId as string)"
      >
        {{ $t('MemberInfoPage.Button.Update') }}
      </a-button>
      <a-button
        type="delete"
        size="large"
        ghost
        @click="openModal()"
      >
        {{ $t('MemberInfoPage.Button.Delete') }}
      </a-button>
    </div>
  </div>

  <a-modal
    v-model:open="modalVisible"
    class="delete-member-modal primary"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ $t('MemberInfoPage.Modal.DeleteMember.Title') }}</span>
      </div>
    </template>

    <div class="delete-member-container">{{ $t('MemberInfoPage.Modal.DeleteMember.Content') }}</div>

    <template #footer>
      <div class="delete-member-actions-container">
        <a-button
          type="primary"
          @click="deleteMember(storeId as string, userId as string)"
          >{{ $t('MemberInfoPage.Modal.DeleteMember.Button.Confirm') }}</a-button
        >
        <a-button
          type="primary"
          ghost
          @click="closeModal"
          >{{ $t('MemberInfoPage.Modal.DeleteMember.Button.Cancel') }}</a-button
        >
      </div>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.member-info-page {
  min-height: calc(100vh - $--header-height - $--page-padding-top - $--page-padding-bottom);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .member-info-page-inner {
    flex: 1;
  }
}

section {
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
}

.user-info-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding-top: 0.5rem;
  padding-left: 2rem;
  border-top: 1px solid $--color-gray-400;

  .user-wrap {
    flex: 1;
  }

  .user-name {
    font-size: 1rem;
    color: $--color-primary;
    font-weight: bold;
  }

  .user-level {
    display: flex;
    align-items: center;
    font-size: 1rem;
    color: $--color-gray-600;
  }
}

.section-title {
  margin-bottom: 1rem;
  color: $--color-gray-600;
}

.actions-container {
  position: sticky;
  background: linear-gradient(to bottom, transparent 0.2rem, $--background-color-base 1rem);
  padding-top: 1.5rem;
  padding-bottom: $--page-padding-bottom;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @include media-breakpoint-down(sm) {
    padding-inline: $--page-padding-x-mobile;
  }
}

.delete-member-modal {
  .delete-member-container {
    display: flex;
    justify-content: center;
    margin-block: 2rem;
    font-size: 1rem;
    color: $--color-gray-600;
  }

  .delete-member-actions-container {
    display: flex;

    & button {
      flex: 1;
    }
  }
}
</style>
