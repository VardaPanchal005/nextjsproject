import { Environment, ExecutionEnvironment } from "@/types/executor";
import puppeteer from "puppeteer";
import { LaunchBrowserTask } from "../task/LaunchBrowser";

export async function LaunchBrowserExecutor(environment:ExecutionEnvironment<typeof LaunchBrowserTask>):Promise<boolean>{
    try {
        const websiteUrl = environment.getInput("Website URL"); 
        if (!websiteUrl){
            throw new Error("Website url is not being passed properly its empty")
        }
        const browser=await puppeteer.launch({
            headless:true, 
        });           
        environment.log.info("Browser started successfully");
        environment.setBrowser(browser);
        const page=await browser.newPage();
        await page.goto(websiteUrl);
        environment.setPage(page);
        environment.log.info(`Opened page at:${websiteUrl}`)
        return true;
    }
   catch(error:any){
       environment.log.error(error.message);
       return false;
   }
} 