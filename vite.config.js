import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
  plugins: [react()],
	// publicDir: 'ppp',
	// envDir: './',
	// envPrefix: 'VITE_',
	// appType: 'spa',
	server: {
		// host: 'localhost', //0.0.0.0 //true
		// port: 5173,
    open: '/',
		proxy: {
			// string shorthand: http://localhost:5173/foo -> http://localhost:4567/foo
      // '/foo': 'http://localhost:4567',
			// with options: http://localhost:5173/api/bar-> http://jsonplaceholder.typicode.com/bar
      // '/api': {
        // target: 'http://jsonplaceholder.typicode.com',
        // changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ''),
      // },
			'/api': {
				target: 'http://localhost:8000',
				changeOrigin: true,
				// cookiePathRewrite: true,
				// cookieDomainRewrite: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
			}
		},
		// Proxying websockets or socket.io: ws://localhost:5173/socket.io -> ws://localhost:5174/socket.io
		// '/socket.io': {
			// target: 'ws://localhost:5174',
			// ws: true,
		// },		
		'/socket': {
			target: 'ws://localhost:7000',
			ws: true,
		},
		// cors: {
			// credentials: true,
		// },
		// origin: 'http://127.0.0.1:8080',
  },
	build: {
		outDir: './build',
		// copyPublicDir: true
	},
	preview: {
		proxy: {
		}
	}
})
