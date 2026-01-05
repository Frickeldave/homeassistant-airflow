import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/airflow-card.ts',
      formats: ['es'],
    },
    outDir: 'dist',
    rollupOptions: {
      external: [
         // We generally bundle dependencies for custom cards to ensure one file distribution,
         // but if HA provides globals we might exclude them. usually 'custom-card-helpers' is bundled.
      ]
    }
  }
});
