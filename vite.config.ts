import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import eslint from "vite-plugin-eslint";
import tailwindcss from "@tailwindcss/vite";

const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [viteReact(), eslint(), tailwindcss()],
  base: "./",
  resolve: {
    alias: {
      "#/*": "./src/*",
    },
  },
  publicDir: './public',
  // Vite options tailored
  //  for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: false,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    host: host || false,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : undefined,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
  },
}));


// if you use tiled maps
// there is a collision between react w/ typescript .tsx
// and tiled tileset files .tsx
// this forces vite to not interpret tsx as react
// const tiledPlugin = () => {
//   return {
//       name: 'tiled-tileset-plugin',
//       resolveId: {
//           order: 'pre',
//           handler(sourceId, importer, options) {
//               if (!sourceId.endsWith(".tsx")) return;
//               return { id: 'tileset:' + sourceId, external: 'relative' }
//           }
//       }
//   };
// }

// export default defineConfig({
//   base: './', // optionally give a base path, useful for itch.io to serve relative instead of the default absolut
//   plugins: [tiledPlugin()], // hint vite that tiled tilesets should be treated as external
//   // currently excalibur plugins are commonjs
//   // this forces vite to keep things from bundling ESM together with commonjs
//   optimizeDeps: {
//       exclude: ["excalibur"],
//   },
//   build: {
//       assetsInlineLimit: 0, // excalibur cannot handle inlined xml in prod mode
//       sourcemap: true,
//       // Vite uses rollup currently for prod builds so a separate config is needed
//       // to keep vite from bundling ESM together with commonjs
//       rollupOptions: {
//           output: {
//               format: 'umd'
//           }
//       }
//   }
// });
