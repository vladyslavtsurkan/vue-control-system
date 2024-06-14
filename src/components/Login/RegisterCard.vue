<template>
  <div class="w-full max-w-xl mx-auto mt-20">
    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" @submit.prevent="handleSubmit">
      <form-error v-if="isError" :close-message="closeErrorMessage" text="Помилка реєстрації" />
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
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="firstName">
          Ім'я
        </label>
        <text-input
            id="firstName"
            v-model="firstName"
            required
            type="text"
            placeholder="Ім'я"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="lastName">
          Прізвище
        </label>
        <text-input
            id="lastName"
            v-model="lastName"
            required
            type="text"
            placeholder="Прізвище"
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
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPassword">
          Підтвердіть пароль
        </label>
        <text-input
            id="confirmPassword"
            v-model="confirmPassword"
            required
            type="password"
            placeholder="******************"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div class="flex items-center justify-between">
        <action-button text="Зареєструватися" />
      </div>
    </form>
    <div class="text-center">
      <p class="text-gray-600 text-xs mb-2">Вже зареєстровані?</p>
      <action-button text="Увійти" type="secondary" @click="redirectToLogin" />
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

import ActionButton from "@/components/Shared/ActionButton.vue";
import TextInput from "@/components/Shared/TextInput.vue";
import { useUserStore } from "@/stores/user";
import FormError from "@/components/Shared/FormError.vue";

const userStore = useUserStore();

const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const firstName = ref("");
const lastName = ref("");

const isError = ref(false);

const router = useRouter();

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    console.log("Passwords do not match");
    return;
  }
  try {
    const result = await userStore.REGISTER_USER(
      username.value,
      firstName.value,
      lastName.value,
      password.value
    );
    if (result) {
      await router.push({name: "Home"});
    } else {
      isError.value = true;
    }
  } catch (e) {
    isError.value = true;
  }
};

const closeErrorMessage = () => {
  isError.value = false;
};

const redirectToLogin = () => {
  router.push({name: "Login"});
};
</script>