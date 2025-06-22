import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint';

import tailwindcss from '@tailwindcss/vite';

const host = process.env.TAURI_DEV_HOST;

// const tiledPlugin = () => {
//   return {
//     name: 'tiled-tileset-plugin',
//     resolveId: {
//       order: 'pre',
//       handler(sourceId: any) {
//         if (!sourceId.endsWith('.tsx')) return;
//         return { id: 'tileset:' + sourceId, external: 'relative' };
//       },
//     },
//   };
// };

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [viteReact(), eslint(), tailwindcss()],
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
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          motion: ['motion', 'framer-motion'],
          'react-icons': ['react-icons'],
          css: ['tailwindcss'],
          tauri: ['@tauri-apps/api', '@tauri-apps/plugin-*'],
          excalibur: ['excalibur'],
        },
      },
    },
  },
  server: {
    port: 3000,
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
