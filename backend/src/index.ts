import "dotenv/config";
import express from "express";
import OpenAI from "openai";
import { BASE_PROMPT } from "./templates/basePrompt.js";
import { basePrompt as nodeBasePrompt } from "./templates/node.js";
import { basePrompt as reactBasePrompt } from "./templates/react.js";

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

  if (choice == "react") {
    res.json({
      prompts: [
        BASE_PROMPT,
        `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
      ],
      uiPrompts: [reactBasePrompt],
    });
    return;
  }

  if (choice === "node") {
    res.json({
      prompts: [
        `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`,
      ],
      uiPrompts: [nodeBasePrompt],
    });
    return;
  }

  res.status(403).json({ message: "You cant access this" });
  return;
});

app.post("/chat", async (req, res) => {
  try {
    const messages = req.body.messages;

    if (!messages) {
      res.status(400).json({ error: "Messages are required" });
      return;
    }

    const response = await client.responses.create({
      model: "gpt-5",
      max_output_tokens: 8000,
      input: messages,
    });

    res.json({ code: response.output_text }).status(200);
  } catch (error) {
    console.error("Error in /chat endpoint:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

app.listen(3000);

// async function main() {
//   const stream = await client.chat.completions.create({
//     messages: [
//       { role: "system", content: "You are a helpful assistant." },
//       { role: "user", content: "write the code for todo application" },
//     ],
//     model: "gpt-4o",
//     temperature: 0,
//     max_completion_tokens: 1000,
//     stream: true,
//   });
//   console.log("\n=================================================");
//   for await (const chunk of stream) {
//     const content = chunk.choices[0]?.delta?.content || "";
//     if (content) {
//       process.stdout.write(content);
//     }
//   }
//   console.log("\n=================================================");

//   const response = client.responses.create({
//     model: "gpt-5-codex",
//     input: [
//       {
//         role: "system",
//         content:
//           "write self contained typescript component files for any user requirements",
//       },
//       {
//         role: "user",
//         content:
//           "create a beautiful react component for an animated todo app hero section in neomorphism design",
//       },
//     ],
//     max_output_tokens: 8000,
//   });

//   console.log("response", (await response).output_text);
// }

// main();
