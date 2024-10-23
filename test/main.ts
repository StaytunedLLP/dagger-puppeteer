import puppeteer from "npm:puppeteer";
try {
    console.log("Launching Puppeteer...");
    const browser = await puppeteer.launch({
        executablePath: "/usr/bin/chromium",
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
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
