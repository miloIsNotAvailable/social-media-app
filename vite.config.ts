import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@styles", replacement: path.resolve( __dirname, "./styles" ) },
      { find: "@globals", replacement: path.resolve( __dirname, "./globals" ) }
    ]
  }
})
