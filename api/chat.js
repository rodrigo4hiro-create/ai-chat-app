export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {

    const { message } = req.body;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "mistralai/mistral-7b-instruct",
        messages: [
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    console.log("OpenRouter response:", data);

    let reply = "AI error";

    if (data.error) {
      reply = "API ERROR: " + data.error.message;
    }

    if (data.choices && data.choices.length > 0) {
      reply = data.choices[0].message.content;
    }

    return res.status(200).json({ reply });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      reply: "SERVER ERROR"
    });

  }

}
