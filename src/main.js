import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import LoadScript from "vue-plugin-load-script";

import "@/styles/index.css";

const app = createApp(App);

app.config.globalProperties.$myGlobalVariable = reactive({
	windowWidth: null,
	mobileWindowWidth: 700,
	accessToken: "",
});

app.use(router).use(LoadScript).mount("#app");
