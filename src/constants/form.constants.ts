import type { InputFormContainer } from "src/models/form.models";

export const inputForms: InputFormContainer = {
  loginForm: {
    inputs: [
      {
        key: 'email',
        label: 'Your email',
        required: true,
        requiredMessage: 'Email is required',
        type: 'email'
      },
      {
        key: 'password',
        label: 'Your password',
        required: true,
        requiredMessage: 'Password is required',
        type: 'password'
      }
    ],
    submitText: 'Log In',
    secondaryText: 'Register'
  },
  registerForm: {
    inputs: [
      {
        key: 'email',
        label: 'Your email',
        required: true,
        requiredMessage: 'Email is required'
      },
      {
        key: 'password',
        label: 'Your password',
        required: true,
        requiredMessage: 'Password is required',
        type: 'password'
      }
    ],
    submitText: 'Submit',
    secondaryText: 'Cancel'
  }

}

