import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

import tailwindcss from '@tailwindcss/vite';

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [viteReact(), eslint(), tailwindcss()],
  tailwindcss: {
    configPath: './tailwind.config.js',
    applyBaseStyles: true,
  },
  optimizeDeps: {
    include: ['excalibur', 'motion', 'framer-motion'],
  },
  base: './',
  resolve: {
    alias: {
      '#/*': './src/*',
    },
  },
  publicDir: './public',
  // Vite options tailored
  //  for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['motion', 'framer-motion'],
          'react-icons': ['react-icons'],
          excalibur: ['excalibur'],
        },
      },
    },
  },
  server: {
    port: 3333,
    strictPort: true,
    host: host || '0.0.0.0',
    hmr: host
      ? {
          protocol: 'ws',
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ['**/src-tauri/**'],
    },
  },
}));
