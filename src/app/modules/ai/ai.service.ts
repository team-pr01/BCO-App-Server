/* eslint-disable @typescript-eslint/no-explicit-any */

import { openai } from "../../utils/openai";

const aiChat = async (message: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: message }],
  });

  return completion.choices[0].message?.content || "No response";
};

export const AiServices = {
  aiChat,
};