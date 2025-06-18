import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA, type ManifestOptions } from 'vite-plugin-pwa';

const manifest: Partial<ManifestOptions> = {
	theme_color: '#242424',
	background_color: '#242424',
	icons: [
		{ purpose: 'maskable', sizes: '512x512', src: 'icon512_maskable.png', type: 'image/png' },
		{ purpose: 'any', sizes: '512x512', src: 'icon512_rounded.png', type: 'image/png' },
	],
	orientation: 'any',
	display: 'standalone',
	lang: 'ru-RU',
	name: 'PWA-showcase',
	short_name: 'PWASC',
	start_url: '/',
};

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{html,js,css,svg,png,ico}'],
			},
			manifest,
			devOptions: {
				enabled: true,
			},
		}),
	],
});
