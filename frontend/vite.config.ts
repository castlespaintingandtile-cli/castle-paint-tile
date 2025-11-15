import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.svg'],
  },
  plugins: [tailwindcss(), react()],
  mode: "development",
  build: {
    minify: false,
  },
  server: {
    host: true,
    allowedHosts: ['ten-clouds-draw.loca.lt', 'localhost', '127.0.0.1'],
    hmr: {
      overlay: false
    }
  }
})
