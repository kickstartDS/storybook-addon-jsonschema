const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

/** @type import("esbuild").BuildOptions */
const sharedConfig = {
  entryPoints: ["src/index.ts", "src/manager.tsx"],
  bundle: true,
  platform: "browser",
  minify: true,
  plugins: [
    nodeExternalsPlugin({
      dependencies: true,
      devDependencies: false,
      peerDependencies: true,
    }),
  ],
  logLevel: "info",
};

esbuild.build({
  ...sharedConfig,
  format: "esm",
  outdir: "dist/esm",
  splitting: true,
});
esbuild.build({
  ...sharedConfig,
  format: "cjs",
  outdir: "dist/cjs",
});
