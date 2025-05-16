import { defineStore } from "pinia";
import type { AuthLoginBody, SuccessAuthLogin } from "src/models/auth.models";
import { authenticateUser, isTokenExpired } from "src/services/auth.service";

type AuthStore = {
  token: string;
  tokenExpirationInstant: number;
  userID: number;
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
        const responseAuthLogin = response.data as SuccessAuthLogin;
        this.token = responseAuthLogin.token;
        this.userID = responseAuthLogin.userID;
        this.tokenExpirationInstant = responseAuthLogin.tokenExpirationInstant;
      } catch (error) {
        console.error('Login failed in store:', error)
        this.token = '';
        this.userID = 0;
        this.tokenExpirationInstant = 0;
        throw error; // Re-throw the error so it can be handled via notification.
      }
    },
    setTokenInfo(token: string, expirationInstantDate: number, userID: number): void {
      this.token = token;
      this.tokenExpirationInstant = expirationInstantDate;
      this.userID = userID;
    },
    logoutUser(): void {
      this.token = '';
      this.tokenExpirationInstant = 0;
      this.userID = 0;
    }

  }
})
