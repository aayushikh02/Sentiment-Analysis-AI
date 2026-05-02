'use client'

import OpenAI from "openai";
import { useState } from "react"

const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true
});


const PromptTest = () => {

    const review_1 = `"""Got this panda plush toy for my daughter's birthday, \
    who loves it and takes it everywhere. It's soft and \ 
    super cute, and its face has a friendly look. It's \ 
    a bit small for what I paid though. I think there \ 
    might be other options that are bigger for the \ 
    same price. It arrived a day earlier than expected, \ 
    so I got to play with it myself before I gave it \ 
    to her."""`

    const review_2 = ` """
Needed a nice lamp for my bedroom, and this one \
had additional storage and not too high of a price \
    point.Got it fast - arrived in 2 days.The string \
to the lamp broke during the transit and the company \
happily sent over a new one.Came within a few days \
as well.It was easy to put together.Then I had a \
missing part, so I contacted their support and they \
very quickly got me the missing piece! Seems to me \
to be a great company that cares about their customers \
and products. 
"""`



    const reviews = [review_1, review_2]
    const handleClick = async () => {

        for (let i = 0; i < reviews.length; i++) {

            const prompt = `Your task is to extract relevant information from \ 
            a product review from an ecommerce site to give \
            feedback to the Shipping department. 
            
            From the review below, delimited by triple quotes \
            extract the information relevant to shipping and \ 
            delivery. Limit to 30 words.
            
            Review: ${reviews[i]}
            `

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
    }

    return <div>
        <button onClick={handleClick}>Click</button>
    </div>
}


export default PromptTest;