// ✅ Updated /pages/api/scan.ts
import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url, mode = 'full' } = req.body
  const brand = extractBrandFromUrl(url)

  const modeDescription =
    mode === 'social'
      ? 'Focus only on social media reviews and discussions.'
      : mode === 'search'
      ? 'Focus only on search engine reviews and website content.'
      : 'Include all available public reviews from social media, websites, forums, and marketplaces.'

  const prompt = `You are a brand analyst.

${modeDescription}

Based on public reviews and discussions about "${brand}", provide a structured JSON with:
{
  "sentiment": { "positive": %, "neutral": %, "negative": % },
  "totalReviews": number,
  "topics": [
    { "label": "Topic name", "value": number of comments }, ...
  ],
  "summary": "3-paragraph summary text"
}

Only return the JSON. Do not include explanations.`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
    })

    const raw = completion.choices[0]?.message?.content || ''

    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch (e) {
      console.error('GPT returned invalid JSON:', raw)
      return res.status(500).json({ error: 'Invalid AI output format.' })
    }

    res.status(200).json(parsed)
  } catch (error) {
    console.error('OpenAI API error:', error)
    res.status(500).json({ error: 'AI scan failed.' })
  }
}

function extractBrandFromUrl(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].split('.')[0]
}