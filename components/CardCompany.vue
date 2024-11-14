<script setup lang="ts">
import type { IUser } from "~/types";

defineProps<{ company: IUser }>();
</script>

<template>
  <div
    class="w-full rounded flex flex-col gap-4 bg-slate-100 p-2 shadow overflow-hidden"
  >
    <NuxtLink :to="`/user/${company.id}`">
      <div class="w-full rounded overflow-hidden">
        <img src="/public/image.jpg" alt="" srcset="" />
      </div>
    </NuxtLink>
    <div class="flex flex-col">
      <span>{{ company.name }}</span>
      <span>{{ company.description }}</span>
    </div>
  </div>
</template>
