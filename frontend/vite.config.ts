import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const isProd = process.env.NODE_ENV !== "development";
const port = process.env.PORT || 4000;
const url = isProd
  ? `https://172.31.7.229:${port}`
  : `http://localhost:${port}`;

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react(), tailwindcss()],
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
    // host: true, // Allow access from any host in production
    // port: 80, // Use port 80 in production
    proxy: {
      "/preview": url,
      "/api": {
        target: url,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
