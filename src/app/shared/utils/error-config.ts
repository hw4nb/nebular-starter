import { InjectionToken } from '@angular/core';

const defaultErrors: {
	[key: string]: any;
} = {
	required: () => `This field is required`,
	minlength: ({ requiredLength, _ }: any) => `Name must be at least ${requiredLength} characters long.`,
	maxlength: ({ requiredLength, _ }: any) => `Name cannot be more than ${requiredLength} characters long.`,
	email: () => 'Not a valid email address.',
	forbiddenName: () => 'Name cannot be Bob.'
};

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
	providedIn: 'root',
	factory: () => defaultErrors
});
