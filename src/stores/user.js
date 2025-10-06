

import { defineStore } from "pinia";

export const useUserStore = defineStore("user", {
  state: () => ({
    currentUser: null, 
    nickname: null,    
  }),
  actions: {
    setUser(user, nickname = null) {
      this.currentUser = user;
      this.nickname = nickname;
    },
    logout() {
      this.currentUser = null;
      this.nickname = null;
    },
  },
});