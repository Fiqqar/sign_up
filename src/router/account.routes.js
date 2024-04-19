import { Layout, Login, Register } from '@/view/account'

export default {
    path : '/account',
    component: Layout,
    children: [
        {path: '', redirect: Login},
        {path: 'Login', component: Login},
        {path: 'Register', component: Register}
    ]
}