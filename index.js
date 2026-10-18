export async function POST(req) {
  const { prompt } = await req.json();
  
  const res = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ 
      prompt: `sticker of ${prompt}, clean white background, cute cartoon style`,
      n: 1, 
      size: "512x512" 
    })
  });
  
  const data = await res.json();
  return new Response(JSON.stringify({ url: data.data[0].url }), {
    headers: { "Content-Type": "application/json" }
  });
}
