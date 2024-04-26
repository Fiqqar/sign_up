<script setup>
    import { Form, Field } from 'vee-validate';
    import * as Yup from 'yup';
    import { useUsersStore, useAlertStore } from "@/stores";
    import { router } from '@/router';


    const schema = Yup.object().shape({
        username: Yup.string().required("Username Required"),
        password: Yup.string().required("Password Required")
        .min(8, "Password must be at least 8 characters")
    });

    async function onSubmit(values) {
        const userStore = useUsersStore();
        const alertStore = useAlertStore();
        try {
            await userStore.register(values)
            await router.push("/account/login")
            alertStore.success(Register successful);
        } catch (error) {
            alertStore.error(error);
        }
    }
</script>
<template>
    <div class="card m-3">
        <h4 class="card-header">Register</h4>
        <div class="card-body">
            <Form @submit="onSubmit" :validation-schema="schema" v-slot="{errors, isSubmiting}">
                <div class="form-group">
                    <label>Username</label>
                    <Field type="text" name="username" :class="{'is-invalid':errors.username}" class="form-control"/>
                    <div class="invalid-feedback">
                        {{ errors.username }}
                    </div>
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <Field type="password" name="password" :class="{'is-invalid':errors.password}" class="form-control"/>
                    <div class="invalid-feedback">
                        {{ errors.password }}
                    </div>
                </div>
                <div class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting"><span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>Register</button>
                <router-link class="btn-link btn" to="Login">Cancel</router-link>
                </div>
            </Form>

        </div>
    </div>
</template>