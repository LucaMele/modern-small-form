import { defineConfig } from 'vite';

const PORT = Number(process.env.PORT) || 3000;

export default defineConfig({
    root: 'src',
    // css: {
    //     postcss: './postcss.config.cjs',
    // },
    server: {
        port: PORT,
        proxy: {
            '/api': {
                target: `http://localhost:8080`, // Your Express backend
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: '../dist',
        target: 'esnext',
    },
});
