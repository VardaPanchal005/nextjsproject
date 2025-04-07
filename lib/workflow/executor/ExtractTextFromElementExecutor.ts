import {ExecutionEnvironment } from "@/types/executor";
import { ExtractTextFromElementTask } from "../task/ExtractTextFromElement";
import * as cheerio from "cheerio";

export async function ExtractTextFromElementExecutor(environment:ExecutionEnvironment<typeof ExtractTextFromElementTask >):Promise<boolean>{
    try {
        const selector= environment.getInput("Selector")
        if (!selector){
            environment.log.error("Selector is not provided")
            return false;
        }
        const html=environment.getInput("HTML");
        if (!html){
            environment.log.error("html is not provided")
            return false;
        }

        const $=cheerio.load(html);
        const element=$(selector);

        if (!element){
            environment.log.error("element is not provided")
            return false;
        }
        const extractedText=$.text(element);
        if (!extractedText){
            environment.log.error("Element has no text")
            return false;
        }
        environment.setOutput("Extracted Text",extractedText);
        return true;
    }
   catch(error:any){
       environment.log.error(error.message);
       return false;
   }
}