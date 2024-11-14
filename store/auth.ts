import { defineStore } from "pinia";
import type { IUser, IAuthenticatedUser, IToken } from "@/types";

const userSchema: IUser = {
  id: "",
  name: "",
  email: "",
  description: "",
  role: "",
};

const tokenSchema: IToken = {
  type: "",
  value: "",
};

export const useAuthStore = defineStore("auth", {
  state: (): IAuthenticatedUser => ({
    token: {
      ...tokenSchema,
    },
    user: {
      ...userSchema,
    },
  }),
  actions: {
    register(data: IAuthenticatedUser) {
      this.token = { ...tokenSchema, ...data.token };
      this.user = { ...userSchema, ...data.user };
    },
    logout() {
      this.token = { ...tokenSchema };
      this.user = { ...userSchema };
    },
  },
  persist: true,
});
