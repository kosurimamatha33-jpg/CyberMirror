import { GoogleGenAI } from '@google/genai';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { message } = req.body || {};
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        status: 'fallback',
        message: 'No GEMINI_API_KEY configured. Falling back to local intelligence engine.'
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const systemPrompt = `You are MirrorAI, a professional defensive cybersecurity advisor for the CyberMirror platform.
Your purpose is educational cybersecurity awareness, digital risk reduction, and defensive guidance.
Core Guidelines:
- Explain cybersecurity concepts in clear, intuitive language.
- Give defensive recommendations (e.g., MFA, Passkeys, password managers, backup strategies, network segmentation).
- Support English and Telugu / Telenglish fluently when asked.
- NEVER request passwords, OTPs, API keys, private credentials, or personal secrets.
- NEVER provide harmful attack instructions, active exploit commands, payload scripts, or malicious tools.
- Keep answers structured with clear bullet points and actionable defenses.`;

    const contents = [
      { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question: ${message}` }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
    });

    return res.status(200).json({
      status: 'success',
      reply: response.text || 'No response generated.'
    });
  } catch (err: any) {
    console.error('MirrorAI Vercel serverless function error:', err);
    return res.status(200).json({
      status: 'fallback',
      error: err?.message || 'API processing error'
    });
  }
}
