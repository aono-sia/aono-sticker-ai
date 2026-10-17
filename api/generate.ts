export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Use POST');
  
  const { prompt } = req.body;
  if (!prompt) return res.status(400).send('Missing prompt');
  
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'dall-e-3',
      prompt: `cute sticker of ${prompt}, white background, kawaii style`,
      size: '1024x1024'
    })
  });
  
  const data = await response.json();
  res.status(200).json({ url: data.data[0].url });
}
