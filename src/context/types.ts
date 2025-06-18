export type TLoginStatus = 'registered' | 'loggedIn' | 'Error';

export interface IAuthContext {
	status: TLoginStatus | null;

	register: () => void;
	login: () => void;
	logout: () => void;
}
