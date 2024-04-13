import { Component, signal } from '@angular/core';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [],
	templateUrl: './footer.component.html',
	styleUrl: './footer.component.scss'
})
export class FooterComponent {
	public currentYear = signal(new Date().getFullYear());
}
