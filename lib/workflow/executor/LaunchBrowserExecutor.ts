import puppeteer from "puppeteer-core";
import { ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";


const BROWSERLESS_WS = "wss://chrome.browserless.io?token=S8femip0CB97gBb3204711b8288c3aea3516bc3bd0";

export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");

    if (!websiteUrl) {
      throw new Error("Website URL is missing");
    }


    const browser = await puppeteer.connect({
      browserWSEndpoint: BROWSERLESS_WS,
      defaultViewport: {
        width: 1280,    
        height: 800
      }
    });

    const page = await browser.newPage(); 
    environment.setBrowser(browser);      
    environment.setPage(page);            

    environment.log.info("✅ Connected to Browserless and opened the page.");


    await page.goto(websiteUrl, { waitUntil: "networkidle2", timeout: 30000 });

    environment.log.info(`✅ Successfully opened the page at: ${websiteUrl}`);
    return true;
  } catch (error: any) {
    environment.log.error(`❌ Error during browser setup: ${error.message}`);
    return false;
  }
}
