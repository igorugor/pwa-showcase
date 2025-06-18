import React from 'react';

import reactLogo from '../../assets/react.svg';
import viteLogo from '/vite.svg';

import { useAuth } from '../../context/useAuth';

export const LoginPage: React.FC = () => {
	const auth = useAuth();

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
					{(!auth?.status || auth?.status === 'Error') && <button onClick={auth?.register}>Register</button>}
					{auth?.status === 'registered' && <button onClick={auth?.login}>Login</button>}
				</div>
			</div>
		</>
	);
};
