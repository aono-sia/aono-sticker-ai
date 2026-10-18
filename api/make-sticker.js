export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "الرجاء كتابة وصف للملصق" });
    }

    // تحسين الوصف ليكون خفيفاً وسريع التوليد
    const cleanPrompt = encodeURIComponent(`sticker style of ${prompt}, die-cut vector sticker, white border, clean background`);
    
    // رابط مباشر وخفيف لتجنب قيود الانتظار
    const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=512&height=512&nologo=true`;

    return res.status(200).json({ url: imageUrl });

  } catch (error) {
    return res.status(500).json({ error: 'حدث خطأ أثناء توليد الملصق' });
  }
      }
