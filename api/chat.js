export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ reply: "Method not allowed" });
  }

  try {

    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://vercel.app",
        "X-Title": "ai-chat"
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    console.log("OpenRouter:", data);

    let reply = "No response";

    if (data.choices && data.choices.length > 0) {
      reply = data.choices[0].message.content;
    }

    return res.status(200).json({ reply });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      reply: "Server error"
    });

  }

}
