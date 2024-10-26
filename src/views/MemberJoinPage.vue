<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFetchStoreMember } from '@/composables/useFetchStoreMember'
import { UtilCommon } from '@/utils/utilCommon'

const { fnMemberJoin } = useFetchStoreMember()

const param = ref<string | null>(null)
const resultMsg = ref<string>('')

onMounted(() => {
  param.value = UtilCommon.getQueryParam('inviteKeyring')
  if (!param.value) return
  fnMemberJoin(param.value).then((resp) => {
    UtilCommon.removeLocalStorage('member-join')
    if (!resp) return
    resultMsg.value = '成員加入成功'
  })
})
</script>

<template>
  <div>{{ resultMsg }}</div>
</template>

<style lang="scss" scoped></style>
