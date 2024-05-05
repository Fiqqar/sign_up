import { createRouter, createWebHistory } from "vue-router";
import { useAlertStore, useAuthStore } from "@/stores";
import accountRoutes from "./account.routes";
import usersRoutes from "./users.routes";
import { Home } from "@/views";

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: "active",
    routes: [
        {path: "/", component: Home},
        {...accountRoutes},
        {...usersRoutes},
        {path : "/:pathMatch(.*)*", redirect: "/"}  // catch all redirects to home page
    ]
});

router.beforeEach(async(to) => {
    const alertStore = useAlertStore();
    alertStore.clear();
    const publicPages = ["/account/login", "/account/register"];
    const authRequired = !publicPages.includes(to.path);
    const authStore = useAuthStore();
    if (authRequired && !authStore.user) {
        authStore.returnUrl = to.fullPath;
        return "/account/login";
    }
});

