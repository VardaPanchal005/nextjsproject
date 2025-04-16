import puppeteer from "puppeteer-core";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

const BROWSERLESS_WS = "wss://chrome.browserless.io?token=S8femip0CB97gBb3204711b8288c3aea3516bc3bd0";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");

    if (!websiteUrl) {
      throw new Error("Website URL is not being passed properly. It's empty.");
    }

    const browser = await puppeteer.connect({
      browserWSEndpoint: BROWSERLESS_WS,
    });

    environment.log.info("Connected to Browserless instance");
    environment.setBrowser(browser);

    const page = await browser.newPage();
    await page.goto(websiteUrl, { waitUntil: "networkidle2" });

    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);

    return true;
  } catch (error: any) {
    environment.log.error(`Error: ${error.message}`);
    return false;
  }
}
