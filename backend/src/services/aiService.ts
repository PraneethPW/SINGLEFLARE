import { env } from "../config/env.js";

export async function askOpenRouter(message: string) {
  if (!env.openRouterApiKey) {
    return [
      "Immediate guidance:",
      "1. Move people away from water, damaged wires, unstable walls, and blocked exits.",
      "2. Confirm exact location, headcount, injuries, and urgent supplies.",
      "3. Prioritize children, elderly people, disabled people, and medical cases.",
      "4. Send concise updates every 10 minutes until responders arrive."
    ].join("\n");
  }

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.openRouterApiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": env.frontendUrl,
      "X-Title": "SignalFlare"
    },
    body: JSON.stringify({
      model: env.openRouterModel,
      messages: [
        { role: "system", content: "You are SignalFlare, a concise emergency response assistant. Give safe, practical disaster guidance." },
        { role: "user", content: message }
      ]
    })
  });

  if (!response.ok) throw new Error(`OpenRouter failed: ${response.status}`);
  const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  return data.choices?.[0]?.message?.content ?? "No AI response returned.";
}
