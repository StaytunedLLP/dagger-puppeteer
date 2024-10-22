import puppeteer from "https://deno.land/x/puppeteer_plus/core.ts";
try {
    console.log("Launching Puppeteer...");
    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        protocolTimeout: 60000,
        headless: true,
    });
    const page = await browser.newPage();
    await page.goto("https://example.com");
    await page.screenshot({ path: "example.png" });
    await browser.close();
    console.log("Screenshot saved to example.png");
} catch (error) {
    console.error("Error", error);
}
