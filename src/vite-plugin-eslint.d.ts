// filepath: /home/s0/projets/woke-td/types/vite-plugin-eslint.d.ts
declare module 'vite-plugin-eslint' {
  import { Plugin } from 'vite';
  const eslint: () => Plugin;
  export default eslint;
}
