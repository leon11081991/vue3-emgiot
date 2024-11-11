import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: '/',
    define: {
      'process.env': env
    },
    server: {
      host: '0.0.0.0', // 讓伺服器監聽所有 IP 地址
      port: Number(env.VITE_APP_PORT)
    },
    build: {
      minify: 'esbuild',
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: true
    },
    plugins: [vue(), vueDevTools()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }
})
