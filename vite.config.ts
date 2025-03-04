import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';

dotenv.config();

//https://vitejs.dev/config/
export default defineConfig({
  envDir: './env',
  plugins: [react()],
  define: {
    "import.meta.env.VITE_GITHUB_TOKEN": JSON.stringify(process.env.VITE_GITHUB_TOKEN),
  },
});
 