import { api } from 'src/boot/axios';
import type { AuthLoginBody, AuthLoginResponse, SuccessAuthLogin } from 'src/models/auth.models';
import type { AxiosResponse } from 'axios';
import { useAuthStore } from 'src/stores/auth-store';

export function authenticateUser(
  body: AuthLoginBody
): Promise<AxiosResponse<AuthLoginResponse>> {
  return api.post<AuthLoginResponse>('/api/login', body);

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
    );
  } else {
    console.log('Received a non-200 status from login');
  }
}

export function isTokenExpired(timestamp: number): boolean {
  const expirationInstantDate = new Date(timestamp || 0);
  const now = new Date();
  return now.getTime() > expirationInstantDate.getTime();
}
