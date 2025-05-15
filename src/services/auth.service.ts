import { api } from 'src/boot/axios';
import type { AuthLoginBody, AuthLoginResponse, SuccessAuthLogin } from 'src/models/auth.models';
import type { AxiosError, AxiosResponse } from 'axios';
import { useAuthStore } from 'src/stores/auth-store';

export async function authenticateUser(
  body: AuthLoginBody
): Promise<AxiosResponse<AuthLoginResponse>> {
  try {
    return await api.post<AuthLoginResponse>('/api/login', body);
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error('Authentication error:', axiosError);
    throw axiosError; // Re-throw the error to be caught in store.
  }
}

export function successLoginResponseHandler(
  status: number,
  response: AuthLoginResponse
): void {
  const store = useAuthStore();
  if (status === 200) {
    const responseAuthLogin = response as SuccessAuthLogin;
    store.setTokenInfo(
      responseAuthLogin.token,
      responseAuthLogin.tokenExpirationInstant,
      responseAuthLogin.userID,
    );
  } else {
    console.log('Received a non-200 status from login');
    throw new Error(`Login failed with status ${status}`);
  }
}

export function isTokenExpired(timestamp: number): boolean {
  const expirationInstantDate = new Date(timestamp || 0);
  const now = new Date();
  return now.getTime() > expirationInstantDate.getTime();
}
