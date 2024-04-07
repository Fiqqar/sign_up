import { Layout, List, AddEdit } from '@/view/users'

export default {
    path : '/users',
    component: Layout,
    children: [
        {path: '', component: List},
        {path: 'Add', component: AddEdit},
        {path: 'Edit/:id', component: AddEdit}
    ]
}