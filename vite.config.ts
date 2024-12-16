import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [svelte()],
	server: {
		port: 49678,
	},
	build: {
		lib: {
			entry:   "src/plugin.svelte.ts",
			fileName: "index",
			formats: ["es"],
		},
	},
})
