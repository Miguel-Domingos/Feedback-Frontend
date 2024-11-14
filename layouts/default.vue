<script setup lang="ts">
import Header from "@/components/Header.vue";
</script>
<template>
  <div class="w-full h-full flex flex-col container mx-auto px-4">
    <Header />
    <div class="w-full flex-1">
      <slot />
    </div>
  </div>
</template>
