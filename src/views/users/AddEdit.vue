<script setup>
    import { Form, Field } from 'vee-validate';
    import * as Yup from 'yup';
    import { useRoute } from 'vue-router';
    import { storeToRefs } from 'pinia';
    import { useUsersStore, useAlertStore } from "@/stores";
    import { router } from '@/router';

    const userStore = useUsersStore();
    const alertStore = useAlertStore();
    const route = useRoute();
    const id = route.params.id;

    let title = "Add User";
    let user = null;
    if (id) {
        title = "Edit User";
        {user} = storeToRefs(userStore);
        userStore.getById(id);
    }

    const schema = Yup.object().shape({
        username: Yup.string().required("Username Required"),
        password: Yup.string().required("Password Required")
        .min(8, "Password must be at least 8 characters")
    });
    
    async function onSubmit(values) {
        try {
            let message;
            if (user) {
                await userStore.update(user.value.id, values);
                message = "User updated successfully"
            } else {
                await userStore.register(values);
                message = "User added successfully"
            }
            await router.push("/users")
            alertStore.success(message);
        } catch (error) {
            alertStore.error(error);
        }
    }
</script>]
<template>
        <h1>{{ title }}</h1>
        <template v-if="!(user?.loading || user?.error)">
            <form @submit="onSubmit()" :validation-schema="schema" :initial-values="user" v-slot="{errors, isSubmitting}">
            <div class="form-row">
                
            </div>
            </form>
        </template>
</template>