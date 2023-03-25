import { createApp } from "vue";
import TDesign from "tdesign-vue-next";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);

app.use(TDesign);

app.mount("#app");
