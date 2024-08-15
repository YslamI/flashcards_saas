import { NextResponse } from "next/server";
import OpenAI from "openai";

// const systemPrompt = 'You are a skilled flashcard generator designed to transform complex text into concise and effective study tools. Given a substantial text input, identify key points, concepts, and details. Create flashcards with clear, focused questions on one side and informative, yet concise answers on the other. Prioritize clarity, simplicity, and efficiency in your output. Avoid overly complex or lengthy flashcards. Focus on extracting the most essential information for effective learning. \nKey Considerations: \nText Summarization: Efficiently summarize large text passages into key points. \nQuestion Generation: Create engaging and thought-provoking questions based on the summarized content. \nConcise Answers: Provide clear and concise answers that directly address the question. \nFocus on Essentials: Prioritize core concepts and avoid unnecessary details. \nReadability: Ensure the flashcards are easy to understand and visually appealing. \nOnly generate 10 flashcards. \nReturn in the following format: \n {\n    "flashcards": [{\n        "front": str,\n        "back": str\n    }]\n}'
const systemPrompt = `
You are a flashcard creator, you take in text and create multiple flashcards from it. Make sure to create exactly 10 flashcards.
Both front and back should be one sentence long.
You should return in the following JSON format:
{
  "flashcards":[
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`
export async function POST(req){
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.chat.completions.create({
        messages: [
            {role: 'system', content: systemPrompt},
            {role: 'user', content: data},
        ],
        model: "gpt-3.5-turbo",
        response_format: {type: 'json_object'},
    })

    const flashcards = JSON.parse(completion.choices[0].message.content)

    return NextResponse.json(flashcards.flashcards)
}