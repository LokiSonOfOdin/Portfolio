import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig, type Plugin } from 'vite'

// GitHub Pages publishes the repository at https://<user>.github.io/<repo>/.
// Keep this in sync with the repository name.
const REPO_NAME = 'Portfolio'

/**
 * GitHub Pages has no SPA fallback: unknown paths are served as 404.html.
 * Copying the built index.html to 404.html lets React Router handle deep links.
 */
function githubPagesSpaFallback(): Plugin {
  let outDir = 'dist'

  return {
    name: 'github-pages-spa-fallback',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const index = resolve(outDir, 'index.html')

      if (!existsSync(index)) return

      copyFileSync(index, resolve(outDir, '404.html'))
      // Prevent Jekyll from ignoring files that start with an underscore.
      writeFileSync(resolve(outDir, '.nojekyll'), '')
    },
  }
}

export default defineConfig({
  base: `/${REPO_NAME}/`,

  plugins: [
    react(),
    babel({
      presets: [reactCompilerPreset()],
    }),
    githubPagesSpaFallback(),
  ],

  optimizeDeps: {
    exclude: [
      '@jsquash/webp',
      '@jsquash/avif',
    ],
  },
})
