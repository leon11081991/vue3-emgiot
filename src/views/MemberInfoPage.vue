<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import AvatarDisplay from '@/components/Base/AvatarDisplay.vue'
import { useFetchStoreMember } from '@/composables/useFetchStoreMember'
import { levelOptions } from '@/constants/common/select.const'

const { storeId, userId } = useRoute().params
const { fnGetStoreMemberInfo } = useFetchStoreMember()

const value1 = ref(1)
const isShowDeviceList = ref(false)
const checked = ref({
  isGoodsManagement: false,
  isSpecial: false
})

// const pcbOptions = [
//   { pcbGroupName: '南部食品機', pcbName: 'W208_01', pcbId: '01' },
//   { pcbGroupName: '南部食品機', pcbName: 'W208_02', pcbId: '02' },
//   { pcbGroupName: '南部食品機', pcbName: 'W208b1_01', pcbId: '03' }
// ]

onMounted(async () => {
  fnGetStoreMemberInfo({
    storeId: storeId as string,
    userId: userId as string
  })
})
</script>

<template>
  <div class="member-info-page">
    <section class="info-container">
      <div class="store-info-container">
        <AvatarDisplay
          size="lg"
          :name="'大和心心'"
          :charNum="2"
        />
        <h4 class="store-name">
          雲端掌櫃&nbsp;-&nbsp;{{ '大和大和大和大和大和大和大和大和大和大和大和' }}
        </h4>
      </div>
      <div class="user-info-container">
        <AvatarDisplay
          size="md"
          :name="'ccc'"
        />
        <div class="user-wrap">
          <h6 class="user-name">{{ 'ccc' }}</h6>
          <div class="user-level">Lv.{{ '1' }}</div>
        </div>
      </div>
    </section>

    <section class="setting-container">
      <h4 class="section-title">權限設定</h4>
      <a-select
        v-model:value="value1"
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
        <p class="content-setting-label">啟用裝置過濾 <span>(2台)</span></p>
        <a-switch v-model:checked="isShowDeviceList" />
      </div>

      <div
        class="device-list"
        :class="{ expanded: isShowDeviceList }"
      >
        <div class="device-list-inner">
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
          <p>test</p>
        </div>
        <!-- <a-checkbox-group
            v-model:value="checkedList"
            @change="() => console.log(checkedList)"
          >
            <template
              v-for="option in pcbOptions"
              :key="option.value"
            >
              <a-checkbox :value="option.pcbId">
                <div class="checkbox-item">
                  <span class="group-tag">{{ option.pcbGroupName }}</span>
                  <span class="name-text">{{ option.pcbName }}</span>
                </div>
              </a-checkbox>
            </template>
          </a-checkbox-group> -->
      </div>
      <div class="content-setting">
        <p class="content-setting-label">商品管理權限</p>
        <a-switch v-model:checked="checked.isGoodsManagement" />
      </div>
      <div class="content-setting">
        <p class="content-setting-label">特殊商品可見</p>
        <a-switch v-model:checked="checked.isSpecial" />
      </div>
    </section>

    <div class="actions-container">
      <a-button
        type="primary"
        size="large"
      >
        變更
      </a-button>
      <a-button
        type="delete"
        size="large"
        ghost
      >
        刪除成員
      </a-button>
    </div>
  </div>
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
    border-bottom: 1px solid $--color-gray-400;

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
    padding-left: 2rem;

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
    overflow: hidden;
  }
}

.actions-container {
  position: fixed;
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
</style>
