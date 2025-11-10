// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // 👇 Ensures correct asset (CSS, image) loading on Render
  base: "./",

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000", // For local development
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
