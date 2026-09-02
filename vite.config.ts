/// <reference types="vitest/config" />
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import cssInjectedByJs from 'vite-plugin-css-injected-by-js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), cssInjectedByJs()],
  build: {
    copyPublicDir: false,
    lib: {
      entry: fileURLToPath(new URL('src/lib/index.ts', import.meta.url)),
      name: 'GomezUI',
      formats: ['es', 'cjs'],
      fileName: (format) => `gomez-ui.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: { vue: 'Vue' },
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['src/lib/**/*.spec.ts'],
  },
})
