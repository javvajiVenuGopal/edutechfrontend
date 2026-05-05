import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    
     react(),
     tailwindcss()
    
  ],
  build: {
    chunkSizeWarningLimit: 1000
  }
//   server: {
//   allowedHosts: [
//     "6170-2409-40f0-6050-7870-2d8a-5bf0-50b4-48a4.ngrok-free.app"
//   ]
// }
})

