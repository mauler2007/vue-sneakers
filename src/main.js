import './assets/main.css';

import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import App from './App.vue';
// 1. Define(Import) route components.
// These can be imported from other files
import Home from './pages/Home.vue';
import Favorites from './pages/Favorites.vue';

const app = createApp(App);

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites }
];
// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  history: createWebHistory(),
  routes // short for `routes: routes`
});

app.use(router);
app.use(autoAnimatePlugin);
app.mount('#app');
