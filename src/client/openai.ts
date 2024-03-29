import OpenAI from "openai";
const openai = new OpenAI({
    apiKey: process.env.openAIKey,
    dangerouslyAllowBrowser: true// defaults to process.env["OPENAI_API_KEY"]
  });
  
export default openai