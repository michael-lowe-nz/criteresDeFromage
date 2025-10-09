import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
  plugins: [preact()],
  build: {
    outDir: 'build',
  },
  server: {
    port: 8080,
  },
  css: {
    modules: {
      localsConvention: 'camelCase',
    },
  },
});