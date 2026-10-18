export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "الرجاء كتابة وصف للملصق" });
    }

    // إضافة اسم A&O ووصف الملصق الاحترافي
    const stickerPrompt = `${prompt}, sticker style, featuring "A&O" logo signature, die-cut sticker with white border, clean vector art, high resolution`;

    const response = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "dall-e-3",
        prompt: stickerPrompt,
        n: 1,
        size: "1024x1024"
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "فشل توليد الصورة" });
    }

    return res.status(200).json({ url: data.data[0].url });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
      }
    
