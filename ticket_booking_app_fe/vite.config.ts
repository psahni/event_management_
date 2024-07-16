import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: "/src/components",
      pages: "/src/pages",
      provider: "/src/provider",
      routes: "/src/routes"
    }
  }
})
