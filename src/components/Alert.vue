<script setup>
import { storeToRefs } from 'pinia';
import { useAlertStore } from '@/stores';
const alertStore = useAlertStore();
const {alert} = storeToRefs(alertStore);
</script>

<template>
    <div v-if="alert" class="container">
        <div class="m-3">
            <div class="alert alert-dismissable" :class="alert.type">
                <button class="btn btn-link close" @click="alertStore.clear()">X</button>
                {{ alert.message }}
            </div>
        </div>
    </div>
</template>