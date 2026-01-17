
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  css: {
    preprocessorOptions: {
      scss: {
        // Tắt các cảnh báo cũ của Bootstrap
        quietDeps: true,
        // Chặn các cảnh báo cụ thể về hàm toàn cục
        silenceDeprecations: ['global-builtin', 'color-functions', 'import'],
      },
    },
  },
})

