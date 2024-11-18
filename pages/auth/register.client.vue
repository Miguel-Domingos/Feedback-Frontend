<script setup lang="ts">
definePageMeta({
  alias: "/register",
  layout: "auth",
});

import services from "@/services";
import { UserSchema, type UserSchemaTypes } from "@/validators/User";
import type { z } from "zod";
const credentials = reactive({
  name: "",
  email: "",
  description: "",
  role: "",
  password: "",
});

const loading = ref(false);
const registerError = ref("");
const validationErrors = ref<z.ZodFormattedError<UserSchemaTypes> | null>(null);

async function onRegister() {
  loading.value = true;
  const valid = UserSchema.safeParse(credentials);
  if (valid.success) {
    const response = await services.user.create(credentials);
    if (response.status == 200) {
      await navigateTo("/login");
    } else {
      registerError.value = response.error!;
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
  <div class="flex md:justify-between w-full h-screen">
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
            Colete e analise opiniões com o nosso aplicativo de feedback.
            Capture insights valiosos, melhore experiências e tome decisões mais
            inteligentes com facilidade e eficiência.
          </span>
        </div>
      </div>
      <div class="w-full h-12 font-semibold text-center opacity-75">
        © 2024 Feedback. Todos os direitos reservados.
      </div>
    </div>
    <div
      class="flex flex-col items-center justify-between w-full h-full px-4 overflow-auto"
    >
      <div
        class="relative flex flex-col items-center justify-center w-full flex-1 max-w-md"
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
          <span class="font-medium">crie um conta e deixe o seu feedback</span>
        </div>
        <div class="flex flex-col items-center justify-center w-full gap-2">
          <Message
            v-if="registerError"
            class="flex justify-center w-full"
            severity="error"
            >{{ registerError }}</Message
          >

          <div class="flex gap-2 w-full flex-col md:flex-row">
            <div class="flex flex-col w-full gap-1">
              <label for="email">Nome</label>
              <InputText
                id="name"
                v-model="credentials.name"
                aria-describedby="name-help"
                :invalid="!!validationErrors?.name?._errors[0]"
              />
              <small id="name-help" class="text-red-500">{{
                validationErrors?.name?._errors[0]
              }}</small>
            </div>

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
          </div>

          <div class="flex flex-col w-full gap-1">
            <label for="email">Descrição</label>
            <Textarea
              id="description"
              v-model="credentials.description"
              aria-describedby="description-help"
              :invalid="!!validationErrors?.description?._errors[0]"
              rows="5"
              cols="30"
            />

            <small id="description-help" class="text-red-500">{{
              validationErrors?.description?._errors[0]
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

          <div class="flex flex-col w-full gap-1">
            <label>Tipo de usuário</label>
            <div class="flex flex-wrap gap-4">
              <div class="flex items-center gap-2">
                <RadioButton
                  v-model="credentials.role"
                  inputId="user"
                  name="user"
                  value="user"
                  :invalid="!!validationErrors?.role?._errors[0]"
                />
                <label for="user">Usuário</label>
              </div>
              <div class="flex items-center gap-2">
                <RadioButton
                  v-model="credentials.role"
                  inputId="company"
                  name="company"
                  value="company"
                  :invalid="!!validationErrors?.role?._errors[0]"
                />
                <label for="company">Empresa</label>
              </div>
            </div>
            <small id="email-help" class="text-red-500">{{
              validationErrors?.role?._errors[0]
            }}</small>
          </div>

          <div class="w-full flex flex-col gap-8 items-center mt-2">
            <Button
              class="w-full"
              label="Criar conta"
              @click="onRegister()"
              :loading="loading"
            />

            <div class="text-sm">
              Já tem uma conta?
              <NuxtLink to="/login">
                <span class="text-primary font-semibold">Entrar</span>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
      <div
        class="block w-full max-h-12 min-h-12 h-12 text-sm font-semibold text-center opacity-75 md:hidden"
      >
        © 2024 Feedback. Todos os direitos reservados.
      </div>
    </div>
  </div>
</template>
