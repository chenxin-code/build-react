import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/build-react/' : '/',
  plugins: [react()],
  server: {
    port: 333,
    proxy: {
      '/baiduMap': {
        target: 'https://map.baidu.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/baiduMap/, ''),
      },
    },
  },
}))
