import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function mirrorAiApiPlugin(): Plugin {
  return {
    name: 'mirror-ai-api-plugin',
    configureServer(server) {
      server.middlewares.use('/api/mirror-ai', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const { message } = JSON.parse(body || '{}');
            const apiKey = process.env.GEMINI_API_KEY;

            if (!apiKey) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                status: 'fallback',
                message: 'No GEMINI_API_KEY configured on server. Falling back to local intelligence engine.'
              }));
              return;
            }

            const { GoogleGenAI } = await import('@google/genai');
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

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              status: 'success',
              reply: response.text || 'No response generated.'
            }));
          } catch (err: any) {
            console.error('MirrorAI Gemini API error:', err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              status: 'fallback',
              error: err?.message || 'API processing error'
            }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), mirrorAiApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

