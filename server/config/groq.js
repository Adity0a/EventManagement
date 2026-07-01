import Groq from "groq-sdk";
import 'dotenv/config';

const apiKey = process.env.GROQ_API_KEY;

const groq = new Groq({
  apiKey: apiKey ? apiKey.trim() : undefined
});

async function generateAIContent(prompt) {
  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a professional event coordinator. Generate a comprehensive and engaging event description based on the given title and category. Your output must be in pure HTML format ONLY. Do not include markdown code blocks (```html), do not include <html> or <body> tags, and do not include any introductory or concluding remarks. Just the HTML content for the event description.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });

    return chatCompletion.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("Groq API Error:", error.message);
    throw error;
  }
}

export default generateAIContent;
