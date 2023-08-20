import { defineConfig } from "vite";
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { TDesignResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    watch: {
      usePolling: true,   // 修复HMR热更新失效
    },
    hmr: true,
    host: '0.0.0.0',
    open: '/',
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
  },
    plugins: [
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      resolvers: [
        TDesignResolver({
          library: 'vue-next'
        })
      ]
    }),
    Components({
      resolvers: [
        TDesignResolver({
          library: 'vue-next'
        })
      ]
    })
  ],
});
