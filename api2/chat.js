export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: message
      })
    });

    const data = await response.json();

    const aiText = data.output_text || "（返答なし）";

    res.status(200).json({ reply: aiText });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "エラーが発生しました" });
  }
}
