import { api } from 'src/boot/axios';
import type { AuthLoginBody, AuthLoginResponse } from 'src/models/auth.models';
import type { AxiosResponse } from 'axios';

export function authenticateUser(
  body: AuthLoginBody
): Promise<AxiosResponse<AuthLoginResponse>> {
  return api.post<AuthLoginResponse>('/api/login', body);
}

export function isTokenExpired(timestamp: number): boolean {
  const expirationInstantDate = new Date(timestamp || 0);
  const now = new Date();
  return now.getTime() > expirationInstantDate.getTime();
}
