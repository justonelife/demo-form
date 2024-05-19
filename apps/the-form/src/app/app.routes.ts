import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'form',
        pathMatch: 'full',
    },
    {
        path: 'form',
        loadChildren: () => import('./pages/form-demo/form-demo.routes').then(mod => mod.formDemoRoutes),
    }
];
