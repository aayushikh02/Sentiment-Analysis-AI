'use client'

import OpenAI from "openai";
import { useState } from "react"

const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true
});


const PromptTest = () => {

    const story = `"""
    In a recent survey conducted by the government, 
    public sector employees were asked to rate their level 
    of satisfaction with the department they work at. 
    The results revealed that NASA was the most popular 
    department with a satisfaction rating of 95%.
    
    One NASA employee, John Smith, commented on the findings, 
    stating, "I'm not surprised that NASA came out on top. 
    It's a great place to work with amazing people and 
    incredible opportunities. I'm proud to be a part of 
    such an innovative organization."
    
    The results were also welcomed by NASA's management team, 
    with Director Tom Johnson stating, "We are thrilled to 
    hear that our employees are satisfied with their work at NASA. 
    We have a talented and dedicated team who work tirelessly 
    to achieve our goals, and it's fantastic to see that their 
    hard work is paying off."
    
    The survey also revealed that the 
    Social Security Administration had the lowest satisfaction 
    rating, with only 45% of employees indicating they were 
    satisfied with their job. The government has pledged to 
    address the concerns raised by employees in the survey and 
    work towards improving job satisfaction across all departments.
    """`



    const handleClick = async () => {

        const prompt = `Determine five topics that are being discussed in the \
        following text, which is delimited by triple backticks.
        
        Make each item one or two words long. 
        
        Format your response as a list of items separated by commas.
            
        story: ${story}
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

    return <div>
        <button onClick={handleClick}>Click</button>
    </div>
}


export default PromptTest;