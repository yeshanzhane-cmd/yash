import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Proxies /api to the backend in dev so the frontend never needs to know
// the API's real origin (and never touches the Claude API key).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true
      }
    }
  }
});
