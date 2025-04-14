import puppeteer from "puppeteer-core";
import { Environment, ExecutionEnvironment } from "@/types/executor";
import { LaunchBrowserTask } from "../task/LaunchBrowser";
import { getOptions } from "../../puppeteerOptions";


export async function LaunchBrowserExecutor(
  environment: ExecutionEnvironment<typeof LaunchBrowserTask>
): Promise<boolean> {
  try {
    const websiteUrl = environment.getInput("Website URL");

    if (!websiteUrl) {
      throw new Error("Website URL is not being passed properly. It's empty.");
    }


    const options = await getOptions(); 
    const browser = await puppeteer.launch(options);

    environment.log.info("Browser started successfully");
    environment.setBrowser(browser);

    const page = await browser.newPage();
    await page.goto(websiteUrl);

    environment.setPage(page);
    environment.log.info(`Opened page at: ${websiteUrl}`);

    return true;
  } catch (error: any) {
    environment.log.error(error.message);
    return false;
  }
}
