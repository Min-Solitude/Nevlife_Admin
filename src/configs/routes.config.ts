import { FunctionComponent } from 'react'

import authRoutes from '../pages/auth'
import mainRoutes from '../pages/main'
import NotFound from '../components/shared/NotFound'

export interface Route {
    path: string
    component: FunctionComponent<any>
    layout: FunctionComponent<any> | null
    isPrivate: boolean
}

export const routes: Route[] = [
    ...authRoutes,
    ...mainRoutes,
    {
        path: '*',
        component: NotFound,
        layout: null,
        isPrivate: false
    }
]
