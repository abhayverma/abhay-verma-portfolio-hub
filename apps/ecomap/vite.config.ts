import { defineConfig, type PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  plugins: [react() as unknown as PluginOption[]],
  server: {
    port: 5179,
    fs: { allow: ['../..'] }
  },
  resolve: {
    alias: {
      "@portfolio/shared-ui": fileURLToPath(new URL("../../packages/shared-ui/src", import.meta.url))
    }
  }
});