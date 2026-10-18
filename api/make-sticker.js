export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "الرجاء كتابة وصف للملصق" });
    }

    // تجهيز النص وتحسينه
    const cleanPrompt = encodeURIComponent(`die cut sticker, ${prompt}, white border, vector, highly detailed, logo A&O`);
    
    // استخدام مصدر مجاني ومباشر يولد الصور فوراً
    const randomCache = Math.floor(Math.random() * 999999);
    const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?width=512&height=512&nologo=true&private=true&enhance=false&seed=${randomCache}`;

    return res.status(200).json({ url: imageUrl });

  } catch (error) {
    return res.status(500).json({ error: 'حدث خطأ أثناء توليد الملصق' });
  }
        }
        
