export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { message } = req.body

  try {

    const response = await fetch(
      "https://api.cloudflare.com/client/v4/accounts/ai/run/@cf/meta/llama-3-8b-instruct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          messages: [
            { role: "user", content: message }
          ]
        })
      }
    )

    const data = await response.json()

    const reply = data.result.response

    return res.status(200).json({ reply })

  } catch (error) {

    console.error(error)

    return res.status(500).json({ error: "Server error" })

  }

}
