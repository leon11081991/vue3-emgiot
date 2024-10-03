<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AvatarDisplay from '@/components/Base/AvatarDisplay.vue'
import { useFetchStoreMember } from '@/composables/useFetchStoreMember'

// composables
const router = useRouter()
const { storeMembers, fnGetStoreMembers } = useFetchStoreMember()

// refs
const activeKey = ref([])

const goToMemberInfo = (storeId: string, userId: string) => {
  router.push({ name: 'MemberInfo', params: { storeId: storeId, userId: userId } })
}

onMounted(async () => {
  await fnGetStoreMembers()
})
</script>

<template>
  <div class="member-page">
    <div class="collapse-container">
      <a-collapse
        v-for="store in storeMembers.data"
        :key="store.storeId"
        v-model:activeKey="activeKey"
        class="member-collapse"
        collapsible="header"
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
              <h4 class="store-name">雲端掌櫃&nbsp;-&nbsp;{{ store.storeName }}</h4>
            </div>
          </template>

          <ul class="content-list">
            <template
              v-for="member in store.members"
              :key="member.userId"
            >
              <li
                class="content-item"
                @click="goToMemberInfo(store.storeId, member.userId)"
              >
                <!-- <AvatarDisplay
                size="md"
                :name="member.userName"
              /> -->
                <div class="member-wrap">
                  <h6 class="member-name">{{ member.userName }}</h6>
                  <div class="member-level">Lv.{{ member.roleName }}</div>
                </div>
              </li>
            </template>
          </ul>
        </a-collapse-panel>
      </a-collapse>
    </div>
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
  .member-name {
    font-size: 1rem;
    color: $--color-primary;
    font-weight: bold;
  }

  .member-level {
    font-size: 1rem;
    color: $--color-gray-600;
  }
}
</style>
