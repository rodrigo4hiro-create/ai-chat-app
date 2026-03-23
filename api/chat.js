export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  try {

    const { message } = req.body

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
    })

    const data = await response.json()

    let reply = JSON.stringify(data)

    if (data.output && data.output.length > 0) {
      const item = data.output[0]
      if (item.content && item.content.length > 0) {
        reply = item.content[0].text
      }
    }

    return res.status(200).json({ reply })

  } catch (error) {

    console.error(error)

    return res.status(500).json({ error: "Server error" })

  }

}
