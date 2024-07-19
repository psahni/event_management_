import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
})


// alias: {
//   components: "/src/components",
//   pages: "/src/pages",
//   provider: "/src/provider",
//   routes: "/src/routes",
//   services: "/src/services",
// }