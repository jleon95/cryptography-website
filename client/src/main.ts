import './assets/main.css'

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import * as VueRouter from 'vue-router';
import MainPage from './components/MainPage.vue';
import MonoalphabeticApp from './components/MonoalphabeticApp.vue';
import App from './App.vue';

const routes = [
  { path: "/", component: MainPage, meta: { transition: "main" } },
  { path: "/monoalphabetic", component: MonoalphabeticApp, meta: { transition: "monoalphabetic" }, },
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes
});

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.mount('#app');