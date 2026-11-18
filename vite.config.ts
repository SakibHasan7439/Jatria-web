import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // firebase/app and firebase/auth must share the same app registry. A nested
  // @firebase/app copy otherwise leaves Auth unregistered on the created app.
  resolve: { dedupe: ['@firebase/app'] },
})
