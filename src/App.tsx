import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
	const [status, setStatus] = useState('');

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

			const credID = credential.id;

			localStorage.setItem('demoCredentialId', credID);

			setStatus('✅ Registered successfully.');
		} catch (err) {
			console.error(err);
			setStatus('❌ Registration failed.');
		}
	};

	const login = async () => {
		try {
			const credIdBase64 = localStorage.getItem('demoCredentialId');
			if (!credIdBase64) {
				return setStatus('❌ No credential registered.');
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
				setStatus('✅ Biometric login successful!');
			} else {
				setStatus('❌ Login failed.');
			}
		} catch (err) {
			console.error(err);
			setStatus('❌ Login error.');
		}
	};

	const logout = () => {
		localStorage.removeItem('demoCredentialId');
		setStatus('👋 Logged out.');
	};

	console.log(status);

	useEffect(() => {
		if (window.PublicKeyCredential) {
			console.log('WebAuthn is supported!');
		} else {
			alert('WebAuthn not supported on this device.');
		}
	}, []);

	return (
		<>
			<div>
				<a href="https://vite.dev" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1>PWA Showcase</h1>
			<div className="card">
				<div className="inputs">
					<button onClick={register}>Register</button>
					<button onClick={login}>Login</button>
					<button onClick={logout}>Logout</button>
				</div>
			</div>
		</>
	);
}

export default App;
