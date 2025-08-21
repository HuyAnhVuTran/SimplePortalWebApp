import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      // Proxy all requests starting with "/api" to your Spring Boot backend
      '/api': {
        target: 'http://localhost:8080', // Your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove "/api" prefix
      },
    },
  },
});