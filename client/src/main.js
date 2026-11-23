import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import './assets/styles/main.css';

// Orden importante: Pinia primero, porque el router usa el store en sus guardias.
createApp(App).use(createPinia()).use(router).mount('#app');
