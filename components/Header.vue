<script setup lang="ts">
import { useAuthStore } from "~/store";
import { storeToRefs } from "pinia";
const userStore = storeToRefs(useAuthStore());
const menu = useTemplateRef("menu");
const items = ref([
  {
    label: "Perfil",
    route: `/user/${userStore.user.value.id}`,
  },
  {
    label: "Sair",
    route: "/logout",
  },
]);

const toggle = (event: Event) => {
  menu.value?.toggle(event);
};
</script>
<template>
  <header class="w-full h-14 flex items-center justify-between">
    <div>
      <NuxtLink to="/">
        <h1 class="font-semibold text-2xl">Feedback</h1>
      </NuxtLink>
    </div>
    <template v-if="!!userStore.token.value.value">
      <div>
        <Avatar
          :label="userStore.user.value.name[0]"
          @click="toggle"
          size="large"
          shape="circle"
          aria-haspopup="true"
          aria-controls="overlay_menu"
          class="cursor-pointer"
        />

        <Menu ref="menu" id="overlay_menu" :model="items" :popup="true">
          <template #item="{ item, props }">
            <NuxtLink
              v-if="item.route"
              v-slot="{ href, navigate }"
              :to="item.route"
              custom
            >
              <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                <span :class="item.icon" />
                <span class="ml-2">{{ item.label }}</span>
              </a>
            </NuxtLink>
          </template>
        </Menu>
      </div>
    </template>
    <template v-else>
      <div class="flex gap-2">
        <Button label="Entrar" as="router-link" size="small" to="/login" />
        <Button
          label="Criar conta"
          as="router-link"
          severity="secondary"
          size="small"
          to="/register"
        />
      </div>
    </template>
  </header>
</template>
