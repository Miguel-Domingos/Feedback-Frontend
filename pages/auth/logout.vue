<script setup lang="ts">
definePageMeta({
  alias: "/logout",
  layout: "auth",
});

import services from "~/services";
import Loading from "~/components/Loading.vue";
import { useAuthStore } from "~/store";
onBeforeMount(async () => {
  await services.auth.logout();
  useAuthStore().logout();
  await navigateTo("/");
});
</script>
<template>
  <Loading />
</template>
