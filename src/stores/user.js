

import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null,
    nickname: null,
    isAdmin: false,
  }),
  actions: {
    setUser(user, nickname = null, isAdmin = false) {
      this.currentUser = user;
      this.nickname = nickname;
      this.isAdmin = isAdmin;
    },
    logout() {
      this.currentUser = null;
      this.nickname = null;
      this.isAdmin = false;
    },
  },
});