import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    // Прокси для dev-режима: API growtask.ru не отдаёт CORS-заголовки,
    // поэтому в браузере напрямую fetch не пройдёт. Здесь /api/* → growtask.ru/test-front/api/*.
    proxy: {
      '/api': {
        target: 'https://growtask.ru',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/test-front/api'),
      },
    },
  },
})
