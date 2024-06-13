import { ref } from "vue";
import { defineStore } from "pinia";

import { login, setToken, clearToken } from "@/api";

export const useUserStore = defineStore("user", () => {
  const isLoggedIn = ref(false);

  const LOGIN_USER = async (username: string, password: string): Promise<boolean> => {
    const response = await login(username, password);
    if (response.status === 200) {
      isLoggedIn.value = true;
      setToken(response.data.access_token);
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
    LOGIN_USER,
    LOGOUT_USER,
  };
});
