import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  // optimizeDeps: {
  //   exclude: ["@xenova/transformers"],
  // },
  fs: {
    strict: false, // Allow serving assets from any directory
  },
  build: {
    outDir: "dist",
    manifest: true,
    rollupOptions: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            tfjs: [
              "@tensorflow/tfjs",
              "@tensorflow/tfjs-backend-webgl",
              "@tensorflow-models/universal-sentence-encoder",
            ],
            transformers: ["@xenova/transformers"],
          },
        },
      },
    },
  },
});
