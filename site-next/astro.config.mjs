import { defineConfig } from 'astro/config';

// Publié sur https://jedi-openlab.github.io/open-course-kit/ (même URL que l'actuel).
export default defineConfig({
  site: 'https://jedi-openlab.github.io',
  base: '/open-course-kit',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
});
