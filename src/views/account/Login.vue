<script setup>
import { Form, Field } from 'vee-validate';
import * as Yup from 'yup';
import { useAuthStore } from '@/stores';


const schema = Yup.object().shape({
        username: Yup.string().required("Username Required"),
        password: Yup.string().required("Password Required")
    });
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
                    <button class="btn btn-primary" :disabled="isSubmitting"><span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>Login</button>
                <router-link class="btn-link btn" to="Register">Register</router-link>
                </div>
            </Form>

        </div>
    </div>
</template>