import { defineRouter } from '#q-app/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import { useAuthStore } from 'src/stores/auth-store';
import routes from './routes';
import type { AxiosError } from 'axios';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory);

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  const authStore = useAuthStore();
  Router.beforeEach((to, _, next) => {
    const accessToken = sessionStorage.getItem('access_token') || '';
    const tokenExpirationInstant = Number(sessionStorage.getItem('token_expiration_instant')) || 0;
    const userID = Number(sessionStorage.getItem('user_id')) || 0;

    authStore.setTokenInfo(accessToken, tokenExpirationInstant, userID);
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!authStore.isAuthenticated) {
        next({ name: 'Login' });
      } else {
        try {
          // TODO: Use UserService to get the user and then the store to set it
          return next();
        } catch (error) {
          const errorAxios = error as AxiosError;
          if (errorAxios.status === 401) {
            next({ name: 'Login' });
          }
          console.log(errorAxios.status);
          console.error('Error fetching user data:', error)
        }
        next(); // go wherever I'm going
      }
    } else {
      // The view does not require auth
      next();
    }
  });

  Router.afterEach(to => {
    document.title = to.meta.title as string;
  });


  return Router;
});
