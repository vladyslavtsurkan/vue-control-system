<template>
  <header class="w-full text-sm h-16">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <div
        class="mx-auto flex h-full flex-nowrap border-b border-solid border-brand-gray-1 px-8"
      >
        <router-link :to="{ name: 'Home' }" class="flex h-full items-center text-xl"
          >PLC informer by VT
        </router-link>

        <nav class="ml-12 h-full">
          <ul class="flex h-full list-none">
            <li
              v-for="menuItem in menuItems"
              :key="menuItem.text"
              class="ml-9 h-full first:ml-0"
            >
              <router-link :to="menuItem.url" class="flex h-full items-center py-2.5">{{
                menuItem.text
              }}</router-link>
            </li>
          </ul>
        </nav>

        <div class="ml-auto flex h-full items-center">
          <div v-if="isLoggedIn" class="flex">
            <profile-image class="mr-7 pt-2" />
            <action-button text="Вийти" type="tertiary" @click="logout" />
          </div>
          <action-button v-else text="Увійти" @click="redirectToLogin" />
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";

import { useUserStore } from "@/stores/user";

import ActionButton from "@/components/Shared/ActionButton.vue";
import ProfileImage from "@/components/Navigation/ProfileImage.vue";

const menuItems = ref([
  { text: "Головна", url: "/" },
]);

const userStore = useUserStore();
const LOGOUT_USER = userStore.LOGOUT_USER;
const isLoggedIn = computed(() => userStore.isLoggedIn);

const router = useRouter();

const redirectToLogin = () => {
  router.push({ name: "Login" });
};

const logout = () => {
  LOGOUT_USER();
  router.push({ name: "Login" });
};
</script>
