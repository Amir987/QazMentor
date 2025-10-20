// ✅ Исправленный вариант для Vercel (Node.js 18+)
export default async function handler(req, res) {
  try {
    // Читаем тело запроса (универсально для разных Node-сред)
    const body = req.body || await new Promise((resolve, reject) => {
      let data = "";
      req.on("data", chunk => { data += chunk });
      req.on("end", () => {
        try {
          resolve(JSON.parse(data || "{}"));
        } catch (err) {
          reject(err);
        }
      });
    });

    const { messages } = body;

    if (!messages) {
      return res.status(400).json({ error: "No messages provided" });
    }

    // Запрос к OpenAI API
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

    // Ответ от OpenAI
    const data = await response.json();
    res.status(200).json(data);

  } catch (error) {
    console.error("❌ Ошибка сервера:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

}




