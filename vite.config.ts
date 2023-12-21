/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts({ rollupTypes: true }), nodePolyfills({ include: ['crypto', 'stream'] })],
  test: {
    globals: true,
    environment: 'happy-dom',
    coverage: {
      enabled: true,
      provider: 'v8',
      include: ['src/components', 'src/composables', 'src/types', 'src/utils']
    },
    typecheck: {
      enabled: true,
      checker: 'vue-tsc'
    }
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'VueGravatar',
      fileName: 'vue-gravatar'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  }
})
