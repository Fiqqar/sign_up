<script setup>
import { storeToRefs } from 'pinia';
import { useUsersStore } from '@/stores';
const usersStore = useUsersStore();
const {users} = storeToRefs(usersStore);
usersStore.getAll();
</script>

<template>
    <h1>Users</h1>
    <router-link to="/users/add" class="btn btn-sm btn-succes mb-2" >Add user</router-link>
    <table class="table table-striped">
        <thead>
            <tr>
                <th style="width:45%">Username</th>
                <th style="width:45%">Password</th>
                <th style="width:10%"></th>
            </tr>
        </thead>
        <tbody>
            <template v-if="users.length">
                <tr v-for="user in users" :key="user.id">
                    <td>{{ user.username }}</td>
                    <td>{{ user.password }}</td>
                    <td style="white-space: no-wrap">
                    <router-link :to="`/users/edit/${user.id}`" class="btn btn-sm btn-primary mr-1">Edit</router-link>
                    <button @click="userStore.delete(user.id)" class="btn btn-sm btn-danger btn-delete-user" :disabled="user.isdeleting">
                    <span v-if="user.isdeleting" class="spinner-border spinner-border-sm"></span>
                    <span v-else>Delete</span>
                    </button>
                    </td>
                </tr>
            </template>
            <tr v-if="users.loading">
                <td colspan="4" class="text-center">
                    <span class="spinner-border spinner-border-lg align-center"></span>
                </td>
            </tr>
            <tr v-if="users.error">
                <td colspan="4" class="text-center">
                    <div class="text-danger">Error Loading Data: {{ users.error }}</div>
                </td>
            </tr>
        </tbody>
    </table>
</template>
