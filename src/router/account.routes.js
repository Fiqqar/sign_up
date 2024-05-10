import { Layout, Login, Register } from '@/view/account'

export default {
    path : '/account',
    component: Layout,
    children: [
        {path: 'login', component: Login},
        {path: 'register', component: Register}
    ]
};