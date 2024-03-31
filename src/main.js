import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import { router } from './router'
import { fakeBackEnd } from './helpers'

fakeBackEnd();
createApp(App).use(createPinia());
createApp(App).use(router);
createApp(App).mount('#app')
