// const chromeLauncher = require("@web/test-runner-chrome").chromeLauncher;
// const { esbuildPlugin } = require("@web/dev-server-esbuild");
// const { SveltePlugin } = require("./dist/index.js");
import { chromeLauncher } from "@web/test-runner-chrome";
import { esbuildPlugin } from "@web/dev-server-esbuild";
import { SveltePlugin } from "./dist/index.js";

export default {
  nodeResolve: {
    extensions: [".svelte"],
  },
  coverage: true,
  coverageConfig: {
    report: true,
    exclude: ["node_modules/**/*", "test/**/*"],
  },
  browsers: [
    chromeLauncher({
      launchOptions: {
        executablePath: process.env.TEST_BROWSER || null,
      },
    }),
  ],
  plugins: [
    esbuildPlugin({
      target: "auto",
      ts: true,
      json: true,
    }),
    new SveltePlugin(),
  ],
};
