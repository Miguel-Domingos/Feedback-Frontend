<script setup lang="ts">
import { useDate } from "@/composables";
import services from "~/services";
import { useAuthStore } from "~/store";
import type { IComment } from "~/types";
const { dateDifference } = useDate();

const authStore = useAuthStore();

const props = defineProps<{ comment: IComment }>();
const emits = defineEmits(["updated", "deleted"]);
const isDeleting = ref(false);

async function onDelete() {
  isDeleting.value = true;
  const response = await services.comment.delete(props.comment.id as any);
  if (response.status == 200) {
    isDeleting.value = false;
    emits("deleted");
  }
}

// const updatedComment = ref("");
// async function onUpdate() {
//   const response = await services.comment.update({
//     comment_id: props.comment.id,
//     content: updatedComment.value,
//   });

//   if (response.status == 200) {
//     emits("update");
//   }
// }
</script>
<template>
  <div class="w-full bg-slate-100 flex flex-col gap-4 px-4 py-2 rounded">
    <div class="w-full flex items-center justify-between text-sm font-semibold">
      <span class="">{{ comment.author }}</span>
      <Button
        v-if="comment.userId == authStore.user.id"
        @click="onDelete()"
        label="apagar"
        severity="secondary"
        size="small"
        :loading="isDeleting"
      />
    </div>
    <div class="flex justify-between items-center">
      <div class="font">
        <span>{{ comment.content }}</span>
      </div>
      <div class="text-sm font-semibold">
        <span>{{ dateDifference(comment.createdAt) }}</span>
      </div>
    </div>
  </div>
</template>
