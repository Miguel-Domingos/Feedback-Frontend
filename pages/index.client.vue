<script setup lang="ts">
import services from "~/services";
import CardCompany from "@/components/CardCompany.vue";
import Loading from "@/components/Loading.vue";
import type { IUser } from "~/types";

const companies = ref<IUser[]>([]);
const isPageFetching = ref(true);
onBeforeMount(async () => {
  const response = await services.user.all();
  if (response.status == 200) {
    companies.value = response.data?.users!;
  }
  isPageFetching.value = false;
});
</script>
<template>
  <div class="w-full mt-8">
    <h2 class="text-lg font-semibold mb-4">Explore as Empresas</h2>
    <Loading v-if="isPageFetching" />
    <div class="w-full grid grid-cols-4 gap-4" v-else>
      <CardCompany
        v-for="company in companies"
        :key="company.id"
        :company
        v-if="companies?.length > 0"
      />
      <span v-else> Sem empresas de momento </span>
    </div>
  </div>
</template>
