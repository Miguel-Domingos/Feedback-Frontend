<script setup lang="ts">
import services from "~/services";
import type { IUser } from "~/types";
import { useAuthStore } from "~/store";
import Comment from "@/components/Comment.vue";
import Loading from "@/components/Loading.vue";

const userStoreToken = useAuthStore().token;
const { id } = useRoute().params;
const user = ref<IUser | null>(null);
const newComment = ref("");

const isCommentLoading = ref(false);
const isPageFetching = ref(true);

async function onComment() {
  if (id && newComment.value) {
    isCommentLoading.value = true;
    const response = await services.comment.create({
      company_id: id as unknown as number,
      content: newComment.value,
    });

    if (response.status == 200) {
      await fetchProfile();
      newComment.value = "";
      isCommentLoading.value = false;
    }
  }
}

async function fetchProfile() {
  const response = await services.user.profile(id);
  if (response.status == 200) {
    user.value = response.data?.user!;
  }
  isPageFetching.value = false;
}

onBeforeMount(async () => {
  await fetchProfile();
});
</script>

<template>
  <Loading v-if="isPageFetching" />
  <template v-else>
    <div
      v-if="user?.id"
      class="w-full flex flex-col gap-4 max-w-4xl mx-auto py-2"
    >
      <div class="w-full flex md:flex-row flex-col-reverse gap-4">
        <div class="w-full flex flex-col gap-2 md:mt-8">
          <h2 class="font-semibold text-3xl">{{ user?.name }}</h2>
          <div class="text-sm font-semibold flex gap-1">
            <span>account type: </span>
            <span class="text-primary"> {{ user?.role }}</span>
          </div>
          <div>
            <span v-if="user.description">
              {{ user.description }}
            </span>

            <span v-else> sem descrição </span>
          </div>
        </div>
        <div class="w-full md:max-w-96 rounded overflow-hidden">
          <img
            src="/public/image.jpg"
            class="w-full object-cover"
            alt=""
            srcset=""
          />
        </div>
      </div>
      <div
        v-if="user?.comments?.length! > 0 "
        class="w-full flex flex-col gap-4"
      >
        <Comment
          @deleted="fetchProfile()"
          v-for="comment in user?.comments"
          :comment
          :key="comment.id"
        />
      </div>
      <div v-else class="w-full" v-if="user.role != 'user'">
        <span>Sem feedbacks</span>
      </div>
      <div
        class="w-full flex flex-col items-end gap-2"
        v-if="!!userStoreToken.value && user?.role == 'company'"
      >
        <Textarea
          v-model="newComment"
          class="w-full"
          cols="30"
          placeholder="deixa o seu feedback"
          :disabled="isCommentLoading"
        />

        <Button
          label="Enviar feedback"
          :disabled="!newComment"
          @click="onComment"
          :loading="isCommentLoading"
        />
      </div>
    </div>
    <span v-else> Empresa ou usuário não encontrado </span>
  </template>
</template>
