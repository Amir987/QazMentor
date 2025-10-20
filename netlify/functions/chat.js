// netlify/functions/chat.js
import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    // Разрешаем CORS
    if (event.httpMethod === "OPTIONS") {
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: "",
      };
    }

    // Проверяем тело запроса
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No message received" }),
      };
    }

    const { message } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Empty message" }),
      };
    }

    console.log("📩 Incoming message:", message);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.AI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a kind and friendly AI psychologist that helps Kazakh and Russian students prepare for the ENT exam. Encourage, motivate, and answer briefly in Kazakh or Russian.",
          },
          { role: "user", content: message },
        ],
      }),
    });

    const data = await response.json();

    console.log("✅ OpenAI response:", data);

    const reply =
      data?.choices?.[0]?.message?.content ||
      "Қате орын алды 😔 (error: no content)";

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("❌ ERROR:", error.message);
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: JSON.stringify({ error: error.message }),
    };
  }
}
