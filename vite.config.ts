import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/airflow-card.ts',
      formats: ['es'],
      fileName: () => `homeassistant-airflow.js`,
    },
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: `homeassistant-airflow.js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
      }
    }
  }
});
