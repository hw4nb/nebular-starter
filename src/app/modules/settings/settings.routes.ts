import { Routes } from '@angular/router'

import { RolesComponent } from '@src/app/modules/settings/pages/roles/roles.component'
import { UsersComponent } from '@src/app/modules/settings/pages/users/users.component'
import { SettingsComponent } from '@src/app/modules/settings/settings.component'

export const SETTINGS_ROUTES: Routes = [
	{
		path: '',
		component: SettingsComponent,
		children: [
			{
				path: 'users',
				component: UsersComponent
			},
			{
				path: 'roles',
				component: RolesComponent
			},
			{
				path: '',
				pathMatch: 'full',
				redirectTo: 'users'
			}
		]
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: ''
	}
]
