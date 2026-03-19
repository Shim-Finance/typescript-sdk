import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '/Users/ewebb/.paved/worktrees/shim.finance/sdk-publish-v2/packages/app/openapi.json',
  output: {
    path: './src',
    module: { extension: '.js' },
  },
  plugins: [
    { name: '@hey-api/client-fetch', includeInEntry: true },
    '@hey-api/sdk',
    '@hey-api/typescript',
  ],
});
