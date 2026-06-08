import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about/index.html"),
        services: resolve(__dirname, "services/index.html"),
        work: resolve(__dirname, "work/index.html"),
        process: resolve(__dirname, "process/index.html"),
        pricing: resolve(__dirname, "pricing/index.html"),
        contact: resolve(__dirname, "contact/index.html"),
      },
    },
  },
})
