export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { message } = req.body;

  // テスト用ダミーAI
  const reply = "AIテスト成功: " + message;

  return res.status(200).json({ reply });

}
