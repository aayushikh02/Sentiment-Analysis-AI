'use client'

import OpenAI from "openai";
import { useState } from "react"

const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true
});


const PromptTest = () => {

    const text1 = `"""Got this panda plush toy for my daughter's birthday, \
    who loves it and takes it everywhere. It's soft and \ 
    super cute, and its face has a friendly look. It's \ 
    a bit small for what I paid though. I think there \ 
    might be other options that are bigger for the \ 
    same price. It arrived a day earlier than expected, \ 
    so I got to play with it myself before I gave it \ 
    to her."""`

    const prompt = `Your task is to generate a short summary of a product \
    review from an ecommerce site and focusing on any aspects \
    that mention shipping and delivery of the product.. 
    
    Summarize the review below, delimited by triple 
    backticks, in at most 30 words. 
    
    Review: ${text1}
    `

    const handleClick = async () => {
        const response = await client.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "user",
                    content: prompt,
                    temperature: 0, // this is the degree of randomness of the model's output
                }
            ]
        });

        console.log(response.choices[0].message.content);

    }

    return <div>
        <button onClick={handleClick}>Click</button>
    </div>
}


export default PromptTest;