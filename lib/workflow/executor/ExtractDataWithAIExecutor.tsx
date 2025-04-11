import {ExecutionEnvironment } from "@/types/executor"; 
import { ExtractDataWithAITask } from "../task/ExtractDataWithAi"; 
import prisma from "@/lib/prisma"; 
import { symmetricDecrypt } from "@/lib/encryption";
import Groq from "groq-sdk";

export async function ExtractDataWithAiExecutor(environment: ExecutionEnvironment<typeof ExtractDataWithAITask>): Promise<boolean> {
    try {
        const credentials = environment.getInput("Credentials");
        if (!credentials) {
            environment.log.error("input->credentials not defined");
            return false;
        }
        
        const content = environment.getInput("Content");
        if (!content) {
            environment.log.error("input->content not defined");
            return false;
        }
        
        const prompt = environment.getInput("Prompt");
        if (!prompt) {
            environment.log.error("input->prompt not defined");
            return false;
        }
        
        const credential = await prisma.credential.findUnique({
            where: {id: credentials},
        });
        if (!credential) {
            environment.log.error("credential not found");
            return false;
        }
        
        const plainCredentialValue = symmetricDecrypt(credential.value);
        if (!plainCredentialValue) {
            environment.log.error("Failed to decrypt credential");
            return false;
        }

        const groq = new Groq({ apiKey: plainCredentialValue });
        
        const systemPrompt = 'You are a webscraper helper that extracts data from HTML or text. You will be given a piece of text or HTML content as input and also the prompt with the data you want to extract. The response should always be only the extracted data as a JSON array or object, without any additional words or explanations. Analyze the input carefully and extract data precisely based on the prompt. If no data is found, return an empty JSON array. Work only with the provided content and ensure the output is always a valid JSON array without any surrounding text';
        const userContent = `Content: ${content}\nPrompt: ${prompt}`;

        const completion = await groq.chat.completions.create({
            model: 'llama-3.3-70b-versatile',
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: userContent
                }
            ]
        });
        
        const result = completion.choices[0].message.content;
        
        if (!result) {
            environment.log.error("Empty response from AI");
            return false;
        }
        
        environment.setOutput("Extracted data", result);
        return true;
    }
    catch(error: any) {
        environment.log.error(error.message);
        return false;
    }
}