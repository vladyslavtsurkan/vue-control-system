<template>
  <div class="flex items-center justify-center h-screen-adjusted bg-gray-200">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-500">404</h1>
      <p class="text-xl mt-4">Сторінка, яку ви шукаєте не існує.</p>
      <action-button class="mt-4" text="На головну"  @click="redirectToHome" />
    </div>
  </div>
</template>


<script setup lang="ts">
import { useRouter } from "vue-router";

import ActionButton from "@/components/Shared/ActionButton.vue";

const router = useRouter();

const redirectToHome = () => {
  router.push({ name: "Home" });
}
</script>


<style scoped>
.h-screen-adjusted {
  height: calc(100vh - 4rem);
}
</style>