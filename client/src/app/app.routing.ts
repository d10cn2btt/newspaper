/**
 * Created by Truongbt on 27-Aug-16.
 */
import {Routes, RouterModule}   from '@angular/router';

import {HomeComponent} from './home';
import {PostComponent} from './post/index';

const appRoutes:Routes = [
    {
        path: 'homepage',
        component: HomeComponent,
    },
    {
        path: 'detail/:slug',
        component: PostComponent
    },
    {
        path: '',
        redirectTo: 'homepage',
        pathMatch: 'full'
    },
];

export const routing = RouterModule.forRoot(appRoutes);