import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'SolidJSCharts',
      fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`
    },
    rollupOptions: {
      external: ['solid-js', 'chart.js'],
      output: {
        globals: {
          'solid-js': 'SolidJS',
          'chart.js': 'Chart'
        }
      }
    }
  },
  test: {
    environment: 'jsdom'
  }
});