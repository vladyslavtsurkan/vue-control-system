import { ref } from "vue";
import { defineStore } from "pinia";

import { register, login, setToken, clearToken } from "@/api";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);

  const REGISTER_USER = async (
    email: string, firstName: string, lastName: string, password: string
  ): Promise<boolean> => {
    const response = await register(email, firstName, lastName, password);
    if (response.status === 201) {
      await LOGIN_USER(email, password);
      return true;
    } else {
      return false;
    }
  }

  const LOGIN_USER = async (username: string, password: string): Promise<boolean> => {
    const response = await login(username, password);
    if (response.status === 200) {
      setToken(response.data.access_token);
      isLoggedIn.value = true;
      return true;
    } else {
      return false;
    }
  };

  const LOGOUT_USER = () => {
    isLoggedIn.value = false;
    clearToken();
  };

  return {
    isLoggedIn,
    REGISTER_USER,
    LOGIN_USER,
    LOGOUT_USER,
  };
});
