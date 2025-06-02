import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from '@vitejs/plugin-react-swc';
import { VitePWA } from "vite-plugin-pwa";

import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    registerType: "prompt",
    includeAssets: ["favicon.svg", 'apple-touch-icon.png'],
    manifest: {
      name: "Replify",
      short_name: "replify",
      description: "A simple way to manage workout routines",
      theme_color: "#0000",
      icons: [
        {
          src: "web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
          src: "web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any maskable"
        },
      ],
    }
  })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
