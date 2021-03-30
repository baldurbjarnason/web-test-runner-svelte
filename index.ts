import type {
  Context,
  Plugin,
  Logger,
  DevServerCoreConfig,
} from "@web/dev-server-core";
import path from "path";
import { preprocess, compile } from "svelte/compiler";
import type { PreprocessorGroup } from "svelte/types/compiler/preprocess/types";
import type { CompileOptions } from "svelte/types/compiler/interfaces";

export class SveltePlugin implements Plugin {
  name = "svelte-plugin";

  private config?: DevServerCoreConfig;
  private logger?: Logger;
  private compile = compile;
  private preprocess?: PreprocessorGroup | PreprocessorGroup[];
  private compileOptions?: CompileOptions;

  constructor(
    preprocess: PreprocessorGroup | PreprocessorGroup[],
    compileOptions: CompileOptions
  ) {
    this.preprocess = preprocess;
    this.compileOptions = compileOptions;
  }

  async serverStart({
    config,
    logger,
  }: {
    config: DevServerCoreConfig;
    logger: Logger;
  }) {
    this.config = config;
    this.logger = logger;
  }

  resolveMimeType(context: Context) {
    const fileExtension = path.posix.extname(context.path);
    if (fileExtension === ".svelte") {
      return "js";
    }
  }

  async resolveImport({
    source,
    context,
  }: {
    source: string;
    context: Context;
  }) {
    if (
      source === "/node_modules/svelte" ||
      source === "/node_modules/svelte/internal"
    ) {
      return source + "/index.mjs";
    }
  }

  async transform(context: Context) {
    const fileExtension = path.posix.extname(context.path);
    const filename = path.posix.basename(context.path);
    if (fileExtension === ".svelte") {
      if (this.preprocess) {
        context.body = (
          await preprocess(String(context.body), this.preprocess, { filename })
        ).code;
      }
      const compileOptions: CompileOptions = {
        dev: true,
        preserveComments: true,
        preserveWhitespace: true,
        sveltePath: "/node_modules/svelte",
        outputFilename: filename,
        ...this.compileOptions,
        filename,
        format: "esm",
      };
      const { js, warnings } = this.compile(
        String(context.body),
        compileOptions
      );
      if (warnings) {
        for (const warning of warnings) {
          this.logger &&
            this.logger.warn(
              `[web-test-runner-svelte] Warning : ${warning.toString()}`
            );
        }
      }
      return js.code + `\n//# sourceMappingURL=` + js.map.toUrl();
    }
  }
}
