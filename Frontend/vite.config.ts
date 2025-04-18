import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Moja PWA Aplikacija',
        short_name: 'PWA',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#0d9488',
      },
    })
  ]
})
