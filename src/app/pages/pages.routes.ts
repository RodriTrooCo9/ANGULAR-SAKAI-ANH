//src/app/pages/pages.routes.ts

import { Routes } from '@angular/router';

import { Crud } from './crud/crud/crud';
import { Empty } from './empty/empty/empty';

export default [

    { path: 'crud', component: Crud },
    { path: 'empty', component: Empty },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
