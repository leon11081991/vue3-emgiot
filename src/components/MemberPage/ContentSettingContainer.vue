<script setup lang="ts">
/* import */
import type { StoreMemberInfoDataType } from '@/models/types/storeMember.types'
import { Empty } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'

/* i18n */
const { t: $t } = useI18n()

/* defineProps */
const props = defineProps<{
  memberInfoData: StoreMemberInfoDataType
  pcbsList: any[]
}>()

/* defineEmits */
const emit = defineEmits<{
  (
    e: 'update:memberInfoData',
    payload: { value: boolean | string | string[]; key: keyof StoreMemberInfoDataType }
  ): void
}>()

/* functions */
const onUpdateData = (val: boolean | string | string[], key: keyof StoreMemberInfoDataType) => {
  emit('update:memberInfoData', { value: val, key })
}
</script>

<template>
  <section class="content-setting-container">
    <h4 class="section-title">{{ $t('MemberInfoPage.ContentSettingContainer.Title') }}</h4>

    <div class="content-setting">
      <p class="content-setting-label">
        {{ $t('MemberInfoPage.ContentSettingContainer.SettingLabel.ForbiddenPcbs') }}
        <span v-if="props.memberInfoData?.forbiddenPcbs?.length > 0"
          >({{ props.memberInfoData?.forbiddenPcbs?.length }}台)</span
        >
      </p>
      <a-switch
        :checked="props.memberInfoData.isForbidden"
        :disabled="!props.memberInfoData.storeId"
        @change="onUpdateData($event, 'isForbidden')"
      />
    </div>

    <div
      class="device-list"
      :class="{ expanded: memberInfoData.isForbidden }"
    >
      <div class="device-list-inner">
        <a-empty
          v-if="!props.pcbsList"
          :image="Empty.PRESENTED_IMAGE_SIMPLE"
        />
        <a-checkbox-group
          :value="props.memberInfoData.forbiddenPcbs"
          @change="onUpdateData($event, 'forbiddenPcbs')"
        >
          <template
            v-for="option in props.pcbsList"
            :key="option.pcbId"
          >
            <a-checkbox :value="option.pcbId">
              <div class="checkbox-item">
                <span
                  v-if="option.groupName"
                  class="group-tag"
                  >{{ option.groupName }}</span
                >
                <span class="name-text">{{ option.machineName }}</span>
              </div>
            </a-checkbox>
          </template>
        </a-checkbox-group>
      </div>
    </div>
    <div class="content-setting">
      <p class="content-setting-label">
        {{ $t('MemberInfoPage.ContentSettingContainer.SettingLabel.IsGoodsManagement') }}
      </p>
      <a-switch
        :checked="props.memberInfoData.isGoodsManagement"
        @change="onUpdateData($event, 'isGoodsManagement')"
      />
    </div>
    <div class="content-setting">
      <p class="content-setting-label">
        {{ $t('MemberInfoPage.ContentSettingContainer.SettingLabel.IsSpecial') }}
      </p>
      <a-switch
        :checked="props.memberInfoData.isSpecial"
        @change="onUpdateData($event, 'isSpecial')"
      />
    </div>
    <div class="content-setting">
      <p class="content-setting-label">
        {{ $t('MemberInfoPage.ContentSettingContainer.SettingLabel.IsInvisibleToThisUser') }}
      </p>
      <a-switch
        :checked="props.memberInfoData.isInvisibleToThisUser"
        @change="onUpdateData($event, 'isInvisibleToThisUser')"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.section-title {
  margin-bottom: 1rem;
  color: $--color-gray-600;
}

.content-setting-container {
  display: flex;
  flex-direction: column;
  margin-inline: 1rem;

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
</style>
