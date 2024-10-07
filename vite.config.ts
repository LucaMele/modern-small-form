import { defineConfig } from 'vite';

const PORT = Number(process.env.PORT) || 3000;

export default defineConfig({
  root: 'src',
   server: {
    port: PORT,
    proxy: {
      '/api': {
        target: `http://localhost:8080`,  // Your Express backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')  // Optional: if you need to strip /api prefix
      }
    }
  },
  build: {
    outDir: '../dist',
    target: 'esnext', 
  },
});
