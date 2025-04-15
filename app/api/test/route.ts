import { getOptions } from "@/lib/puppeteerOptions";
import { NextRequest } from "next/server";
import puppeteer from "puppeteer-core";

export async function GET(req:NextRequest){
    try {
        const options = await getOptions();
        const browser = await puppeteer.launch(options);
        
        const page = await browser.newPage();
        await page.goto("https://quotes.toscrape.com/login");
        return Response.json({success: `${page.url()} visited`});
    } catch (error) {
        return Response.json({error})
    }

}