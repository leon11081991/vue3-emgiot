<script setup lang="ts">
import type { StoreMemberInfoDataType } from '@/models/types/storeMember.types'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import AvatarDisplay from '@/components/Base/AvatarDisplay.vue'
import { useFetchStoreMember } from '@/composables/useFetchStoreMember'
import { useModal } from '@/composables/useModal'
import { useDropdown } from '@/composables/useDropdown'
import { levelOptions } from '@/constants/common/select.const'

const { storeId, userId } = useRoute().params
const { storeMemberInfo, fnGetStoreMemberInfo, fnUpdateStoreMemberInfo } = useFetchStoreMember()
const { modalVisible, openModal, closeModal } = useModal()
const { pcbsList, fetchPcbsList } = useDropdown()

const memberInfoData = ref<StoreMemberInfoDataType>({} as StoreMemberInfoDataType)

// TODO: get data from api
const mockData = [
  { pcbGroupName: '南部食品機', pcbName: 'W208_01', pcbId: '7878855' },
  { pcbGroupName: '南部食品機', pcbName: 'W208_02', pcbId: '7878856' },
  { pcbGroupName: '南部食品機', pcbName: 'W208b1_01', pcbId: '03' }
]

onMounted(async () => {
  await fnGetStoreMemberInfo({
    storeId: storeId as string,
    userId: userId as string
  })

  memberInfoData.value = {
    ...storeMemberInfo.value.data,
    storeId: storeId as string
  }

  await fetchPcbsList(storeId as string)
})
</script>

<template>
  {{ memberInfoData }}

  {{ pcbsList.data }}
  <div class="member-info-page">
    <section class="info-container">
      <div class="store-info-container">
        <AvatarDisplay
          size="lg"
          :name="memberInfoData?.storeName"
          :charNum="2"
        />
        <h4 class="store-name">雲端掌櫃&nbsp;-&nbsp;{{ memberInfoData.storeName }}</h4>
      </div>
      <div class="user-info-container">
        <AvatarDisplay
          size="md"
          :name="memberInfoData.userName"
        />
        <div class="user-wrap">
          <h6 class="user-name">{{ memberInfoData.userName }}</h6>
          <div class="user-level">Lv.{{ '1' }}</div>
        </div>
      </div>
    </section>

    <section class="setting-container">
      <h4 class="section-title">權限設定</h4>

      <a-select
        class="level-select"
        v-model:value="memberInfoData.roleOrder"
        size="large"
        :options="levelOptions"
        :field-names="{ label: 'name', value: 'id' }"
      >
        <template #suffixIcon>
          <BaseSvgIcon iconName="dropdown" />
        </template>
      </a-select>
    </section>

    <section class="content-setting-container">
      <h4 class="section-title">權限內容設定</h4>

      <div class="content-setting">
        <p class="content-setting-label">
          啟用裝置過濾
          <span v-if="memberInfoData.forbiddenPcbs?.length > 0"
            >({{ memberInfoData.forbiddenPcbs?.length }}台)</span
          >
        </p>
        <a-switch v-model:checked="memberInfoData.isForbidden" />
      </div>

      <div
        class="device-list"
        :class="{ expanded: memberInfoData.isForbidden }"
      >
        <div class="device-list-inner">
          <a-checkbox-group
            v-model:value="memberInfoData.forbiddenPcbs"
            @change="() => console.log(memberInfoData.forbiddenPcbs)"
          >
            <template
              v-for="option in pcbsList.data"
              :key="option.pcbId"
            >
              <a-checkbox :value="option.pcbId">
                <div class="checkbox-item">
                  <span class="group-tag">{{ option.groupName }}</span>
                  <span class="name-text">{{ option.machineName }}</span>
                </div>
              </a-checkbox>
            </template>
          </a-checkbox-group>
        </div>
      </div>
      <div class="content-setting">
        <p class="content-setting-label">商品管理權限</p>
        <a-switch v-model:checked="memberInfoData.isGoodsManagement" />
      </div>
      <div class="content-setting">
        <p class="content-setting-label">特殊商品可見</p>
        <a-switch v-model:checked="memberInfoData.isSpecial" />
      </div>
      <div class="content-setting">
        <p class="content-setting-label">屏蔽，對方無法在成員列表看見你</p>
        <a-switch v-model:checked="memberInfoData.isSpecial" />
      </div>
    </section>

    <div class="actions-container">
      <a-button
        type="primary"
        size="large"
        @click="fnUpdateStoreMemberInfo({ ...memberInfoData, storeId: storeId as string })"
      >
        變更
      </a-button>
      <a-button
        type="delete"
        size="large"
        ghost
        @click="openModal"
      >
        刪除成員
      </a-button>
    </div>
  </div>

  <a-modal
    v-model:visible="modalVisible"
    class="delete-member-modal primary"
  >
    <template #title>
      <div class="modal-header modal-header-primary">
        <span class="modal-title">{{ '刪除成員' }}</span>
      </div>
    </template>

    <div class="delete-member-container">請確認是否將該成員移出此店家。</div>

    <template #footer>
      <div class="delete-member-actions-container">
        <a-button type="primary">確定</a-button>
        <a-button
          type="primary"
          ghost
          @click="closeModal"
          >取消</a-button
        >
      </div>
    </template>
  </a-modal>
</template>

<style lang="scss" scoped>
.member-info-page {
}

section {
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
}

.info-container {
  padding: 0.75rem;
  border-radius: $--border-radius-middle;
  border: 1px solid $--color-gray-400;

  .store-info-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding-bottom: 0.5rem;

    .store-name {
      flex: 1;
      font-size: 1.5rem;
      color: $--color-primary;
      font-weight: bold;
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
      font-size: 1rem;
      color: $--color-gray-600;
    }
  }
}

.section-title {
  margin-bottom: 1rem;
  color: $--color-gray-600;
}

.level-select {
  :deep(.ant-select-selection-item) {
    display: flex;
    justify-content: center;
    color: $--color-primary;
  }
}

.setting-container,
.content-setting-container {
  display: flex;
  flex-direction: column;
  margin-inline: 1rem;
}

.content-setting-container {
  .content-setting {
    display: flex;
    align-items: center;
    padding-left: 1rem;

    @include media-breakpoint-down(sm) {
      padding-left: 1rem;
    }

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  .content-setting-label {
    flex: 1;
    color: $--color-gray-800;
  }

  .devices-container {
    display: flex;
    flex-direction: column;
  }

  .device-list {
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease;

    &.expanded {
      grid-template-rows: 1fr;
      margin-bottom: 1rem;
    }
  }

  .device-list-inner {
    margin-inline: 2rem;
    overflow: hidden;

    .ant-checkbox-group {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .checkbox-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .name-text {
          color: $--color-primary;
        }
      }
    }
  }
}

.actions-container {
  // position: fixed;
  position: sticky;
  background-color: $--background-color-base;
  padding-inline: $--page-padding-x;
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
