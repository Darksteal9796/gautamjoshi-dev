import OpenAI from "openai";

export function getChatClient(): OpenAI {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) {
    throw new Error("OPENROUTER_API_KEY is not set");
  }
  return new OpenAI({
    apiKey: key,
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "https://gautamjoshi.dev",
      "X-Title": "gautamjoshi.dev portfolio",
    },
  });
}
