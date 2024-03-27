import { Routes } from '@angular/router'
import { LayoutComponent } from '@src/app/core/layout/layout.component'
import { NotFoundComponent } from '@src/app/modules/not-found/not-found.component'

export const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./core/auth/auth.routes').then((m) => m.AUTH_ROUTES)
	},
	{
		path: 'pages',
		component: LayoutComponent,
		children: [
			{
				path: 'dashboard',
				loadChildren: () => import('./modules/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES)
			},
			{
				path: 'settings',
				loadChildren: () => import('./modules/settings/settings.routes').then((m) => m.SETTINGS_ROUTES)
			},
			{ path: '', pathMatch: 'full', redirectTo: 'dashboard' },
			{ path: '**', component: NotFoundComponent }
		]
	},
	{ path: '', pathMatch: 'full', redirectTo: 'pages' },
	{ path: '**', redirectTo: 'pages' }
]
