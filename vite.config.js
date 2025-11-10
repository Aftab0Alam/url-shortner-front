// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy configuration to redirect /api calls to the backend (Port 5000)
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Your backend server address
        changeOrigin: true, // Needed for virtual hosting
        secure: false, // For local development (not using HTTPS)
        // rewrite: (path) => path.replace(/^\/api/, '/api'), // Optional, but usually helpful
      },
    },
  },
});