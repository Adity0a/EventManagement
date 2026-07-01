import 'dotenv/config';
import generateAIContent from './config/groq.js';

async function test() {
    console.log("Testing Groq API...");
    console.log("API Key found:", process.env.GROQ_API_KEY ? "Yes (length: " + process.env.GROQ_API_KEY.length + ")" : "No");

    try {
        const content = await generateAIContent("Test event title");
        console.log("Success! Generated content length:", content.length);
        console.log("Sample content:", content.substring(0, 100) + "...");
    } catch (error) {
        console.error("Test failed!");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        if (error.status) console.error("Status code:", error.status);
    }
}

test();
