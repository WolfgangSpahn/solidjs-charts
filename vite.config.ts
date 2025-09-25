import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    solid(), 
    dts({
      insertTypesEntry: true,
      exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'tests/**/*']
    })
  ],
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
    },
    emptyOutDir: true
  }
});