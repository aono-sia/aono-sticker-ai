export default async function handler(req, res) {
  // استقبال طلبات POST فقط
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "الرجاء كتابة وصف للملصق" });
    }

    // تحسين الوصف لتوليد ملصق احترافي بشعار A&O
    const stickerPrompt = `sticker style of ${prompt}, with text logo A&O, die-cut vector sticker, white border, vibrant colors, clean background`;

    // استخدام محرك الذكاء الاصطناعي المجاني (Pollinations AI)
    const encodedPrompt = encodeURIComponent(stickerPrompt);
    const randomSeed = Math.floor(Math.random() * 1000000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${randomSeed}&nologo=true&model=flux`;

    // إرجاع رابط الصورة المولد بنجاح
    return res.status(200).json({ url: imageUrl });

  } catch (error) {
    return res.status(500).json({ error: 'حدث خطأ أثناء توليد الملصق' });
  }
  }
  
