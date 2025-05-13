<template>
  <form-regular :form-body="inputForms.loginForm" @submit="loginHandler" @secondary-buton="goRegisterUserHandler">
    <template #aux-buttons>
      <div class="flex justify-between">
        <div>
          <q-checkbox v-model="remember" color="grey-7" dense label="Remember" />
        </div>
        <div>
          <q-btn flat label="Forgot your password?" />
        </div>
      </div>
    </template>
  </form-regular>
</template>

<script setup lang="ts">
import FormRegular from 'src/components/Form/FormRegular.vue';
import type { AuthLoginBody } from 'src/models/auth.models';
import type { BodyForm } from 'src/models/form.models';
import { useAuthStore } from 'src/stores/auth-store';
import type { Ref } from 'vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { inputForms } from 'src/constants/form.constants';

const authStore = useAuthStore();
const router = useRouter();
const remember: Ref<boolean> = ref(false);

async function loginHandler(body: BodyForm): Promise<void> {
  await authStore.loginUser(body as unknown as AuthLoginBody);
  await router.push({ name: 'Home' });
}

async function goRegisterUserHandler() {
  await router.push({ name: 'Register' })
}
</script>

<style lang="scss" scoped>
.login {
  &-container {
    background-size: cover;
    background-color: sandybrown;

    .login-card {
      padding: 5em 4em 7em 4em;
      border-radius: 1rem;
    }
  }

  &-left {
    .text {
      .title {
        font-size: 3em;
        font-weight: 800;
        text-align: left;
      }

      .subtitle {
        font-size: 0.8125em;
        font-weight: 400;
        letter-spacing: -0.02em;
      }
    }
  }
}
</style>
