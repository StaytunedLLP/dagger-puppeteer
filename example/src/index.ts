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
  @func()
  async runPuppeteerScript(
    @argument({ defaultPath: "/test" }) source: Directory,
  ): Promise<void> {
    const container = dag
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
      .withEntrypoint(["sh", "-c"])
      .withDefaultArgs([
        "/config/.deno/bin/deno run --allow-read --allow-env --allow-write --allow-run --allow-net --allow-sys /test/index.ts"
      ])
      .terminal()
    console.log("Container response ", await container.stdout());
  }
}
