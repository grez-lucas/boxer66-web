import { defineStore } from "pinia";
import { AuthLoginBody, AuthLoginResponse } from "src/models/auth.models";
import { authenticateUser, isTokenExpired, successLoginResponseHandler } from "src/services/auth.service";

type AuthStore = {
  token: string;
  tokenExpirationInstant: number;
};

export const useAuthStore = defineStore('auth-store', {
  state: () => ({
    token: '',
    tokenExpirationInstant: 0,
  }) as AuthStore,

  getters: {
    isAuthenticated(state): boolean {
      const isExpired = isTokenExpired(Number(state.tokenExpirationInstant));
      return !isExpired;
    },
  },

  actions: {
    async loginUser(loginBody: AuthLoginBody): Promise<void> {
      try {
        const response = await authenticateUser(loginBody);
        successLoginResponseHandler(response.status, response.data);
      } catch (error) {
        console.error(error);
      }
    },
    setTokenInfo(token: string, expirationInstantDate: number): void {
      this.token = token;
      this.tokenExpirationInstant = expirationInstantDate;
    },
    logoutUser(): void {
      this.token = '';
      this.tokenExpirationInstant = 0;
    }

  }
})
