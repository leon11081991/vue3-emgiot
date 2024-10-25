<script setup lang="ts">
import type { StoreMemberInfoDataType } from '@/models/types/storeMember.types'
import type { StoresItemDataType } from '@/models/types/dropdown.type'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import InfoContainer from '@/components/MemberPage/InfoContainer.vue'
import PermissionContainer from '@/components/MemberPage/PermissionContainer.vue'
import ContentSettingContainer from '@/components/MemberPage/ContentSettingContainer.vue'
import { useStoreMember } from '@/composables/useStoreMember'
import { useFetchStoreMember } from '@/composables/useFetchStoreMember'
import { useDropdown } from '@/composables/useDropdown'

// i18n
const { t: $t } = useI18n()
// router
const router = useRouter()

// composables
const { changePermissionSetting, resetForbiddenPcbsIfNeeded } = useStoreMember()
const { fnAddInviteMember } = useFetchStoreMember()
const {
  pcbsList,
  storesList,
  userRoleInStoreList,
  fetchPcbsList,
  fetchUserRoleInStore,
  fetchStoresList
} = useDropdown()

// refs
const isButtonLoading = ref<boolean>(false)
const newMemberInfoData = ref<StoreMemberInfoDataType>({
  userId: '',
  userName: '',
  storeId: undefined,
  storeName: '',
  roleId: '',
  roleOrder: 0,
  photoUrl: '',
  isSpecial: false,
  isGoodsManagement: false,
  isInvisibleToThisUser: false,
  forbiddenPcbs: [],
  isForbidden: false
} as StoreMemberInfoDataType)

// Functions
const onStoreChange = (optionId: string, storeList: StoresItemDataType[]) => {
  const storeInfo = storeList.find((store) => store.storeId === optionId)

  if (!storeInfo) return
  newMemberInfoData.value.storeName = storeInfo.storeName

  Promise.all([fetchUserRoleInStore(optionId), fetchPcbsList(optionId)]).then(() => {})
}

const createAddMemberLink = (memberInfo: StoreMemberInfoDataType) => {
  isButtonLoading.value = true

  fnAddInviteMember(memberInfo)
    .then((resp) => {
      if (resp) {
        router.push({
          name: 'InviteLink',
          query: { inviteKeyring: resp }
        })
      }
    })
    .finally(() => {
      isButtonLoading.value = false
    })
}

// Life Cycle Hooks
onMounted(async () => {
  await fetchStoresList()
})
</script>

<template>
  <div class="add-member-page">
    <div class="add-member-page-inner">
      <InfoContainer
        :store-name="newMemberInfoData.storeName"
        :hideStoreName="true"
      >
        <a-select
          class="store-name-select"
          v-model:value="newMemberInfoData.storeId"
          :loading="storesList.isLoading"
          :options="storesList.data"
          :field-names="{ label: 'storeName', value: 'storeId' }"
          placeholder="請選擇店家"
          @select="onStoreChange($event, storesList.data)"
        >
          <template #suffixIcon>
            <BaseSvgIcon iconName="dropdown" />
          </template>
        </a-select>
      </InfoContainer>

      <PermissionContainer
        :selected-role="newMemberInfoData.roleId"
        :user-role-in-store-list="userRoleInStoreList.data"
        :disabled="!newMemberInfoData.storeName"
        @update:selectedRole="changePermissionSetting($event, newMemberInfoData)"
      />
      <ContentSettingContainer
        :member-info-data="newMemberInfoData"
        :pcbs-list="pcbsList.data"
        @change-is-forbidden="resetForbiddenPcbsIfNeeded($event, newMemberInfoData)"
      />
    </div>

    <div class="actions-container">
      <a-button
        type="primary"
        size="large"
        :loading="isButtonLoading"
        :disabled="!newMemberInfoData.storeName || !newMemberInfoData.roleId"
        @click="createAddMemberLink(newMemberInfoData)"
      >
        {{ $t('AddMemberPage.Button.CreateAddMemberLink') }}
      </a-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-member-page {
  min-height: calc(100vh - $--header-height - $--page-padding-top - $--page-padding-bottom);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .add-member-page-inner {
    flex: 1;
  }
}

.store-name-select {
  flex: 1;

  :deep(.ant-select-selector) {
    background-color: transparent;
  }

  :deep(.ant-select-selection-item) {
    font-size: 1rem;
    color: $--color-primary;
  }
}

section {
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
}

.actions-container {
  position: sticky;
  background-color: $--background-color-base;
  padding-top: 0.5rem;
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
</style>
