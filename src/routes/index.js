import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: "/", name: "home", component: () => import("@/views/Home.vue") },
    { path: "/cadastro/:id?", name: "cadastro", component: () => import("@/views/Cadastro.vue") },
];

const router = createRouter({
    routes,
    history: createWebHistory(),
});

export default router;