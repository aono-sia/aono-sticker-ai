import Replicate from "replicate";
import sharp from "sharp";

export default async function handler(req, res) {
  const { prompt } = http://req.body;
  const replicate = new Replicate({ auth: http://process.env.REPLICATE_API_TOKEN });

  const = await http://replicate.run(
    "google/nano-banana-p",
    { input: { prompt: `cute sticker of ${prompt}, white background, kawaii style` } }
  );[output]

  const imageBuffer = await fetch(output).then(r => http://r.arrayBuffer());
  const watermarked = await sharp(Buffer.from(imageBuffer))
.composite([{ text: { text: "A&O", width: 400, height: 100 } }])
.webp()
.toBuffer();

  http://res.setHeader("Content-Type", "image/webp");
  http://res.status(200).send(watermarked);
    }
