import { resolve } from "path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

export default defineConfig ({
  mode: 'production',
  plugins: [cssInjectedByJsPlugin()],
  build: {
    lib: {
      entry: resolve(__dirname, "index.ts"),
      name: "calculator-keyboard",
      fileName: "index",
    },
  },
});