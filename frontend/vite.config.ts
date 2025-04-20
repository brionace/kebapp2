import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const isProd = process.env.NODE_ENV !== "development";
const port = process.env.PORT || 3000;
const url = isProd ? `http://172.31.7.229:${port}` : `http://localhost:${port}`;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react", "fsevents"],
  },
  build: {
    rollupOptions: {
      external: ["fsevents"], // Exclude fsevents from the bundle
    },
    commonjsOptions: {
      include: /node_modules/, // Ensure CommonJS dependencies are included
      transformMixedEsModules: true, // Ensure mixed ES modules are handled correctly
    },
  },
  server: {
    host: isProd ? true : "localhost", // Allow access from any host in production
    port: isProd ? 80 : 5173, // Use port 80 in production
    proxy: {
      "/api": {
        target: url,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
