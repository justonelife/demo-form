import { Route } from "@angular/router";

export const formDemoRoutes: Route[] = [
    {
        path: '',
        redirectTo: 'builder',
        pathMatch: 'full',
    },
    {
        path: 'builder',
        loadComponent: () => import('./components/form-builder/form-builder.component').then(c => c.FormBuilderComponent),
    },
    {
        path: 'answer',
        loadComponent: () => import('./components/form-answer/form-answer.component').then(c => c.FormAnswerComponent),
    },
];