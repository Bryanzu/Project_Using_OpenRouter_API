import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import {marked} from "marked";

dotenv.config()

const app = express();
const port = 3000;
const OP_API_KEY = process.env.OP_API_KEY
const url = "https://openrouter.ai/api/v1/";
// const hf = new InferenceClient(process.env.API_KEY);

const config = {
        headers: {
          Authorization: `Bearer ${OP_API_KEY}`, // API key from environment variables
          "Content-Type": "application/json"
        },
      }
// const body = 

const headers = {
  Authorization: `Bearer ${OP_API_KEY}`,
  "Content-Type": "application/json",
  "HTTP-Referer": "http://localhost:3000",
};

const data = {
  model: "mistralai/mistral-small-3.2-24b-instruct:free", // or any other model
  messages: [{ role: "user", content: "Tell me a joke." }],
};

app.use(express.urlencoded({extended:true}))
app.use(express.static("public"));
app.use(express.json());

app.get("/", async(req, res) => {
  res.render("index.ejs");

});

app.post("/ask", async (req, res) => {
  const question = req.body.question;
  console.log(question)
  try {
    const response = await axios.post(
      `${url}completions`,
      {
        model: "google/gemma-3n-e4b-it:free", 
        prompt: `${question}}`,
      },
      config
    );
    const answer = marked(response.data.choices[0].text); 
    res.json(answer)
  } catch (error) {
    console.error("Error during inference:", error.message, { question });
    res.status(500).json({ error: "An error occurred while processing your request." });
}

});

    
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});









// const question = req.body.question;
// try {
//     const response = await hf.chatCompletion({
//         provider: "fireworks-ai",
//         model: "deepseek-ai/DeepSeek-R1",
//         messages: [
//             {
//                 role: "user",
//                 content: `Think before answering, the user asked ${question}`,
//             },
//         ],
//     });
//     const rawText = response.choices[0].message.content;
//     const thinks = [...rawText.matchAll(/<think>([\s\S]*?)<\/think>/g)].map(m => m[1]);
//     const answer = rawText.replace(/<think>[\s\S]*?<\/think>/g, '');
//     // console.log(thinks)
//     res.json({thinks, answer});

// } catch (error) {
//     console.error("Error during inference:", error.message, { question });
//     res.status(500).json({ error: "An error occurred while processing your request." });
// }