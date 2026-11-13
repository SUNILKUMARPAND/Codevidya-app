import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // The course library (175 lessons of text and code) is bundled with the app on purpose
  build: { chunkSizeWarningLimit: 800 },
})
