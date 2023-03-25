import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/login": {
        target: "http://192.168.0.173:8000",
        changeOrigin: true,
      },
    },
  },
});
