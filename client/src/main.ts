import './assets/main.css'

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import * as VueRouter from 'vue-router';
import MainPage from './components/MainPage.vue';
import MonoalphabeticApp from './components/MonoalphabeticApp.vue';

const Home = { template: MainPage };
const Monoalphabetic = { template: MonoalphabeticApp };

const routes = [
  { path: "/", component: Home },
  { path: "/monoalphabetic", component: Monoalphabetic },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

const pinia = createPinia();
const app = createApp(MainPage);

app.use(router);
app.use(pinia);
app.mount('#app');