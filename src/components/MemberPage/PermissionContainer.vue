<script setup lang="ts">
import type { UserRoleInStoreResType } from '@/models/types/dropdown.type'
import { useI18n } from 'vue-i18n'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'

const { t: $t } = useI18n()

const props = withDefaults(
  defineProps<{
    selectedRole: string
    userRoleInStoreList: UserRoleInStoreResType[]
    isLoading: boolean
    disabled?: boolean
  }>(),
  {
    selectedRole: ''
  }
)

const emit = defineEmits<{
  (e: 'update:selectedRole', value: string): void
}>()

const changeLevel = (val: string) => {
  emit('update:selectedRole', val)
}
</script>

<template>
  <section class="permission-container">
    <h4 class="section-title">{{ $t('MemberInfoPage.PermissionContainer.Title') }}</h4>

    <p
      v-if="!props.disabled && !props.isLoading && props.userRoleInStoreList.length === 0"
      class="warning-msg"
    >
      {{ $t('MemberInfoPage.PermissionContainer.WarningMsg') }}
    </p>

    <a-select
      v-else
      class="level-select"
      :value="props.selectedRole"
      size="large"
      :options="props.userRoleInStoreList"
      :field-names="{ label: 'roleName', value: 'roleId' }"
      :loading="props.isLoading"
      :disabled="props.disabled"
      @change="changeLevel"
    >
      <template #suffixIcon>
        <BaseSvgIcon iconName="dropdown" />
      </template>
    </a-select>
  </section>
</template>

<style lang="scss" scoped>
.permission-container {
  display: flex;
  flex-direction: column;
  margin-inline: 1rem;
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

.warning-msg {
  font-size: 0.75rem;
  color: $--color-danger;
}
</style>
