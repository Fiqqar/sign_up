<template>
    <div v-if="user">
        <h1>Hi {{ user.username }}</h1>
        <p>You're logged in</p>
        <p><router-link to="/users">User Data</router-link></p>
    </div>
</template>
<script setup>
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores';
const AuthStore = useAuthStore();
const {user} = storeToRefs(AuthStore);
</script>