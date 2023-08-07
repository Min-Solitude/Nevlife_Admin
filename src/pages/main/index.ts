import React from 'react'

import GlobalLayout from '../../components/layouts/global'
import { Route } from '../../configs'

const routes: Route[] = [
    {
        path: '/',
        component: React.lazy(() => import('./Home')),
        layout: GlobalLayout,
        isPrivate: true
    },
    {
        path: '/user-manager',
        component: React.lazy(() => import('./UserManager')),
        layout: GlobalLayout,
        isPrivate: true
    },
    {
        path: '/user-manager/all',
        component: React.lazy(() => import('./UserManager/components/AllUser')),
        layout: GlobalLayout,
        isPrivate: true
    },
    {
        path: '/forum-manager',
        component: React.lazy(() => import('./UserManager')),
        layout: GlobalLayout,
        isPrivate: true
    },
    {
        path: '/medical-manager',
        component: React.lazy(() => import('./Medical')),
        layout: GlobalLayout,
        isPrivate: true
    },
    {
        path: '/bill-manager',
        component: React.lazy(() => import('./Bill')),
        layout: GlobalLayout,
        isPrivate: true
    }
]

export default routes
