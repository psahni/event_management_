import { defineConfig } from 'vite'
import {resolve} from 'path'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      src: resolve("src/"),
      pages: resolve("src/pages"),
      services: resolve("src/services"),
      components: resolve("src/components"),
      hooks: resolve("src/hooks")
    }
  }
})


// alias: {
//   components: "/src/components",
//   pages: "/src/pages",
//   provider: "/src/provider",
//   routes: "/src/routes",
//   services: "/src/services",
// }