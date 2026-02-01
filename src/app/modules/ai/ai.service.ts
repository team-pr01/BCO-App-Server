/* eslint-disable @typescript-eslint/no-explicit-any */

import AppError from "../../errors/AppError";
import { openai } from "../../utils/openai";
import News from "../news/news.model";

interface TranslatePayload {
  newsId: string;
  title: string;
  content: string;
  tags: string[];
  category: string;
  batchLanguages: { code: string; name: string }[];
}

const aiChat = async (message: string) => {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: message }],
  });

  return completion.choices[0].message?.content || "No response";
};

const translateNews = async (payload: TranslatePayload) => {
  const { newsId, title, content, tags, category, batchLanguages } = payload;

  // Input text for GPT
  const inputText = `Title: ${title}
Content: ${content}
Tags: ${tags.join(", ")}
Category: ${category}`;

  // GPT prompt
  const systemMessage = `
You are a professional translator.
Translate the following news into exactly ${batchLanguages.length} languages provided.
Output JSON in the following format:

{
${batchLanguages
  .map(
    (lang) =>
      `  "${lang.code}": { "title": "...", "content": "...", "tags": [...], "category": "..." }`,
  )
  .join(",\n")}
}

Only include the languages listed in this fixed list:
${batchLanguages.map((lang) => `${lang.code} (${lang.name})`).join(", ")}
`;

  // Call GPT
  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemMessage },
      { role: "user", content: inputText },
    ],
    temperature: 0,
    max_tokens: 4000,
  });

  const contentRes = response.choices[0]?.message?.content;

  let translations;
  try {
    translations = JSON.parse(contentRes || "{}");
  } catch (err) {
    throw new AppError(
      500,
      "Failed to parse translations. GPT response: " + contentRes,
    );
  }

  const missingLanguages = batchLanguages.filter(
    (lang) => !translations[lang.code],
  );
  if (missingLanguages.length > 0) {
    throw new AppError(
      500,
      `GPT did not return translations for: ${missingLanguages
        .map((l) => l.name)
        .join(", ")}`,
    );
  }
  const setObj: Record<string, any> = {};
  for (const [code, value] of Object.entries(translations)) {
    const v = value as {
      title?: string;
      content?: string;
      tags?: string[];
      category?: string;
    };
    setObj[`translations.${code}`] = {
      title: v.title || "",
      content: v.content || "",
      tags: v.tags || [],
      category: v.category || category,
    };
  }

  // Update News safely
  const updatedNews = await News.findByIdAndUpdate(
    newsId,
    { $set: setObj },
    { new: true, runValidators: true },
  );
  if (!updatedNews) throw new AppError(404, "News not found");

  return updatedNews;
};

export const AiServices = {
  aiChat,
  translateNews,
};
