<script setup lang="ts">
definePageMeta({
  alias: "/login",
  layout: "auth",
});

import axios from "axios";
import services from "@/services";
import { AuthSchema, type AuthSchemaTypes } from "@/validators/Auth";
import type { z } from "zod";
import { useAuthStore } from "@/store";
const credentials = reactive({
  email: "",
  password: "",
});

const loading = ref(false);
const authStore = useAuthStore();
const loginError = ref("");
const validationErrors = ref<z.ZodFormattedError<AuthSchemaTypes> | null>(null);

async function onLogin() {
  loading.value = true;
  const valid = AuthSchema.safeParse(credentials);
  if (valid.success) {
    const response = await services.auth.login(credentials);
    console.log(response);
    if (response.status == 200) {
      authStore.register(response.data);
      await navigateTo("/");
    } else {
      loginError.value = response.error!;
    }
  } else {
    validationErrors.value = valid.error.format();
  }
  loading.value = false;
}

watch(credentials, () => {
  if (validationErrors.value) {
    validationErrors.value = null;
  }
});
</script>

<template>
  <div class="flex justify-between w-full h-screen">
    <div
      class="flex-col items-center justify-between hidden w-full h-full px-4 border-r border-solid shadow-xl md:flex"
    >
      <div class="flex items-center justify-center w-full h-full max-w-md">
        <div class="flex flex-col gap-6">
          <span class="leading-[0.1] text-9xl"> * </span>
          <div class="flex flex-col gap-2">
            <span class="text-4xl font-semibold">Olá👋🏿</span>
            <span class="text-4xl font-semibold">Feedback </span>
          </div>
          <span class="font-semibold">
            Mantenha-se organizado e produtivo com nosso aplicativo de lista de
            tarefas. Crie, edite e acompanhe suas tarefas diárias de maneira
            simples e eficiente.
          </span>
        </div>
      </div>
      <div class="w-full h-12 font-semibold text-center opacity-75">
        © 2024 feedback. Todos os direitos reservados.
      </div>
    </div>
    <div class="flex flex-col items-center justify-between w-full h-full px-4">
      <div
        class="relative flex flex-col items-center justify-center w-full h-full max-w-sm gap-7"
      >
        <div class="absolute top-4 right-0">
          <Button
            as="router-link"
            to="/"
            severity="secondary"
            label="Home"
            icon="pi pi-arrow-left"
            size="small"
          />
        </div>
        <div class="flex flex-col w-full gap-1">
          <span class="flex text-4xl font-semibold"
            >Bem-vindo <span class="block md:hidden">👋🏿</span></span
          >
          <span class="font-medium">faça login e deixe o seu feedback</span>
        </div>
        <div class="flex flex-col items-center justify-center w-full gap-2">
          <Message
            v-if="loginError"
            class="flex justify-center w-full"
            severity="error"
            >{{ loginError }}</Message
          >
          <div class="flex flex-col w-full gap-1">
            <label for="email">Email</label>
            <InputText
              id="email"
              v-model="credentials.email"
              aria-describedby="email-help"
              :invalid="!!validationErrors?.email?._errors[0]"
            />
            <small id="email-help" class="text-red-500">{{
              validationErrors?.email?._errors[0]
            }}</small>
          </div>

          <div class="flex flex-col w-full gap-1">
            <label for="password">Senha</label>
            <Password
              id="password"
              :feedback="false"
              class="w-full *:w-full"
              v-model="credentials.password"
              toggleMask
              :invalid="!!validationErrors?.password?._errors[0]"
            />
            <small id="email-help" class="text-red-500">{{
              validationErrors?.password?._errors[0]
            }}</small>
          </div>

          <div class="w-full flex flex-col gap-8 items-center mt-2">
            <Button
              class="w-full"
              label="Login"
              @click="onLogin"
              :loading="loading"
            />

            <div class="text-sm">
              Novo no Feedback?
              <NuxtLink to="/register">
                <span class="text-primary font-semibold">Criar conta</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div
        class="block w-full h-12 text-sm font-semibold text-center opacity-75 md:hidden"
      >
        © 2024 Feedback. Todos os direitos reservados.
      </div>
    </div>
  </div>
</template>
