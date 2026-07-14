import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import dotEnv from "dotenv";

dotEnv.config();

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env': { ...process.env },
  }
});
