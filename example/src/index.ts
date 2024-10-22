/**
 * A generated module for DaggerPuppeteer functions
 *
 * This module has been generated via dagger init and serves as a reference to
 * basic module structure as you get started with Dagger.
 *
 * Two functions have been pre-created. You can modify, delete, or add to them,
 * as needed. They demonstrate usage of arguments and return types using simple
 * echo and grep commands. The functions can be called from the dagger CLI or
 * from one of the SDKs.
 *
 * The first line in this comment block is a short description line and the
 * rest is a long description with more detail on the module's purpose or usage,
 * if appropriate. All modules should have a short description.
 */
import {
  argument,
  Container,
  dag,
  Directory,
  func,
  object,
} from "@dagger.io/dagger";

@object()
class DaggerPuppeteer {
  /**
   * Returns a container that echoes whatever string argument is provided
   */
  @func()
  containerEcho(stringArg: string): Container {
    return dag.container().from("alpine:latest").withExec(["echo", stringArg]);
  }

  /**
   * Returns lines that match a pattern in the files of the provided Directory
   */
  @func()
  async grepDir(directoryArg: Directory, pattern: string): Promise<string> {
    return dag
      .container()
      .from("alpine:latest")
      .withMountedDirectory("/mnt", directoryArg)
      .withWorkdir("/mnt")
      .withExec(["grep", "-R", pattern, "."])
      .stdout();
  }

  @func()
  async runPuppeteerScript(
    @argument({ defaultPath: "/test" }) source: Directory,
  ): Promise<string> {
    const denoContainer = dag
      .container()
      .from("linuxserver/chromium:latest")
      .withDirectory("/test", source)
      .withWorkdir("/test")
      .withExec([
        "apt-get",
        "update",
      ])
      .withExec([
        "apt-get",
        "install",
        "curl",
        "unzip",
        "-y",
      ])
      .withExec([
        "sh",
        "-c",
        "curl -fsSL https://deno.land/x/install/install.sh | sh",
      ]).withEnvVariable("PUPPETEER_SKIP_CHROMIUM_DOWNLOAD", "true")
      .withEnvVariable("DENO_INSTALL", "/config/.deno")
      // .withEnvVariable("PATH", "/config/.deno/bin:$PATH")
      .terminal()
      .withExec([
        "sh",
        "-c",
        `/config/.deno/bin/deno run --allow-read="/config/.cache/node_modules,/config/.cache/deno/node_modules" --allow-env --allow-write --allow-run="/usr/bin/chromium" --allow-net /test/index.ts`,
      ])
      .stdout();
  }
}
