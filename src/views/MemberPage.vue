<script setup lang="ts">
import { Empty } from 'ant-design-vue'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user.stores'
import AvatarDisplay from '@/components/Base/AvatarDisplay.vue'
import BaseSvgIcon from '@/components/Base/SvgIcon.vue'
import FloatButton from '@/components/Base/FloatButton.vue'
import { useFetchStoreMember } from '@/composables/useFetchStoreMember'
import { useDebounce } from '@/composables/useDebounce'
import { useMessage } from '@/composables/useMessage'

// composables
const { t: $t } = useI18n()
const router = useRouter()
const userStore = useUserStore()
const { storeMembers, fetchStoreMembers, fnHideIdentity } = useFetchStoreMember()
const { openMessage } = useMessage()

// refs
const activeKey = ref([])

const isSelfAccount = (targetId: string, userId: string) => {
  return targetId === userId
}

const goToMemberInfo = (storeId: string, userId: string) => {
  router.push({ name: 'MemberInfo', params: { storeId, userId } })
}

const checkIfCanAccess = (
  targetRoleOrder: number,
  userRoleOrder: number,
  storeId: string,
  targetId: string,
  userId: string
) => {
  // 目標等級小於使用者等級，才可以訪問；並且不是自己的帳號才可以訪問
  const canAccess = targetRoleOrder > userRoleOrder

  if (isSelfAccount(targetId, userId)) {
    return openMessage('warning', $t('MemberPage.Message.IsSelfAccount'))
  }

  if (!canAccess) {
    return openMessage('warning', $t('MemberPage.Message.CanNotAccess'))
  }
  goToMemberInfo(storeId, targetId)
}

const changeVisibility = useDebounce(
  async (visibility: boolean, storeId: string, userId: string) => {
    await fnHideIdentity({ storeId, isVisible: visibility })
    const store = storeMembers.value.data.find((store) => store.storeId === storeId)
    if (store) {
      const member = store.members.find((member) => member.userId === userId)
      if (member) {
        member.isVisible = visibility // 更新資料
      }
    }
  },
  300
)

onMounted(async () => {
  await fetchStoreMembers()
})
</script>

<template>
  <div class="member-page">
    <div class="collapse-container">
      <a-empty
        v-if="!storeMembers.data"
        :image="Empty.PRESENTED_IMAGE_SIMPLE"
      />
      <a-collapse
        v-for="store in storeMembers.data"
        :key="store.storeId"
        v-model:activeKey="activeKey"
        class="member-collapse"
        collapsible="header"
        :accordion="true"
      >
        <a-collapse-panel
          :key="store.storeId"
          :showArrow="false"
        >
          <template v-slot:header>
            <div class="collapse-header-wrap">
              <AvatarDisplay
                size="lg"
                :name="store.storeName"
                :charNum="2"
              />
              <h4 class="store-name">
                {{ $t('Common.AppName') }}&nbsp;-&nbsp;{{ store.storeName }}
              </h4>
            </div>
          </template>

          <ul class="content-list">
            <template
              v-for="member in store.members"
              :key="member.userId"
            >
              <li
                class="content-item"
                @click.prevent="
                  checkIfCanAccess(
                    member.roleOrder,
                    userStore.userInfo.roleOrder,
                    store.storeId,
                    member.userId,
                    userStore.userInfo.userId
                  )
                "
              >
                <AvatarDisplay
                  size="md"
                  :name="member.userName"
                  :google-avatar-url="member.photoUrl"
                />
                <div class="member-wrap">
                  <div class="member-container">
                    <h6 class="member-name">{{ member.userName }}</h6>
                    <div class="member-level">
                      <BaseSvgIcon :iconName="`level-${member.roleOrder}`" />
                      {{ $t(`Common.Level`, { level: member.roleOrder }) }}
                    </div>
                  </div>

                  <div
                    v-if="isSelfAccount(member.userId, userStore.userInfo.userId)"
                    class="isVisible-container"
                    @click.stop
                  >
                    <a-checkbox
                      :checked="!member.isVisible"
                      @change="
                        (e: Event) =>
                          changeVisibility(
                            !(e.target as HTMLInputElement).checked,
                            store.storeId,
                            member.userId
                          )
                      "
                      >{{ $t('MemberPage.IsVisible.CheckboxLabel') }}</a-checkbox
                    >
                    <p>{{ $t('MemberPage.IsVisible.HintText') }}</p>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </a-collapse-panel>
      </a-collapse>
    </div>
    <FloatButton @click="router.push({ name: 'AddMember' })" />
  </div>
</template>

<style lang="scss" scoped>
.collapse-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.member-collapse {
  @include base-transition;
  overflow: hidden;

  &:has(.ant-collapse-item-active) {
    border-color: $--color-gray-600;
  }

  :deep(.ant-collapse-item) {
    @include base-transition;
  }

  :deep(.ant-collapse-item.ant-collapse-item-active) {
    border-color: $--color-gray-600;
  }

  :deep(.ant-collapse-header) {
    @include base-transition;
    padding: 0.5rem;
    background-color: $--background-color-base;

    &:hover {
      background-color: $--color-gray-300;
    }

    .collapse-header-wrap {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 1rem;

      .store-name {
        font-size: 1.25rem;
        color: $--color-primary;
        font-weight: bold;
      }
    }

    .ant-collapse-header-text {
      width: 100%;
    }
  }

  :deep(.ant-collapse-content) {
    background-color: $--background-color-base;
    border-top: none;

    .ant-collapse-content-box {
      position: relative;
      margin-inline: 1rem;
      &:before {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        content: '';
        width: 100%;
        height: 1px;
        background-color: $--color-gray-400;
      }
    }
  }
}

.content-list {
  display: flex;
  flex-direction: column;

  .content-item {
    @include base-transition;
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem;
    border-radius: $--border-radius-base;
    cursor: pointer;

    &:hover {
      background-color: $--color-gray-400;
    }
  }
}

.member-wrap {
  display: flex;
  align-items: center;
  gap: 1rem;

  .member-container {
    flex: 1;
  }

  .member-name {
    font-size: 1rem;
    color: $--color-primary;
    font-weight: bold;
  }

  .member-level {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 1rem;
    color: $--color-gray-600;
  }

  .isVisible-container {
    cursor: auto;

    .ant-checkbox-wrapper {
      font-size: 1rem;
      color: $--color-gray-700;
    }

    p {
      color: $--color-gray-600;
    }
  }
}
</style>
