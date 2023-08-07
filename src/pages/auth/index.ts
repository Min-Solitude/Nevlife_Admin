import React from 'react'

import { Route } from '../../configs'
import AuthLayout from '../../components/layouts/private'

const routes: Route[] = [
    {
        path: '/register',
        component: React.lazy(() => import('./Register')),
        layout: AuthLayout,
        isPrivate: false
    },
    {
        path: '/login',
        component: React.lazy(() => import('./Login')),
        layout: AuthLayout,
        isPrivate: false
    }
]

export default routes
