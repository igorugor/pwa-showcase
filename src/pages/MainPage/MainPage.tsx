import type React from 'react';
import { useAuth } from '../../context/useAuth';

export const MainPage: React.FC = () => {
	const auth = useAuth();

	return (
		<>
			<div>Logged in</div>
			<button onClick={auth?.logout}>Logout</button>
		</>
	);
};
