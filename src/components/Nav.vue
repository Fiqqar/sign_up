<script setup>
import { useAuthStore } from '@/stores'
const authStore = useAuthStore();
</script>

<template>
    <nav v-show="authStore.user" class="navbar navbar-expand navbar-dark bg-dark">
        <div class="navbar-nav">
            <router-link class="nav-item nav-link" to="/">Home</router-link>
            <router-link class="nav-item nav-link" to="/Users">User</router-link>
            <button class="btn btn-link nav-item nav-link" @click="authStore.logout()">Log Out</button>
        </div>
    </nav>
</template>