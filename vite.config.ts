import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';

dotenv.config();

export default defineConfig({
  envDir: './env',  
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173,  
    host: "0.0.0.0",  
    allowedHosts: ['candidate-github.onrender.com'], 
  }
});
