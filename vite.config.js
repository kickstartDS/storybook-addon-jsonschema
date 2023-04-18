import react from "@vitejs/plugin-react";
import nodePolyfills from "rollup-plugin-node-polyfills";

import { defineConfig } from "vite";
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["@kickstartds/json-schema-viewer"],
  },
  resolve: {
    alias: {
      stream: "rollup-plugin-node-polyfills/polyfills/stream",
      events: "rollup-plugin-node-polyfills/polyfills/events",
      assert: "assert",
      crypto: "crypto-browserify",
      util: "util",
      os: "rollup-plugin-node-polyfills/polyfills/os",
    },
  },
  define: {
    "process.env": process.env ?? {},
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills({ crypto: true })],
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
          crypto: true,
          os: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});
