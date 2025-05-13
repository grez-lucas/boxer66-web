<template>
  <div class="q-px-md q-py-md q-mx-auto fullscreen login-container">
    <div class="row full-height q-pa-xl justify-center">
      <div class="gt-md col-8 login-left text-white flex column justify-center d-">
        <div class="text q-mb-xl">
          <p class="title">
            {{ $route.meta.title }}
          </p>
          <p class="subtitle">
            Welcome back, please enter your credentials.
          </p>
        </div>

        <div class="flex items-center full-width">
          <span class="q-mr-md">Powered by</span>
          <img alt="Vue Logo" class="logo" src="../assets/logos/vue.svg" />
        </div>
      </div>
      <div class="col-12 col-md-8 col-lg-4 flex column justify-center q-pl-lg">
        <q-card class="login-card">
          <q-card-section class="text-center">
            <img alt="Boxer66-logo" class="logo" src="../assets/logos/boxer66-logo.svg" />
          </q-card-section>

          <q-card-section class="q-mt-lg">
            <router-view />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.logo {
  max-height: 70px;
}

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
