<script setup lang="ts">
const props = defineProps<{
  data: any
}>()
</script>

<template>
  <div class="account-inquiry-content">
    AccountInquiry

    {{ props.data }}
  </div>
</template>

<style lang="scss" scoped></style>
