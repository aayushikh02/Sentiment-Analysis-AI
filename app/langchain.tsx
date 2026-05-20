'use client'

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";

import React from "react";

const model = new ChatOpenAI({
  model: "gpt-4o-mini",
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
console.log('model', model);


const LangchainComponent = () => {

  const handleClick = async () => {
    console.log("....")

    const templateString = `
    Translate the text delimited by triple quotes into a style that is {style} text: """{text}"""
    `;

    const customerEmail = `Arrr, I be fuming that me blender lid \
    flew off and splattered me kitchen walls \
    with smoothie! And to make matters worse, \
    the warranty don't cover the cost of \
    cleaning up me kitchen. I need yer help \
    right now, matey!`

    const customerReply = `Hey there customer, \
    the warranty does not cover \
    cleaning expenses for your kitchen \
    because it's your fault that \
    you misused your blender \
    by forgetting to put the lid on before \
    starting the blender. \
    Tough luck! See ya!`;


    const promptTemplate = ChatPromptTemplate.fromTemplate(
      templateString
    );

    //customer
    // const formattedPrompt = await promptTemplate.formatMessages({
    //   text: customerEmail,
    //   style: 'American english and in calm and respectful tone'
    // });

    //reply from service guy
    const formattedPrompt = await promptTemplate.formatMessages({
      text: customerReply,
      style: 'a polite tone that speaks in english pirate'
    });
    console.log("prompt", promptTemplate, '...', promptTemplate[0], '...', formattedPrompt)

    const response = await model.invoke(formattedPrompt);


    console.log("response", response.content);
  }


  return <div>
    <button onClick={handleClick}>Handle Langchain</button>
  </div>
}

export default LangchainComponent;