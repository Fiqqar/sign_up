import { useAuthStore } from'@/stores'

export const fetchWrapper = {
    get : request('GET'),
    post : request('POST'),
    put : request('PUT'),
    delete : request('DELETE'),
}

function request (method) {
    return (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url),
        };
        if (body) {
            requestOptions.headers['content-type'] = 'application/json';
            requestOptions.body = JSON.stringify(body);
        }
        return fetch(url, requestOptions).then(handleResponse);
    }
}
function authHeader(url) {
    const {user} = useAuthStore();
    const isLogin = !!user?.token;
    const isApiurl = url.startsWith(import.meta.env.VITE_API_URL);
    if (isLogin && isApiurl) {
        return {
            Authorization: `Bearer ${user.token}`
        };
    } else {
        return {

        }
    }
}

async function handleResponse(response) {
    const isJSON = response.headers?.get('content-type')?.includes('application/json');
    const data = isJSON ? await response.json():null;
    if (!response.ok) {
        const {user, logout} = useAuthStore();
        if ([401, 403].includes(response.status)&& user) {
            logout();
        }
        const error = (data && data.message) || (response.status);
        return Promise.reject(error);
    }
    return data;
}