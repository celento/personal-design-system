import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules\/(react|react-dom|scheduler)\//,
              priority: 30,
            },
            {
              name: 'calendar',
              test: /node_modules\/(react-day-picker|date-fns|@date-fns)\//,
              priority: 20,
            },
            {
              name: 'primitives',
              test: /node_modules\/(@radix-ui|radix-ui)\//,
              priority: 10,
            },
          ],
        },
      },
    },
  },
  resolve: { alias: { '@': path.resolve(import.meta.dirname, './src') } },
})
