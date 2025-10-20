// ✅ Исправленный для Vercel (CommonJS формат)
export default async function handler(req, res) {
  try {
    // Читаем тело запроса (универсально для всех Node-версий)
    const body = req.body || (await req.json?.()) || {};
    const { messages } = body;

    // Запрос к OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages
      })
    });

    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error("Ошибка в chat.js:", error);
    res.status(500).json({ error: "Ошибка на сервере (API Chat)" });
  }
}


