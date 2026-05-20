'use client'

import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import {
    StructuredOutputParser,
} from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import React from "react";


const model = new ChatOpenAI({
    model: "gpt-4o-mini",
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

const LangchainParserComponent = () => {

    const cReview = `This leaf blower is pretty amazing.  It has four settings:\
    candle blower, gentle breeze, windy city, and tornado. \
    It arrived in two days, just in time for my wife's \
    anniversary present. \
    I think my wife liked it so much she was speechless. \
    So far I've been the only one using it, and I've been \
    using it every other morning to clear the leaves on our lawn. \
    It's slightly more expensive than the other leaf blowers \
    out there, but I think it's worth it for the extra features.`

    const handleClick = async () => {
        // STEP 1: Define schema
        //Zod Schema - This defines what JSON structure you expect
        const parser = StructuredOutputParser.fromZodSchema(
            z.object({
                gift: z.boolean().describe(
                    "Was the item purchased as a gift?"
                ),

                delivery_days: z.number().describe(
                    "Number of delivery days"
                ),

                price_value: z.array(z.string()).describe(
                    "Sentences about price/value"
                ),
            })
        );


        // STEP 2: Get formatting instructions
        const formatInstructions =
            parser.getFormatInstructions();
        console.log("formatInstructions", formatInstructions);

        // STEP 3: Create prompt template
        const prompt = ChatPromptTemplate.fromTemplate(`
        For the following text Extract the following information:
    
    text: {text}
    
    {format_instructions}
        `);

        // STEP 4: Inject variables
        const messages = await prompt.formatMessages({
            text: cReview,
            format_instructions: formatInstructions,
        });

        // STEP 5: Send to model
        const response = await model.invoke(messages);

        // STEP 6: Parse clean JSON
        const parsedResponse = await parser.parse(
            response.content as string
        );

        console.log("parsedResponse",parsedResponse, typeof(parsedResponse), parsedResponse.gift);
    }

    return <div>
    <button onClick={handleClick}>Handle Langchain Parser</button>
  </div>

}
export default LangchainParserComponent;
