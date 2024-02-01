import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { createApp } from 'vue'
import store from './store';
import App from './App.vue'

createApp(App).use(store).mount('#app')
