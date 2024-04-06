import { createRouter, createWebHistory } from "vue-router";
import TracksView from "../vue/views/TracksView.vue";

const routes = [
	{
		path: "/",
		name: "tracks",
		component: TracksView,
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
