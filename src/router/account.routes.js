import { Layout, Login, Register } from '@/view/account'

export default {
    path : '/account',
    component: Layout,
    children: [
        {path: '', component: Login},
        {path: 'Register', component: Register}
    ]
}