import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/login": {
        target: "http://123.249.45.13:8000",
        changeOrigin: true,
      },
    },
  },
});
