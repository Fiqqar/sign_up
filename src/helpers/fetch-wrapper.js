import { useAuthStore } from'@/stores'

export const fetchWrapper = {
    get : request('GET'),
    post : request('POST'),
    put : request('PUT'),
    delete : request('DELETE'),
}