<!-- src/components/LoginCard.vue -->
<template>
  <div class="w-full max-w-xl mx-auto mt-20">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Електронна пошта
        </label>
        <text-input
            id="email"
            v-model="username"
            required
            type="text"
            placeholder="Email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
          Пароль
        </label>
        <text-input
            id="password" 
            v-model="password"
            required
            type="password" 
            placeholder="******************"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="flex items-center justify-between">
        <action-button text="Увійти" />
      </div>
    </form>
  </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import ActionButton from "@/components/Shared/ActionButton.vue";
import TextInput from "@/components/Shared/TextInput.vue";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const username = ref("");
const password = ref("");

const router = useRouter();

const handleSubmit = async () => {
  console.log(username.value, password.value);
  const result = await userStore.LOGIN_USER(username.value, password.value);
  if (result) {
    await router.push({name: "Home"});
  }
};
</script>