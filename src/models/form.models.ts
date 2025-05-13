export interface InputForm {
  key: string;
  label: string;
  required: boolean;
  requiredMessage?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'file';
}

export interface BodyForm {
  [key: string]: never;
}

export type InputFormContainer = Record<RegularFormTypes, FormContainerBody>;

export interface FormContainerBody {
  inputs: InputForm[];
  title?: string;
  submitText: string;
  secondaryText?: string;
}

export type RegularFormTypes =
  | 'loginForm'
  | 'registerForm'
