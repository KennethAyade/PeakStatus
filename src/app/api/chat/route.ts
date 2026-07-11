import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "@/data/knowledge";

/**
 * AI chat endpoint.
 *
 * The browser talks to THIS route, never to Gemini directly, so the API key
 * (GEMINI_API_KEY) stays server-side. It injects the company knowledge as the
 * system instruction, calls Gemini, and streams the answer back as plain text.
 *
 * Basic abuse guards: message count + length caps and a bounded output. Durable
 * per-IP rate limiting is a follow-up (needs a shared store like Upstash) before
 * heavy public traffic.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Rolling alias on purpose: pinned versions (e.g. gemini-2.5-flash) get retired
// for new keys and start 404-ing. "…-latest" always maps to the current model.
const MODEL = process.env.GEMINI_MODEL || "gemini-flash-latest";
const MAX_MESSAGES = 20; // keep only the most recent turns
const MAX_CHARS = 2000; // per message

type ClientMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "The assistant isn't configured yet." },
      { status: 503 },
    );
  }

  let body: { messages?: unknown };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const raw = body?.messages;
  if (!Array.isArray(raw) || raw.length === 0) {
    return Response.json({ error: "No messages provided." }, { status: 400 });
  }

  // Validate + keep only the most recent messages.
  const messages = raw.slice(-MAX_MESSAGES) as ClientMessage[];
  for (const m of messages) {
    if (
      !m ||
      (m.role !== "user" && m.role !== "assistant") ||
      typeof m.content !== "string" ||
      m.content.trim().length === 0
    ) {
      return Response.json({ error: "Malformed message." }, { status: 400 });
    }
    if (m.content.length > MAX_CHARS) {
      return Response.json(
        { error: "Message is too long." },
        { status: 400 },
      );
    }
  }
  if (messages[messages.length - 1].role !== "user") {
    return Response.json(
      { error: "The last message must be from the user." },
      { status: 400 },
    );
  }

  const contents = messages.map((m) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  let stream: AsyncGenerator<{ text?: string }>;
  try {
    const ai = new GoogleGenAI({ apiKey });
    stream = await ai.models.generateContentStream({
      model: MODEL,
      contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 800,
        temperature: 0.6,
      },
    });
  } catch {
    return Response.json(
      { error: "The assistant is temporarily unavailable." },
      { status: 502 },
    );
  }

  const encoder = new TextEncoder();
  const readable = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of stream) {
          if (chunk.text) controller.enqueue(encoder.encode(chunk.text));
        }
      } catch {
        controller.enqueue(
          encoder.encode(
            "\n\n(Sorry — I got cut off. Please try again, or reach the team on Messenger.)",
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
