import path from 'path';

import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8080,
    host: true,
  },
  resolve: {
    alias: [
      {
        find: /~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1'),
      },
      {
        find: /@\/(.+)/,
        replacement: path.join(process.cwd(), './src/$1'),
      },
    ],
  },
  build: {
    rollupOptions: {
      manualChunks(id) {
        const resultNodeModules = id.match(/node_modules\/([^/]+)\/.+/);

        if (resultNodeModules) {
          return `vendor/${resultNodeModules[1]}`;
        }
      },
    },
  },
});
