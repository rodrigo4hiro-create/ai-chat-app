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
console.log("OpenAIの返り値:", data);
let reply = "No response";

if (data.output_text) {
  reply = data.output_text;
} else if (data.output && data.output.length > 0) {
  const first = data.output[0];
  if (first.content && first.content.length > 0) {
    reply = first.content[0].text || "No response";
  }
}
