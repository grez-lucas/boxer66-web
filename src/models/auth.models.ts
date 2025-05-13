export interface AuthLoginBody {
  email: string;
  password: string
}

export type AuthLoginResponse =
  | SuccessAuthLogin
  | ErrorAuthLogin
  | null;

export interface SuccessAuthLogin {
  token: string;
  tokenExpirationInstant: number;
  userID: number;
}

export interface ErrorAuthLogin {
  status: string;
  message: string;
}
