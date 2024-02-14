import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { createApp } from "vue";
import store from "./store";
import App from "./App.vue";
import router from "./router/index.js";

const app = createApp(App);
app.use(router);
app.use(store);

app.mount("#app");
