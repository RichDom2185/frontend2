import react from '@vitejs/plugin-react';
import * as sass from 'sass';
import { defineConfig } from 'vite';

const ignoreSvgIcon = () => new sass.SassString('');

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  legacy: {
    // Needed for react-ace in Vite 8
    inconsistentCjsInterop: true,
  },
  resolve: {
    tsconfigPaths: true,
    alias: {
      fs: 'browserfs',
      path: 'path-browserify',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        functions: {
          // FIXME: Support Blueprint's custom function
          // https://github.com/palantir/blueprint/issues/5334
          // https://github.com/palantir/blueprint/issues/6051
          'svg-icon($path, $selectors: null)': ignoreSvgIcon,
        },
      },
    },
  },
});
