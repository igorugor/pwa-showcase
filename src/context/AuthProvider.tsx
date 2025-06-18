import { useEffect, useState, type ReactNode } from 'react';
import type { TLoginStatus } from './types';
import { credentialLocalStorage } from '../constants';
import { AuthContext } from './AuthContext';

// Create a provider
export const AuthProvider: React.FC<{
	children: ReactNode;
}> = ({ children }) => {
	const [status, setStatus] = useState<TLoginStatus | null>(null);

	console.log(status);

	const generateChallenge = () => Uint8Array.from(crypto.getRandomValues(new Uint8Array(32)));

	const register = async () => {
		try {
			const publicKey: PublicKeyCredentialCreationOptions = {
				challenge: generateChallenge(),
				rp: { name: 'Demo App' },
				user: {
					id: Uint8Array.from('demo-user-id', (c) => c.charCodeAt(0)),
					name: 'demo@example.com',
					displayName: 'Demo User',
				},
				pubKeyCredParams: [{ type: 'public-key', alg: -7 }],
				authenticatorSelection: {
					authenticatorAttachment: 'platform',
					userVerification: 'required',
				},
				timeout: 60000,
				attestation: 'none',
			};

			const credential = await navigator.credentials.create({ publicKey });

			if (!credential) {
				throw new Error('Failed to retreive credentials');
			}

			//@ts-expect-error rawId exists in Credential but TS doesn't know about it
			const credID = btoa(String.fromCharCode(...new Uint8Array(credential.rawId)));

			localStorage.setItem(credentialLocalStorage, credID);

			setStatus('registered');
		} catch (err) {
			console.error(err);
			alert(err);
			setStatus('Error');
		}
	};

	const login = async () => {
		try {
			const credIdBase64 = localStorage.getItem(credentialLocalStorage);
			if (!credIdBase64) {
				return setStatus('Error');
			}

			const credIdBytes = Uint8Array.from(atob(credIdBase64), (c) => c.charCodeAt(0));

			const publicKey: PublicKeyCredentialRequestOptions = {
				challenge: generateChallenge(),
				allowCredentials: [
					{
						type: 'public-key',
						id: credIdBytes,
						transports: ['internal'],
					},
				],
				userVerification: 'required',
				timeout: 60000,
			};

			const assertion = await navigator.credentials.get({ publicKey });

			if (assertion) {
				setStatus('loggedIn');
			} else {
				setStatus('Error');
			}
		} catch (err) {
			console.error(err);
			alert(err);
			setStatus('Error');
		}
	};

	const logout = () => {
		localStorage.removeItem(credentialLocalStorage);
		setStatus('registered');
	};

	useEffect(() => {
		const credential = localStorage.getItem(credentialLocalStorage);
		if (credential) {
			setStatus('registered');
		}
	}, []);

	return <AuthContext.Provider value={{ status, login, logout, register }}>{children}</AuthContext.Provider>;
};
