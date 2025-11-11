import "dotenv/config";
import express from "express";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();

app.use(express.json());

app.post("/template", async (req, res) => {
  const prompt = req.body.prompt;

  const completion = await client.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra",
      },
      { role: "user", content: prompt },
    ],
    model: "gpt-4o-mini",
    max_completion_tokens: 100,
  });
  const choice = completion.choices[0]?.message.content;
  console.log("choice for framework: ", choice);

  if (choice != "react" && choice != "node") {
    res
      .json({
        message:
          "Choice of framework could not be made. It must be either node or react",
      })
      .status(403);
    return;
  }
});

async function main() {
  const stream = await client.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "write the code for todo application" },
    ],
    model: "gpt-4o",
    temperature: 0,
    max_completion_tokens: 1000,
    stream: true,
  });
  console.log("\n=================================================");
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content || "";
    if (content) {
      process.stdout.write(content);
    }
  }
  console.log("\n=================================================");
}

main();
