import { NextRequest } from "next/server";
import puppeteer, { PuppeteerLaunchOptions } from "puppeteer-core";
import chromium from "@sparticuz/chromium";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {

    const remoteExecutablePath =
 "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar"
    const options:PuppeteerLaunchOptions = {
        args: chromium.args,
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath(remoteExecutablePath),
        headless: chromium.headless,
    }
  const browser = await puppeteer.launch(options);

  const page = await browser.newPage();
  await page.goto("https://quotes.toscrape.com/login");
  return Response.json({ success: `${page.url()} visited` });
}
