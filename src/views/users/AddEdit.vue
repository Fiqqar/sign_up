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
        ({user} = storeToRefs(userStore));
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
            <Form @submit="onSubmit()" :validation-schema="schema" :initial-values="user" v-slot="{errors, isSubmitting}">
            <div class="form-row">
                <div class="form-group col">
                    <label>Username</label>
                    <Field type="text" name="username" :class="{'is-invalid':errors.username}" class="form-control"/>
                    <div class="invalid-feedback">
                        {{ errors.username }}
                    </div>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group col">
                    <label>Password
                        <em v-if="user">(Leave blank to keep the same password)</em>
                    </label>
                    <Field type="password" name="password" :class="{'is-invalid':errors.password}" class="form-control"/>
                    <div class="invalid-feedback">
                        {{ errors.password }}
                    </div>
                </div>
            </div>
            <div class="form-group">
                <button class="btn btn-primary" :disabled="isSubmitting"><span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>Save</button>
                <router-link class="btn-link btn" to="/users">Cancel</router-link>
            </div>
            </Form>
        </template>
        <template v-if="user?.loading">
            <div class="text-center m-5">
                <span class="spinner-border spinner-border-lg align-center">

                </span>
            </div>
        </template>
        <template v-if="user?.error">
            <div class="text-center m-5">
                <div class="text-danger">
                    Error loading user : {{ user.error }}
                </div>
            </div>
        </template>
</template>