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
              name: 'effects',
              test: /node_modules\/(border-beam|metal-fx|liquid-gooey|voice-glow|thinking-orbs|bot-avatars)\//,
              priority: 25,
            },
            {
              name: 'motion',
              test: /node_modules\/(motion|motion-dom|motion-utils|framer-motion)\//,
              priority: 25,
            },
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
