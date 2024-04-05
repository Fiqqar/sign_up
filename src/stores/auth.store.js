import { defineStore } from 'pinia'
import { fetchWrapper } from '@/helpers'
import { router } from '@/router'
import { useAlertStore } from '@/stores'
const baseUrl = `${import.meta.env.VITE_API_URL}/users`