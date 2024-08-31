import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const lastMessage = messages[messages.length - 1];

  // Extract the language from the last message
  const language = lastMessage.content.includes('in English') ? 'English' : 'Montenegrin';

  const prompt = `You are a creative storyteller specializing in short stories about Bar, Montenegro. 
  Create a story based on the following prompt, respecting the specified genre, tone, and location. 
  The story should be engaging, descriptive, and capture the essence of Bar.
  Respond ONLY in ${language}.`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    stream: true,
    messages: [
      { role: 'system', content: prompt },
      ...messages
    ]
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}