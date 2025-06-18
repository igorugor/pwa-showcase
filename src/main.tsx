import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { registerSW } from 'virtual:pwa-register';
import { AuthProvider } from './context/AuthProvider.tsx';

registerSW({ immediate: true });

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</StrictMode>
);
