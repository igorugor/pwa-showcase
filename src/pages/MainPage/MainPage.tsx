import type React from 'react';
import { useAuth } from '../../context/useAuth';
import { Camera } from '../../components/Camera';

export const MainPage: React.FC = () => {
	const auth = useAuth();

	return (
		<>
			<div>Logged in</div>
			<Camera />
			<button onClick={auth?.logout}>Logout</button>
		</>
	);
};
