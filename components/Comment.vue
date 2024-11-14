<script setup lang="ts">
import { useDate } from "@/composables";
import type { IComment } from "~/types";
const { dateDifference } = useDate();

defineProps<{ comment: IComment }>();
</script>
<template>
  <div class="w-full bg-slate-100 px-4 py-2 rounded">
    <div class="w-full flex items-center justify-between text-sm font-semibold">
      <span class="">{{ comment.author }}</span>
      <span>{{ dateDifference(comment.createdAt) }}</span>
    </div>
    <div class="font">
      <span>{{ comment.content }}</span>
    </div>
  </div>
</template>
