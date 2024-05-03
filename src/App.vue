<script setup>
    import {Nav, Alert} from '@/components/'
    import { useAuthStore } from './stores/auth.store';
    const authStore = useAuthStore();
</script>

<template>
    <div class="app-container" :class="authStore.user && 'bg-light'">
        <Nav></Nav>
        <Alert/>
        <div class="container pt-4 pb-4">
            <router-view></router-view>
        </div>
    </div>
</template>



<style>
@import '@/assets/main.css';
</style>
