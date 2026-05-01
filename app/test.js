'use client'

import OpenAI from "openai";

const client = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY, dangerouslyAllowBrowser: true
});

export default function Test() {


    const handleClick = async () => {
        const response = await client.chat.completions.create({
            model: "gpt-4.1",
            messages: [
                {
                    role: "user",
                    content: `Summarize this dialogue:
              User: I want refund.
              Agent: Refund initiated.`
                }
            ]
        });

        console.log("......", response.choices[0].message.content);

    }

    return <button onClick={handleClick}>Click</button>
}
