// دالة لترجمة أي لغة إلى الإنجليزية لضمان فهم الذكاء الاصطناعي بدقة
async function translateToEnglish(text) {
  try {
    const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=en&dt=t&q=${encodeURIComponent(text)}`);
    const data = await res.json();
    return data[0][0][0];
  } catch (error) {
    return text; // في حالة وقع مشكل يرجع النص الأصلي
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // 1. ترجمة الإدخال تلقائياً للإنجليزية
    const translatedPrompt = await translateToEnglish(prompt);

    // 2. تعزيز البرومبت لإجبار الألوان، الوضوح، واستيل الستيكر الممتاز
    const finalEnhancedPrompt = `die-cut sticker of ${translatedPrompt}, vibrant bright full color, highly detailed 4k, vector art style, thick crisp white border, high resolution, sharp lines, glossy finish, isolated background`;

    const cleanPrompt = encodeURIComponent(finalEnhancedPrompt);
    const randomCache = Math.floor(Math.random() * 1000000);
    
    // 3. توليد رابط الصورة المحسنة بالذكاء الاصطناعي
    const imageUrl = `https://image.pollinations.ai/prompt/${cleanPrompt}?nologo=true&seed=${randomCache}&width=768&height=768`;

    return res.status(200).json({ 
      success: true, 
      imageUrl: imageUrl 
    });

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
}
  
