import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  css: {
    preprocessorOptions: {
      scss: {
        // api: 'modern-compiler', // Hoặc 'modern'
        silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import', 'if-function'],
      },
    },
  },
})