import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { map } from 'rxjs';

import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
	NbActionsModule,
	NbContextMenuModule,
	NbIconModule,
	NbMediaBreakpointsService,
	NbMenuService,
	NbSidebarService,
	NbThemeService,
	NbUserModule
} from '@nebular/theme';

import { AuthService, MenuService, User, UserMenu } from '@src/app/core/services';

const NB_MODULES = [NbIconModule, NbActionsModule, NbUserModule, NbContextMenuModule, NbEvaIconsModule];

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [...NB_MODULES],
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss'
})
export class HeaderComponent {
	private _authService = inject(AuthService);
	private _breakpointService = inject(NbMediaBreakpointsService);
	private _menuService = inject(MenuService);
	private _nbMenuService = inject(NbMenuService);
	private _router = inject(Router);
	private _sidebarService = inject(NbSidebarService);
	private _themeService = inject(NbThemeService);

	public hideMenuOnClick = signal(false);
	public userPictureOnly = signal(false);

	public user = signal<User>({ name: '', picture: '' });
	public userMenu = signal<UserMenu[]>([]);

	constructor() {
		const { xl, is } = this._breakpointService.getBreakpointsMap();

		this._themeService
			.onMediaQueryChange()
			.pipe(
				map(([, currentBreakpoint]) => currentBreakpoint),
				takeUntilDestroyed()
			)
			.subscribe((currentBreakpoint) => {
				this.userPictureOnly.set(currentBreakpoint.width < xl);
				this.hideMenuOnClick.set(currentBreakpoint.width <= is);
			});

		this.user.set(this._menuService.user);
		this.userMenu.set(this._menuService.userMenu);

		this._nbMenuService.onItemClick().subscribe(({ item }: any) => {
			if (this.hideMenuOnClick()) this._sidebarService.collapse('menu-sidebar');
			if (item.tag === 'logout') this._authService.logout();
		});
	}

	public toggleSidebar() {
		this._sidebarService.toggle(true, 'menu-sidebar');
		return false;
	}

	public newAppointment() {
		this._router.navigateByUrl('/pages/appointments/new-appointment');
	}

	public navigateHome() {
		this._router.navigateByUrl('/');
	}
}
