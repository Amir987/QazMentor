// ✅ Исправленный и совместимый с Vercel (Node.js 18+)
export default async function handler(req, res) {
  try {
    // Универсально читаем тело запроса (для разных версий Node)
    const body = req.body || (await new Promise((resolve) => {
      let data = "";
      req.on("data", (chunk) => { data += chunk; });
      req.on("end", () => resolve(JSON.parse(data || "{}")));
    }));

    const { messages } = body;

    // Запрос к OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
      }),
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error("Ошибка:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}



