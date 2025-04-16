import puppeteer from "puppeteer-core";
import { ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

// Browserless WebSocket endpoint (replace this with your Browserless WebSocket URL)
const BROWSERLESS_WS = "wss://chrome.browserless.io?token=S8femip0CB97gBb3204711b8288c3aea3516bc3bd0";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");

    if (!websiteUrl) {
      throw new Error("Website URL is missing");
    }

    // Connect to Browserless via WebSocket
    const browser = await puppeteer.connect({
      browserWSEndpoint: BROWSERLESS_WS, // Use the Browserless WebSocket endpoint
      defaultViewport: {
        width: 1280,      // Set a realistic viewport size
        height: 800
      }
    });

    const page = await browser.newPage(); // Open a new page
    environment.setBrowser(browser);       // Set the browser instance
    environment.setPage(page);             // Set the page instance

    environment.log.info("✅ Connected to Browserless and opened the page.");

    // Navigate to the website and wait for the page to load fully
    await page.goto(websiteUrl, { waitUntil: "networkidle2", timeout: 30000 });

    environment.log.info(`✅ Successfully opened the page at: ${websiteUrl}`);
    return true;
  } catch (error: any) {
    environment.log.error(`❌ Error during browser setup: ${error.message}`);
    return false;
  }
}
