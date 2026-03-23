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

  let reply = "No response";

// ① シンプルな返り値
if (data.output_text) {
  reply = data.output_text;
} 
// ② 配列の返り値
else if (data.output && Array.isArray(data.output)) {
  try {
    reply = data.output
      .map(o => o.content?.map(c => c.text).join(""))
      .join("");
  } catch (e) {
    console.log("取り出し失敗:", data);
  }
}

    return res.status(200).json({ reply });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
